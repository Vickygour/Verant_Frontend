'use client';

import axios from 'axios';

/**
 * Base URL of the VÉRANT Express API.
 * Set NEXT_PUBLIC_API_URL in .env.local — it must include the /api prefix
 * because every backend route is mounted under app.use('/api', routes).
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const TOKEN_KEY = 'verant_token';
export const USER_KEY = 'verant_user';

/** Read the JWT saved at login. Returns null on the server. */
export function getToken() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private mode — token simply won't persist */
  }
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (typeof window === 'undefined') return;
  try {
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

/** Attach the bearer token to every outgoing request. */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Unwrap the backend's { success, message, data } envelope and normalise
 * every failure into an Error carrying `status`, `message` and `errors`.
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status ?? 0;
    const payload = error.response?.data;

    const fieldError = Array.isArray(payload?.errors) && payload.errors.length
      ? payload.errors[0]?.message
      : null;

    const message =
      fieldError ||
      payload?.message ||
      (status === 0
        ? 'Cannot reach the server. Please check your connection and try again.'
        : 'Something went wrong. Please try again.');

    const err = new Error(message);
    err.status = status;
    err.errors = payload?.errors || [];
    err.payload = payload;

    // A dead/expired session should never leave a stale token behind.
    if (status === 401 && typeof window !== 'undefined') {
      const url = error.config?.url || '';
      const isAuthAttempt = url.includes('/auth/login') || url.includes('/auth/signup');
      if (!isAuthAttempt) {
        setToken(null);
        setStoredUser(null);
      }
    }

    return Promise.reject(err);
  },
);

export default api;
