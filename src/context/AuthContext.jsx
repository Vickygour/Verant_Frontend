'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authService from '@/lib/api/auth.service';
import { getStoredUser, getToken, setStoredUser, setToken } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // Restore session on first paint, then re-validate against /auth/me.
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

  // --- Google Sign-In ---
  const googleLogin = useCallback(
    async (idToken) => {
      const res = await authService.googleLogin(idToken);
      persistSession(res.token, res.user);
      return res;
    },
    [persistSession],
  );

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
    router.push('/login');
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      ready,
      loading: !ready,
      isAuthenticated: Boolean(user),
      isLoggedIn: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      signup,
      verifyOtp,
      resendOtp,
      forgotPassword,
      resetPassword,
      googleLogin,
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
      googleLogin,
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