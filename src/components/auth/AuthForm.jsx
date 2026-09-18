'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    ArrowRight,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowLeft,
    Check,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { SITE } from '@/data/site';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';

export default function AuthForm({ initialMode = 'login' }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams?.get('redirect') || '/';

    const { login, signup, verifyOtp, resendOtp, forgotPassword } = useAuth();

    // Modes: 'login' | 'signup' | 'verify'
    const [mode, setMode] = useState(initialMode);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: ['', '', '', '', '', ''],
    });

    // Timer for Resend OTP
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const otpInputsRef = useRef([]);
    const { toast } = useUI();

    // Timer Countdown Effect
    useEffect(() => {
        let interval;
        if (mode === 'verify' && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [mode, timer]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // OTP Focus logic
    const handleOtpChange = (val, index) => {
        if (!/^\d*$/.test(val)) return;
        const newOtp = [...formData.otp];
        newOtp[index] = val.slice(-1);
        setFormData({ ...formData, otp: newOtp });

        if (val && index < 5) {
            otpInputsRef.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
            otpInputsRef.current[index - 1]?.focus();
        }
    };

    // Form Submit — wired to POST /api/auth/(login|signup|verify-otp)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'verify' && formData.otp.join('').length < 6) {
            toast('Error', 'Please enter a complete 6-digit verification code.');
            return;
        }

        setLoading(true);

        try {
            if (mode === 'login') {
                const res = await login({
                    email: formData.email.trim(),
                    password: formData.password,
                });
                toast('Welcome Back', res.message || `Logged in as ${formData.email}`);
                router.push(redirectTo);
                router.refresh();
            } else if (mode === 'signup') {
                const res = await signup({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                });
                toast('Code Sent', res.message || `6-digit Atelier verification code sent to ${formData.email}`);
                setMode('verify');
                setTimer(30);
                setCanResend(false);
            } else if (mode === 'verify') {
                const res = await verifyOtp({
                    email: formData.email.trim(),
                    otp: formData.otp.join(''),
                });
                toast('Account Verified', res.message || 'Welcome to the Maison Vérant family.');
                router.push(redirectTo);
                router.refresh();
            }
        } catch (err) {
            // An unverified account trying to sign in is sent straight to the OTP step.
            if (mode === 'login' && err.status === 403) {
                toast('Verify Your Email', err.message);
                resendOtp(formData.email.trim()).catch(() => { });
                setMode('verify');
                setTimer(30);
                setCanResend(false);
            } else {
                toast('Error', err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            const res = await resendOtp(formData.email.trim());
            setTimer(30);
            setCanResend(false);
            toast('OTP Resent', res.message || `A new verification code was sent to ${formData.email}`);
        } catch (err) {
            toast('Error', err.message);
        }
    };

    // POST /api/auth/forgot-password — mails a reset code.
    const handleForgotPassword = async () => {
        const email = formData.email.trim();
        if (!email) {
            toast('Email Required', 'Enter your email address first, then tap Forgot Password.');
            return;
        }

        try {
            const res = await forgotPassword(email);
            toast('Password Reset', res.message || 'Reset code sent.');
        } catch (err) {
            toast('Error', err.message);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center grid-lines px-4 py-24 overflow-hidden bg-[#FAF9F6] text-zinc-900 selection:bg-emerald-deep selection:text-white">
            {/* Dynamic Background Blobs */}
            <div className="blob w-[600px] h-[600px] bg-sagelight/60 -top-40 -left-40 pointer-events-none blur-3xl" />
            <div className="blob w-[500px] h-[500px] bg-emerald/10 top-1/2 right-0 pointer-events-none blur-3xl" />

            {/* Floating Watermark */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 font-italiana text-[22vw] leading-none outline-text opacity-25 select-none pointer-events-none whitespace-nowrap tracking-wider"
                aria-hidden="true"
            >
                {SITE?.name || 'VERANT'}
            </div>

            {/* Auth Card Container */}
            <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-md border border-emerald/20 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">

                {/* Atelier Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-deep text-white px-4 py-1 text-[9px] tracking-[0.35em] font-extrabold uppercase flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-sage" /> Maison Private Member
                </div>

                {/* Brand Header */}
                <div className="flex flex-col items-center text-center mt-2 mb-8">
                    <div className="relative w-12 h-12 bg-emerald-deep text-white flex items-center justify-center font-italiana text-2xl shadow-lg mb-3">
                        V
                        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-sage border-2 border-white rounded-full" />
                    </div>
                    <h1 className="font-italiana text-3xl tracking-[0.18em] text-emerald-deep">
                        {SITE?.name || 'MAISON VÉRANT'}
                    </h1>
                    <p className="text-[10px] tracking-[0.4em] text-emerald font-bold uppercase mt-1">
                        MILANO · NEW DELHI
                    </p>
                </div>

                {/* Dynamic Mode Switcher (Login / Signup) */}
                {mode !== 'verify' && (
                    <div className="grid grid-cols-2 p-1 bg-zinc-100/80 border border-zinc-200/80 mb-8 rounded-none">
                        <button
                            type="button"
                            onClick={() => setMode('login')}
                            className={`py-2.5 text-xs tracking-[0.2em] font-extrabold uppercase transition-all duration-300 ${mode === 'login'
                                    ? 'bg-emerald-deep text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-900'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className={`py-2.5 text-xs tracking-[0.2em] font-extrabold uppercase transition-all duration-300 ${mode === 'signup'
                                    ? 'bg-emerald-deep text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-900'
                                }`}
                        >
                            Register
                        </button>
                    </div>
                )}

                {/* Subtitle / Instructions */}
                <div className="mb-6 text-center">
                    <h2 className="font-display text-2xl tracking-wide uppercase text-zinc-900">
                        {mode === 'login' && 'Welcome Back'}
                        {mode === 'signup' && 'Create Your Access'}
                        {mode === 'verify' && 'Verify Identity'}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
                        {mode === 'login' && 'Access your bespoke orders, wishlist & private drops.'}
                        {mode === 'signup' && 'Join for complimentary tailoring and exclusive atelier access.'}
                        {mode === 'verify' && (
                            <>
                                A 6-digit code has been dispatched to <br />
                                <span className="font-bold text-emerald-deep">{formData.email || 'your email'}</span>
                            </>
                        )}
                    </p>
                </div>

                {/* Social Authentication */}
                {mode !== 'verify' && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => toast('OAuth', 'Google login coming soon')}
                            className="flex items-center justify-center gap-2 border border-zinc-200 py-3 px-4 text-xs font-semibold hover:border-emerald-deep hover:bg-zinc-50 transition"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => toast('OAuth', 'Apple login coming soon')}
                            className="flex items-center justify-center gap-2 border border-zinc-200 py-3 px-4 text-xs font-semibold hover:border-emerald-deep hover:bg-zinc-50 transition"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.34c.64-.78 1.08-1.85.96-2.94-.93.04-2.07.62-2.74 1.41-.6.69-1.12 1.79-.98 2.86 1.05.08 2.12-.54 2.76-1.33z" />
                            </svg>
                            <span>Apple</span>
                        </button>
                    </div>
                )}

                {mode !== 'verify' && (
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="border-t border-zinc-200 w-full" />
                        <span className="bg-white px-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400 absolute">
                            Or with Email
                        </span>
                    </div>
                )}

                {/* MAIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* SIGNUP ONLY: Full Name */}
                    {mode === 'signup' && (
                        <div className="space-y-1">
                            <div className="relative border border-zinc-300 focus-within:border-emerald-deep transition-all duration-300 bg-white">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                                    <User className="w-4 h-4" />
                                </span>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className="w-full bg-transparent py-3.5 pl-10 pr-4 text-xs tracking-wider outline-none placeholder:text-zinc-400"
                                />
                            </div>
                        </div>
                    )}

                    {/* LOGIN & SIGNUP: Email Address */}
                    {mode !== 'verify' && (
                        <div className="space-y-1">
                            <div className="relative border border-zinc-300 focus-within:border-emerald-deep transition-all duration-300 bg-white">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                                    <Mail className="w-4 h-4" />
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    className="w-full bg-transparent py-3.5 pl-10 pr-4 text-xs tracking-wider outline-none placeholder:text-zinc-400"
                                />
                            </div>
                        </div>
                    )}

                    {/* LOGIN & SIGNUP: Password */}
                    {mode !== 'verify' && (
                        <div className="space-y-1">
                            <div className="relative border border-zinc-300 focus-within:border-emerald-deep transition-all duration-300 bg-white">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                                    <Lock className="w-4 h-4" />
                                </span>
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className="w-full bg-transparent py-3.5 pl-10 pr-10 text-xs tracking-wider outline-none placeholder:text-zinc-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-700"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VERIFY MODE: OTP Inputs */}
                    {mode === 'verify' && (
                        <div className="py-2">
                            <div className="flex justify-between gap-2 my-4">
                                {formData.otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        ref={(el) => (otpInputsRef.current[idx] = el)}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                                        className="w-11 h-13 text-center text-xl font-display font-bold border border-zinc-300 focus:border-emerald-deep focus:ring-1 focus:ring-emerald-deep outline-none bg-white transition shadow-inner"
                                    />
                                ))}
                            </div>

                            {/* Resend Timer */}
                            <div className="text-center mt-6">
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        className="text-xs text-emerald font-bold tracking-widest uppercase hover:underline"
                                    >
                                        Resend Code Now
                                    </button>
                                ) : (
                                    <p className="text-xs text-zinc-400 tracking-wider">
                                        Resend code in <span className="font-bold text-emerald-deep">{timer}s</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Forgot Password for Login */}
                    {mode === 'login' && (
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[11px] text-zinc-500 hover:text-emerald transition tracking-wide"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    {/* Primary Action Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-deep text-white py-4 px-6 flex items-center justify-center gap-3 text-xs tracking-[0.25em] font-extrabold uppercase hover:bg-emerald transition-all duration-300 disabled:opacity-50 mt-6 shadow-md"
                    >
                        <span>
                            {loading
                                ? 'Authenticating...'
                                : mode === 'login'
                                    ? 'Sign In To Account'
                                    : mode === 'signup'
                                        ? 'Proceed To Verification'
                                        : 'Verify & Access Atelier'}
                        </span>
                        {!loading && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                    </button>
                </form>

                {/* Back Link on Verify */}
                {mode === 'verify' && (
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-deep transition uppercase tracking-wider font-bold"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Change Email / Back
                        </button>
                    </div>
                )}

                {/* Trust Badges */}
                <div className="mt-10 pt-6 border-t border-zinc-200/80 flex items-center justify-between text-[10px] tracking-widest uppercase text-zinc-400 font-bold">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald" /> 256-Bit Encrypted
                    </div>
                    <div>Maison Guaranteed</div>
                </div>

            </div>
        </section>
    );
}