'use client';

import api from '@/lib/api/client';

/** POST /api/auth/signup → emails a 6-digit OTP, account stays unverified. */
export async function signup({ name, email, password }) {
  const res = await api.post('/auth/signup', { name, email, password });
  return { message: res?.message, email: res?.data?.email || email };
}

/** POST /api/auth/verify-otp → activates the account and returns a JWT. */
export async function verifyOtp({ email, otp }) {
  const res = await api.post('/auth/verify-otp', { email, otp });
  return { message: res?.message, token: res?.data?.token, user: res?.data?.user };
}

/** POST /api/auth/resend-otp */
export async function resendOtp(email) {
  const res = await api.post('/auth/resend-otp', { email });
  return { message: res?.message };
}

/** POST /api/auth/login */
export async function login({ email, password }) {
  const res = await api.post('/auth/login', { email, password });
  return { message: res?.message, token: res?.data?.token, user: res?.data?.user };
}

/** POST /api/auth/google → verifies Google ID token, returns our JWT. */
export async function googleLogin(idToken) {
  const res = await api.post('/auth/google', { idToken });
  return { message: res?.message, token: res?.data?.token, user: res?.data?.user };
}

/** POST /api/auth/forgot-password → mails a reset OTP. */
export async function forgotPassword(email) {
  const res = await api.post('/auth/forgot-password', { email });
  return { message: res?.message };
}

/** POST /api/auth/reset-password */
export async function resetPassword({ email, otp, newPassword }) {
  const res = await api.post('/auth/reset-password', { email, otp, newPassword });
  return { message: res?.message };
}

/** GET /api/auth/me — protected. */
export async function getMe() {
  const res = await api.get('/auth/me');
  return res?.data?.user || null;
}

const authService = {
  signup,
  verifyOtp,
  resendOtp,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  getMe,
};

export default authService;