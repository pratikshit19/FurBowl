'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  X, User, Package, Heart, LogOut, ArrowLeft, Loader2, CheckCircle2,
  Pencil, Mail, Lock, Eye, EyeOff, PawPrint,
} from 'lucide-react';
import useAuthModalStore from '@/store/authModalStore';
import useAuthStore from '@/store/authStore';
import { sendEmailOtpService, verifyEmailOtpService } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModalStore();
  const { isAuthenticated, user, token, setUser, updateUser, logout } = useAuthStore();

  // ── Auth flow state ──────────────────────────────────────────────────────
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'name'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  // ── Edit profile state ────────────────────────────────────────────────────
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileDogName, setProfileDogName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);

  const emailInputRef = useRef(null);
  const otpInputRef = useRef(null);

  // Reset on close / log out
  useEffect(() => {
    if (!isOpen || !isAuthenticated || !user) {
      setStep('email');
      setEmail('');
      setOtp('');
      setName('');
      setError('');
      setLoading(false);
      setIsEditingProfile(false);
      setProfileError('');
      setProfileSuccess(false);
    }
  }, [isOpen, isAuthenticated, user]);

  // Resend countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) closeAuthModal(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAuthModal]);

  // Load Google SDK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('google-gsi-client')) return;
    const script = document.createElement('script');
    script.id = 'google-gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  if (!isOpen) return null;

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const cleaned = email.toLowerCase().trim();
    if (!cleaned || !cleaned.includes('@') || !cleaned.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await sendEmailOtpService(cleaned);
      if (!res.success) {
        setError(res.error || 'Failed to send OTP. Please try again.');
        return;
      }
      setStep('otp');
      setResendCountdown(30);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    const cleanedOtp = otp.replace(/\D/g, '');
    if (cleanedOtp.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await verifyEmailOtpService({ email: email.toLowerCase().trim(), otp: cleanedOtp });
      if (!res.success) {
        setError(res.error || 'Invalid OTP. Please try again.');
        return;
      }
      setUser(res.user, res.token);
      if (res.isNewUser || !res.user?.name) {
        setStep('name');
      } else {
        closeAuthModal();
      }
    } catch (err) {
      setError(err?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || resendLoading) return;
    setResendLoading(true);
    setError('');
    try {
      const res = await sendEmailOtpService(email.toLowerCase().trim());
      if (res.success) {
        setResendCountdown(30);
        setOtp('');
      } else {
        setError(res.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSaveName = async (e) => {
    e?.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name: name.trim() }),
      });
      if (data?.user?.name) updateUser({ name: data.user.name });
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Could not save your name');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (googlePayload) => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googlePayload),
      });
      setUser(data.user, data.token);
      if (data.isNewUser || !data.user?.name) {
        setStep('name');
      } else {
        closeAuthModal();
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const triggerGoogleLogin = () => {
    setError('');
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Google Sign-In is not configured.');
      return;
    }
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: (tokenResponse) => {
            if (tokenResponse.access_token) {
              handleGoogleSuccess({ accessToken: tokenResponse.access_token });
            } else {
              setError('Google login was cancelled or failed.');
            }
          },
        });
        client.requestAccessToken();
      } catch {
        setError('Failed to open Google login popup.');
      }
    } else if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleGoogleSuccess({ credential: response.credential }),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt();
      } catch {
        setError('Google sign-in could not be loaded.');
      }
    } else {
      setError('Loading Google Sign-In SDK... Please try again in a moment.');
    }
  };

  const openEditProfile = () => {
    setProfileName(user?.name || '');
    setProfileDogName(user?.dogName || '');
    setProfileEmail(user?.email || '');
    setProfilePhone(user?.phone ? user.phone.replace(/^\+91/, '').trim() : '');
    setProfilePassword('');
    setShowPassword(false);
    setProfileError('');
    setProfileSuccess(false);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    setProfileError('');
    const trimmedName = profileName.trim();
    const trimmedDogName = profileDogName.trim();
    const trimmedEmail = profileEmail.trim();
    const cleanedPhone = profilePhone.replace(/\D/g, '');
    const trimmedPassword = profilePassword.trim();
    if (!trimmedName) { setProfileError('Please enter your full name'); return; }
    if (trimmedEmail && !trimmedEmail.includes('@')) { setProfileError('Please enter a valid email address'); return; }
    if (cleanedPhone && cleanedPhone.length !== 10) { setProfileError('Please enter a valid 10-digit mobile number'); return; }
    if (trimmedPassword && trimmedPassword.length < 6) { setProfileError('Password must be at least 6 characters long'); return; }
    setSavingProfile(true);
    try {
      const payload = {
        name: trimmedName,
        email: trimmedEmail || null,
        phone: cleanedPhone || null,
        dogName: trimmedDogName || null,
      };
      if (trimmedPassword) payload.password = trimmedPassword;
      const data = await apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) });
      if (data.user) {
        if (data.token) useAuthStore.getState().setUser(data.user, data.token);
        else updateUser(data.user);
      } else {
        updateUser({ name: trimmedName, email: trimmedEmail || null, phone: cleanedPhone || null, dogName: trimmedDogName || null });
      }
      setProfilePassword('');
      setProfileSuccess(true);
      setTimeout(() => { setIsEditingProfile(false); setProfileSuccess(false); }, 900);
    } catch (err) {
      setProfileError(err.message || 'Could not update profile. Please try again.');
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[430px] bg-white rounded-lg p-7 sm:p-9 shadow-2xl z-10 border border-plum-900/5 my-auto animate-fade-in">
        {/* Close */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── LOGGED IN ────────────────────────────────────────────────────── */}
        {Boolean(isAuthenticated && user) ? (
          isEditingProfile ? (
            /* Edit Profile */
            <div className="pt-1">
              <div className="flex items-center gap-3 mb-5 text-left border-b border-plum-900/10 pb-3">
                <button
                  type="button"
                  onClick={() => { setIsEditingProfile(false); setProfileError(''); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-plum-900 transition-colors cursor-pointer"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="text-lg font-bold text-plum-900">Edit Profile</h3>
                  <p className="text-xs text-plum-900/60">Update your account details</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1.5">Full Name <span className="text-coral-500">*</span></label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-plum-900/40"><User className="w-4 h-4" /></span>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-plum-900/20 text-sm font-semibold text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors" required />
                  </div>
                </div>

                {/* Pup's Name */}
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1.5">Pup's Name</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-coral-500"><PawPrint className="w-4 h-4" /></span>
                    <input type="text" value={profileDogName} onChange={(e) => setProfileDogName(e.target.value)} placeholder="e.g. Bruno, Max, Bella"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-plum-900/20 text-sm font-semibold text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1.5">Email Address</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-plum-900/40"><Mail className="w-4 h-4" /></span>
                    <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-plum-900/20 text-sm font-semibold text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1.5">Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-bold text-plum-900/50 select-none">+91</span>
                    <input type="tel" maxLength={10} value={profilePhone} onChange={(e) => setProfilePhone(e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number"
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-plum-900/20 text-sm font-semibold text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-plum-900">Set Password</label>
                    <span className="text-[10px] text-plum-900/50">Leave blank to keep unchanged</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-plum-900/40"><Lock className="w-4 h-4" /></span>
                    <input type={showPassword ? 'text' : 'password'} value={profilePassword} onChange={(e) => setProfilePassword(e.target.value)} placeholder="•••••••• (min 6 characters)"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-plum-900/20 text-sm font-semibold text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors" />
                    <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 text-plum-900/40 hover:text-plum-900 cursor-pointer transition-colors" aria-label={showPassword ? 'Hide' : 'Show'}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {profileSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}
                {profileError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-200">{profileError}</div>
                )}

                <div className="pt-2 space-y-2">
                  <button type="submit" disabled={savingProfile || profileSuccess}
                    className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-lg text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
                    {savingProfile ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving changes...</span></> : profileSuccess ? <><CheckCircle2 className="w-4 h-4" /><span>Saved!</span></> : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => { setIsEditingProfile(false); setProfileError(''); }}
                    className="w-full py-2.5 px-4 text-xs font-bold text-plum-900/60 hover:text-plum-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Logged In Overview */
            <div className="text-center pt-2">
              <div className="w-16 h-16 rounded-full bg-peach-50 text-coral-600 mx-auto flex items-center justify-center text-xl font-bold border-2 border-coral-200 mb-3 shadow-xs">
                {user?.name ? user.name[0].toUpperCase() : <User className="w-7 h-7" />}
              </div>
              <h2 className="text-2xl font-bold text-plum-900 tracking-tight">
                {user?.name ? `Hi, ${user.name.split(' ')[0]}!` : 'Welcome to FurBowl!'}
              </h2>
              {user?.dogName && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-peach-50 text-coral-600 rounded-full text-xs font-bold mt-2 border border-coral-200 shadow-2xs">
                  <PawPrint className="w-3.5 h-3.5 text-coral-500" />
                  <span>Pup: {user.dogName}</span>
                </div>
              )}
              <div className="text-xs text-plum-900/60 mt-1 space-y-0.5">
                {user?.email && <p className="truncate font-medium">{user.email}</p>}
                {user?.phone ? <p className="font-mono text-plum-900/60">+91 {user.phone}</p> : !user?.email ? <p className="italic text-plum-900/40">No contact info saved</p> : null}
              </div>

              <div className="mt-6 space-y-2 text-left">
                <button type="button" onClick={openEditProfile}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-[#faf6ed] text-sm font-bold text-plum-900 transition-colors border border-plum-900/5 cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <Pencil className="w-5 h-5 text-teal-600 group-hover:text-coral-600 transition-colors" />
                    <span>Edit Profile</span>
                  </div>
                  <span className="text-xs font-semibold text-coral-600 bg-peach-50 px-2.5 py-0.5 rounded-full border border-coral-100">Edit</span>
                </button>

                <Link href="/account" onClick={closeAuthModal}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-[#faf6ed] text-sm font-bold text-plum-900 transition-colors border border-plum-900/5">
                  <Package className="w-5 h-5 text-teal-600" />
                  <span>My Orders &amp; Feeding Plans</span>
                </Link>

                <Link href="/wishlist" onClick={closeAuthModal}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-[#faf6ed] text-sm font-bold text-plum-900 transition-colors border border-plum-900/5">
                  <Heart className="w-5 h-5 text-coral-500" />
                  <span>Saved Wishlist</span>
                </Link>

                <button type="button" onClick={() => { setIsEditingProfile(false); setProfileError(''); setProfileSuccess(false); logout(); closeAuthModal(); }}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-red-50 text-sm font-bold text-red-600 transition-colors border border-red-100 cursor-pointer mt-2">
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )
        ) : (
          /* ── NOT LOGGED IN ─────────────────────────────────────────────── */
          <div>
            {/* STEP 1: Email Input */}
            {step === 'email' && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 tracking-tight">Welcome back!</h2>
                  <p className="text-sm text-plum-900/60 mt-1.5">Log in with your email — we'll send you a code.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-plum-900 mb-1.5">
                      Email Address <span className="text-coral-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-plum-900/40"><Mail className="w-4 h-4" /></span>
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="you@gmail.com"
                        style={{ outline: 'none', boxShadow: 'none' }}
                        className="w-full pl-10 pr-4 py-3 rounded-none border border-gray-200 focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-gray-300 text-sm font-medium text-plum-900 placeholder:text-gray-400"
                        required
                        autoFocus
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-xs text-coral-600 font-semibold">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.includes('@')}
                    className="w-full bg-[#ff4e20] hover:bg-[#e84318] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md shadow-coral-500/25 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    id="send-email-otp-btn"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending Code...</span></> : <span>Send Verification Code</span>}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center">
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="px-3 text-xs text-gray-400 font-medium whitespace-nowrap select-none">or continue with</span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>

                {/* Google Login */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={triggerGoogleLogin}
                    disabled={loading}
                    className="w-14 h-12 rounded-none border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer disabled:opacity-50"
                    title="Continue with Google"
                    aria-label="Continue with Google"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>

                  <p className="text-xs text-plum-900/60 text-center">
                    Prefer email &amp; password?{' '}
                    <Link href="/login" onClick={closeAuthModal} className="text-teal-700 hover:text-teal-800 font-bold underline">
                      Sign in here
                    </Link>
                  </p>
                </div>

                <p className="text-[11px] text-gray-400 text-center mt-5">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" onClick={closeAuthModal} className="underline hover:text-gray-600">Terms of Service</Link>.
                </p>
              </>
            )}

            {/* STEP 2: OTP Entry */}
            {step === 'otp' && (
              <>
                <button
                  type="button"
                  onClick={() => { setStep('email'); setError(''); setOtp(''); }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-plum-900/60 hover:text-coral-500 mb-3 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Email</span>
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-plum-900 tracking-tight">Check Your Inbox</h2>
                  <p className="text-sm text-plum-900/60 mt-1.5">
                    We sent a 6-digit code to{' '}
                    <strong className="text-coral-600">{email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <input
                      ref={otpInputRef}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                      placeholder="• • • • • •"
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="w-full text-center tracking-[0.35em] font-mono text-2xl py-3 rounded-none border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-300 font-bold text-plum-900 placeholder:text-gray-300"
                      autoFocus
                      required
                    />
                    {error && <p className="text-xs text-coral-600 font-semibold mt-1.5 text-center">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-full bg-[#ff4e20] hover:bg-[#e84318] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md shadow-coral-500/25 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Verifying...</span></> : <span>Verify &amp; Continue</span>}
                  </button>
                </form>

                <div className="text-center mt-5">
                  {resendCountdown > 0 ? (
                    <p className="text-xs text-gray-400 font-medium">
                      Resend code in <span className="font-bold text-plum-900">{resendCountdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendLoading}
                      className="text-xs font-bold text-coral-600 hover:text-coral-700 underline cursor-pointer"
                    >
                      {resendLoading ? 'Sending...' : "Didn't receive it? Resend code"}
                    </button>
                  )}
                </div>
              </>
            )}

            {/* STEP 3: Name (new users) */}
            {step === 'name' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-plum-900 tracking-tight">Almost there!</h2>
                  <p className="text-sm text-plum-900/60 mt-1">What should we call you?</p>
                </div>

                <form onSubmit={handleSaveName} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-plum-900 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="w-full px-4 py-3 rounded-none border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm font-medium text-plum-900 placeholder:text-gray-400"
                      required
                      autoFocus
                    />
                    {error && <p className="text-xs text-coral-600 font-semibold mt-1.5">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-none transition-all shadow-md text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Saving...</span></> : <span>Complete &amp; Start Shopping</span>}
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
