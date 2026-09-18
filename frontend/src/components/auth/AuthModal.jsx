'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, User, Package, Heart, LogOut, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import useAuthModalStore from '@/store/authModalStore';
import useAuthStore from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furbowl.onrender.com/api/v1';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModalStore();
  const { isAuthenticated, user, setUser, updateUser, logout } = useAuthStore();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'name'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  const phoneInputRef = useRef(null);
  const otpInputRef = useRef(null);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setPhone('');
      setOtp('');
      setName('');
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  // Resend OTP countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAuthModal]);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setStep('otp');
      setResendCountdown(30);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    const cleanedOtp = otp.replace(/\D/g, '');
    if (cleanedOtp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanedPhone, otp: cleanedOtp }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      setUser(data.user, data.token);

      if (data.isNewUser || !data.user?.name) {
        setStep('name');
      } else {
        closeAuthModal();
      }
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = async (e) => {
    e?.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');

    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update name');

      updateUser({ name: data.user.name });
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Could not save profile name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[430px] bg-white rounded-lg p-7 sm:p-9 shadow-2xl z-10 border border-plum-900/5 my-auto animate-fade-in">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ─── CASE 1: ALREADY LOGGED IN ────────────────────────────────────── */}
        {isAuthenticated ? (
          <div className="text-center pt-2">
            <div className="w-16 h-16 rounded-full bg-peach-50 text-coral-600 mx-auto flex items-center justify-center text-xl font-black border-2 border-coral-200 mb-3 shadow-xs">
              {user?.name ? user.name[0].toUpperCase() : <User className="w-7 h-7" />}
            </div>

            <h2 className="text-2xl font-bold text-plum-900 tracking-tight">
              {user?.name ? `Hi, ${user.name.split(' ')[0]}!` : 'Welcome to FurBowl!'}
            </h2>
            <p className="text-xs text-plum-900/60 mt-1 font-mono">
              +91 {user?.phone || phone}
            </p>

            <div className="mt-6 space-y-2 text-left">
              <Link
                href="/account"
                onClick={closeAuthModal}
                className="flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-[#faf6ed] text-sm font-bold text-plum-900 transition-colors border border-plum-900/5"
              >
                <Package className="w-5 h-5 text-teal-600" />
                <span>My Orders & Feeding Plans</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={closeAuthModal}
                className="flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-[#faf6ed] text-sm font-bold text-plum-900 transition-colors border border-plum-900/5"
              >
                <Heart className="w-5 h-5 text-coral-500" />
                <span>Saved Wishlist</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-red-50 text-sm font-bold text-red-600 transition-colors border border-red-100 cursor-pointer mt-2"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* ─── CASE 2: LOG IN / SIGN UP FLOW ──────────────────────────────── */
          <div>
            {/* STEP 1: Phone Number */}
            {step === 'phone' && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 tracking-tight">
                    Welcome back!
                  </h2>
                  <p className="text-sm text-plum-900/60 mt-1.5">
                    Log in to access your account.
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-plum-900 mb-1.5">
                      Mobile Number <span className="text-coral-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-bold text-plum-900/50 select-none">
                        +91
                      </span>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ''));
                          setError('');
                        }}
                        placeholder="Enter your mobile number"
                        style={{ outline: 'none', boxShadow: 'none' }}
                        className="w-full pl-13 pr-4 py-3 rounded-none border border-gray-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-300 text-sm font-medium text-plum-900 !outline-none placeholder:text-gray-400 placeholder:font-normal"
                        required
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-coral-600 font-semibold mt-1.5">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phone.length !== 10}
                    className="w-full bg-[#ff4e20] hover:bg-[#e84318] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md shadow-coral-500/25 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <span>Get OTP</span>
                    )}
                  </button>
                </form>

                {/* Social Login Divider */}
                <div className="relative my-6 flex items-center">
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="px-3 text-xs text-gray-400 font-medium whitespace-nowrap select-none">
                    or continue with
                  </span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>

                {/* Social Buttons */}
                <div className="flex items-center justify-center">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => {
                      // Seamless helper notice for quick sign-in
                      setError('Mobile OTP is the primary verified login method for FurBowl');
                    }}
                    className="w-14 h-12 rounded-none border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="Continue with Google"
                    aria-label="Continue with Google"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Footer terms */}
                <p className="text-[11px] text-gray-400 text-center mt-6">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" onClick={closeAuthModal} className="underline hover:text-gray-600">
                    Terms of Service
                  </Link>
                  .
                </p>

                <p className="text-[10px] text-gray-400 text-center mt-2.5 flex items-center justify-center gap-1">
                  <span>Secured by</span>
                  <span className="font-bold text-gray-600 uppercase tracking-wider">FURBOWL</span>
                </p>
              </>
            )}

            {/* STEP 2: Enter OTP */}
            {step === 'otp' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setError('');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-plum-900/60 hover:text-coral-500 mb-3 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Number</span>
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 tracking-tight">
                    Enter Verification Code
                  </h2>
                  <p className="text-sm text-plum-900/60 mt-1.5">
                    We sent a 6-digit OTP to{' '}
                    <span className="font-bold text-plum-900">+91 {phone}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <input
                      ref={otpInputRef}
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                      placeholder="• • • • • •"
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="w-full text-center tracking-[0.35em] font-mono text-2xl py-3 rounded-none border border-gray-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-300 font-bold text-plum-900 !outline-none placeholder:text-gray-300"
                      required
                    />
                    {error && (
                      <p className="text-xs text-coral-600 font-semibold mt-1.5 text-center">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-[#ff4e20] hover:bg-[#e84318] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md shadow-coral-500/25 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Continue</span>
                    )}
                  </button>
                </form>

                {/* Resend button */}
                <div className="text-center mt-5">
                  {resendCountdown > 0 ? (
                    <p className="text-xs text-gray-400 font-medium">
                      Resend OTP in <span className="font-bold text-plum-900">{resendCountdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-xs font-bold text-coral-600 hover:text-coral-700 underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            {/* STEP 3: Complete Profile (New User Name) */}
            {step === 'name' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-plum-900 tracking-tight">
                    Almost there!
                  </h2>
                  <p className="text-sm text-plum-900/60 mt-1">
                    What is your name?
                  </p>
                </div>

                <form onSubmit={handleSaveName} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-plum-900 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="w-full px-4 py-3 rounded-none border border-gray-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-300 text-sm font-medium text-plum-900 !outline-none placeholder:text-gray-400"
                      required
                    />
                    {error && (
                      <p className="text-xs text-coral-600 font-semibold mt-1.5">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Complete & Start Shopping</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
