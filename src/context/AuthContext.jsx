'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authService from '@/lib/api/auth.service';
import { getStoredUser, getToken, setStoredUser, setToken } from '@/lib/api/client';

const AuthContext = createContext(null);

/**
 * Session state backed by /api/auth/*.
 * The JWT lives in localStorage and is attached to every axios request by the
 * client interceptor, so nothing else in the app has to think about headers.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Restore the session on first paint, then re-validate against /auth/me.
  useEffect(() => {
    const cached = getStoredUser();
    if (cached) setUser(cached);

    if (!getToken()) {
      setReady(true);
      return;
    }

    let cancelled = false;

    authService
      .getMe()
      .then((fresh) => {
        if (cancelled || !fresh) return;
        setUser(fresh);
        setStoredUser(fresh);
      })
      .catch(() => {
        if (cancelled) return;
        setToken(null);
        setStoredUser(null);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const persistSession = useCallback((token, nextUser) => {
    setToken(token);
    setStoredUser(nextUser);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const res = await authService.login(credentials);
      persistSession(res.token, res.user);
      return res;
    },
    [persistSession],
  );

  const signup = useCallback((payload) => authService.signup(payload), []);

  const verifyOtp = useCallback(
    async (payload) => {
      const res = await authService.verifyOtp(payload);
      if (res.token) persistSession(res.token, res.user);
      return res;
    },
    [persistSession],
  );

  const resendOtp = useCallback((email) => authService.resendOtp(email), []);
  const forgotPassword = useCallback((email) => authService.forgotPassword(email), []);
  const resetPassword = useCallback((payload) => authService.resetPassword(payload), []);

  const refreshUser = useCallback(async () => {
    if (!getToken()) return null;
    const fresh = await authService.getMe();
    setUser(fresh);
    setStoredUser(fresh);
    return fresh;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setStoredUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      signup,
      verifyOtp,
      resendOtp,
      forgotPassword,
      resetPassword,
      refreshUser,
      logout,
    }),
    [
      user,
      ready,
      login,
      signup,
      verifyOtp,
      resendOtp,
      forgotPassword,
      resetPassword,
      refreshUser,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
