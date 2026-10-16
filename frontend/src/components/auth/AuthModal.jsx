'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  X, User, Package, Heart, LogOut, ArrowLeft, Loader2, CheckCircle2,
  Pencil, Mail, Lock, Eye, EyeOff, PawPrint, ShieldCheck,
} from 'lucide-react';
import useAuthModalStore from '@/store/authModalStore';
import useAuthStore from '@/store/authStore';
import { sendEmailOtpService, verifyEmailOtpService } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModalStore();
  const { isAuthenticated, user, token, setUser, updateUser, logout } = useAuthStore();

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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
  const otpRefs = useRef([]);

  useEffect(() => {
    if (!isOpen || !isAuthenticated || !user) {
      setStep('email'); setEmail(''); setOtp(['', '', '', '', '', '']);
      setName(''); setError(''); setLoading(false); setSuccessMsg('');
      setIsEditingProfile(false); setProfileError(''); setProfileSuccess(false);
    }
  }, [isOpen, isAuthenticated, user]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setInterval(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCountdown]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) closeAuthModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeAuthModal]);

  useEffect(() => {
    if (typeof window === 'undefined' || document.getElementById('google-gsi-client')) return;
    const s = document.createElement('script');
    s.id = 'google-gsi-client'; s.src = 'https://accounts.google.com/gsi/client';
    s.async = true; s.defer = true; document.body.appendChild(s);
  }, []);

  if (!isOpen) return null;

  // ── OTP box helpers ────────────────────────────────────────────────────────
  const handleOtpChange = (i, val) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[i] = digit; setOtp(next); setError('');
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const handleOtpPaste = (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (digits.length >= 4) {
      const next = ['', '', '', '', '', ''];
      digits.split('').forEach((d, idx) => { if (idx < 6) next[idx] = d; });
      setOtp(next);
      otpRefs.current[Math.min(digits.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const cleaned = email.toLowerCase().trim();
    if (!cleaned || !cleaned.includes('@') || !cleaned.includes('.')) {
      setError('Please enter a valid email address'); return;
    }
    setLoading(true); setError('');
    try {
      const res = await sendEmailOtpService(cleaned);
      if (!res.success) { setError(res.error || 'Failed to send code. Please try again.'); return; }
      setStep('otp'); setResendCountdown(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Enter the full 6-digit code'); return; }
    setLoading(true); setError('');
    try {
      const res = await verifyEmailOtpService({ email: email.toLowerCase().trim(), otp: code });
      if (!res.success) {
        setError(res.error || 'Invalid code. Please try again.');
        setOtp(['', '', '', '', '', '']); otpRefs.current[0]?.focus(); return;
      }
      setUser(res.user, res.token);
      if (res.isNewUser || !res.user?.name) { setStep('name'); }
      else { closeAuthModal(); }
    } catch (err) {
      setError(err?.message || 'Verification failed.');
      setOtp(['', '', '', '', '', '']); otpRefs.current[0]?.focus();
    } finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || resendLoading) return;
    setResendLoading(true); setError('');
    try {
      const res = await sendEmailOtpService(email.toLowerCase().trim());
      if (res.success) { setResendCountdown(30); setOtp(['', '', '', '', '', '']); otpRefs.current[0]?.focus(); }
      else { setError(res.error || 'Failed to resend code'); }
    } catch (err) { setError(err?.message || 'Failed to resend'); }
    finally { setResendLoading(false); }
  };

  const handleSaveName = async (e) => {
    e?.preventDefault();
    if (!name.trim()) return;
    setLoading(true); setError('');
    try {
      const data = await apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify({ name: name.trim() }) });
      if (data?.user?.name) updateUser({ name: data.user.name });
      closeAuthModal();
    } catch (err) { setError(err.message || 'Could not save name'); }
    finally { setLoading(false); }
  };

  const handleGoogleSuccess = async (payload) => {
    setLoading(true); setError('');
    try {
      const data = await apiFetch('/auth/google', { method: 'POST', body: JSON.stringify(payload) });
      setUser(data.user, data.token);
      if (data.isNewUser || !data.user?.name) { setStep('name'); } else { closeAuthModal(); }
    } catch (err) { setError(err.message || 'Google sign-in failed.'); }
    finally { setLoading(false); }
  };

  const triggerGoogleLogin = () => {
    setError('');
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) { setError('Google Sign-In is not configured.'); return; }
    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId, scope: 'email profile openid',
        callback: (r) => r.access_token ? handleGoogleSuccess({ accessToken: r.access_token }) : setError('Google login cancelled.'),
      });
      client.requestAccessToken();
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({ client_id: clientId, callback: (r) => handleGoogleSuccess({ credential: r.credential }), auto_select: false, cancel_on_tap_outside: true });
      window.google.accounts.id.prompt();
    } else { setError('Google SDK loading... try again in a moment.'); }
  };

  const openEditProfile = () => {
    setProfileName(user?.name || ''); setProfileDogName(user?.dogName || '');
    setProfileEmail(user?.email || ''); setProfilePhone(user?.phone?.replace(/^\+91/, '').trim() || '');
    setProfilePassword(''); setShowPassword(false); setProfileError(''); setProfileSuccess(false);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault(); setProfileError('');
    const n = profileName.trim(), d = profileDogName.trim(), em = profileEmail.trim();
    const ph = profilePhone.replace(/\D/g, ''), pw = profilePassword.trim();
    if (!n) { setProfileError('Please enter your name'); return; }
    if (em && !em.includes('@')) { setProfileError('Invalid email address'); return; }
    if (ph && ph.length !== 10) { setProfileError('Enter a valid 10-digit phone number'); return; }
    if (pw && pw.length < 6) { setProfileError('Password must be at least 6 characters'); return; }
    setSavingProfile(true);
    try {
      const payload = { name: n, email: em || null, phone: ph || null, dogName: d || null };
      if (pw) payload.password = pw;
      const data = await apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) });
      if (data.token) useAuthStore.getState().setUser(data.user, data.token);
      else updateUser(data.user || { name: n, email: em || null, phone: ph || null, dogName: d || null });
      setProfilePassword(''); setProfileSuccess(true);
      setTimeout(() => { setIsEditingProfile(false); setProfileSuccess(false); }, 1000);
    } catch (err) { setProfileError(err.message || 'Could not update profile. Please try again.'); }
    finally { setSavingProfile(false); }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuthModal} />

      {/* Sheet / Modal */}
      <div className="relative w-full sm:max-w-sm bg-white sm:rounded-2xl rounded-t-2xl p-6 sm:p-8 shadow-2xl z-10 border border-black/5 animate-fade-in max-h-[95dvh] overflow-y-auto">

        {/* Close */}
        <button onClick={closeAuthModal} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        {/* ── LOGGED IN ──────────────────────────────────────────────────── */}
        {Boolean(isAuthenticated && user) ? (
          isEditingProfile ? (
            <div>
              <button onClick={() => { setIsEditingProfile(false); setProfileError(''); }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-5 cursor-pointer transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Edit Profile</h3>
              <p className="text-xs text-gray-500 mb-5">Update your account information</p>

              <form onSubmit={handleSaveProfile} className="space-y-3">
                {[
                  { label: 'Full Name *', value: profileName, onChange: setProfileName, type: 'text', icon: <User className="w-3.5 h-3.5" />, placeholder: 'Your name' },
                  { label: "Pup's Name", value: profileDogName, onChange: setProfileDogName, type: 'text', icon: <PawPrint className="w-3.5 h-3.5" />, placeholder: 'Bruno, Max...' },
                  { label: 'Email', value: profileEmail, onChange: setProfileEmail, type: 'email', icon: <Mail className="w-3.5 h-3.5" />, placeholder: 'you@gmail.com' },
                  { label: 'Phone', value: profilePhone, onChange: (v) => setProfilePhone(v.replace(/\D/g, '')), type: 'tel', prefix: '+91', placeholder: '10-digit number', maxLength: 10 },
                ].map(({ label, value, onChange, type, icon, prefix, placeholder, maxLength }) => (
                  <div key={label}>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                    <div className="relative flex items-center border border-gray-200 rounded-lg focus-within:border-[#ff4e20] focus-within:ring-1 focus-within:ring-[#ff4e20]/20 transition-all overflow-hidden">
                      {(icon || prefix) && (
                        <span className="pl-3 pr-1 text-gray-400 text-xs font-semibold shrink-0">{prefix || icon}</span>
                      )}
                      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
                        className="flex-1 px-3 py-2.5 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300" />
                    </div>
                  </div>
                ))}

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                    <span className="text-[10px] text-gray-400">Leave blank to keep unchanged</span>
                  </div>
                  <div className="relative flex items-center border border-gray-200 rounded-lg focus-within:border-[#ff4e20] focus-within:ring-1 focus-within:ring-[#ff4e20]/20 transition-all">
                    <span className="pl-3 pr-1 text-gray-400"><Lock className="w-3.5 h-3.5" /></span>
                    <input type={showPassword ? 'text' : 'password'} value={profilePassword} onChange={(e) => setProfilePassword(e.target.value)} placeholder="Min 6 characters"
                      className="flex-1 px-3 py-2.5 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300" />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="px-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {profileSuccess && <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-xs font-semibold"><CheckCircle2 className="w-4 h-4" /> Saved!</div>}
                {profileError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">{profileError}</div>}

                <div className="pt-1 space-y-2">
                  <button type="submit" disabled={savingProfile || profileSuccess}
                    className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                    {savingProfile ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : profileSuccess ? <><CheckCircle2 className="w-4 h-4" />Saved!</> : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => { setIsEditingProfile(false); setProfileError(''); }}
                    className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              {/* Avatar + greeting */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#fff0eb] text-[#ff4e20] flex items-center justify-center text-lg font-bold shrink-0 border-2 border-[#ff4e20]/20">
                  {user?.name ? user.name[0].toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">{user?.name ? `Hi, ${user.name.split(' ')[0]}!` : 'My Account'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || (user?.phone ? `+91 ${user.phone}` : 'FurBowl Member')}</p>
                  {user?.dogName && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#ff4e20] mt-0.5">
                      <PawPrint className="w-2.5 h-2.5" /> {user.dogName}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { label: 'Edit Profile', icon: <Pencil className="w-4 h-4" />, onClick: openEditProfile },
                  { label: 'My Orders', icon: <Package className="w-4 h-4" />, href: '/account' },
                  { label: 'Wishlist', icon: <Heart className="w-4 h-4" />, href: '/wishlist' },
                ].map(({ label, icon, onClick, href }) =>
                  href ? (
                    <Link key={label} href={href} onClick={closeAuthModal}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="text-gray-400">{icon}</span> {label}
                    </Link>
                  ) : (
                    <button key={label} type="button" onClick={onClick}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer text-left">
                      <span className="text-gray-400">{icon}</span> {label}
                    </button>
                  )
                )}

                <div className="pt-2 mt-2 border-t border-gray-100">
                  <button type="button" onClick={() => { logout(); closeAuthModal(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          /* ── NOT LOGGED IN ──────────────────────────────────────────────── */
          <div>
            {step === 'email' && (
              <div>
                {/* Brand mark */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xl">🐾</span>
                  <span className="text-sm font-bold text-gray-900">FurBowl</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">Sign in</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you a one-time code.</p>

                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <div className={`flex items-center border rounded-lg transition-all overflow-hidden ${error ? 'border-red-400' : 'border-gray-200 focus-within:border-[#ff4e20] focus-within:ring-1 focus-within:ring-[#ff4e20]/20'}`}>
                      <span className="pl-3.5 text-gray-400"><Mail className="w-4 h-4" /></span>
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="you@gmail.com"
                        className="flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300"
                        autoFocus required
                      />
                    </div>
                    {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
                  </div>

                  <button type="submit" disabled={loading || !email.includes('@')} id="send-email-otp-btn"
                    className="w-full bg-[#ff4e20] hover:bg-[#e84318] text-white py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm shadow-[#ff4e20]/30">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending code...</> : 'Send Verification Code →'}
                  </button>
                </form>

                <div className="relative my-5 flex items-center">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="px-3 text-[11px] text-gray-400 font-medium">or</span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>

                {/* Google */}
                <button type="button" onClick={triggerGoogleLogin} disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-5">
                  By continuing you agree to our{' '}
                  <Link href="/terms" onClick={closeAuthModal} className="underline hover:text-gray-600">Terms of Service</Link>
                </p>
              </div>
            )}

            {step === 'otp' && (
              <div>
                <button onClick={() => { setStep('email'); setError(''); setOtp(['', '', '', '', '', '']); }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 mb-5 cursor-pointer transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-[#fff0eb] rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#ff4e20]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">Check your inbox</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-5">Enter the 6-digit code we just sent you. It expires in 10 minutes.</p>

                {/* OTP inputs */}
                <div className="flex gap-2 mb-4 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => (otpRefs.current[i] = el)}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKey(i, e)}
                      autoFocus={i === 0}
                      className={`w-11 h-13 text-center text-lg font-bold border rounded-xl focus:outline-none transition-all ${
                        digit ? 'border-[#ff4e20] bg-[#fff8f6] text-[#ff4e20]' : 'border-gray-200 bg-white text-gray-900 focus:border-[#ff4e20] focus:ring-1 focus:ring-[#ff4e20]/20'
                      }`}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>

                {error && <p className="text-xs text-red-500 font-medium text-center mb-3">{error}</p>}

                <button onClick={handleVerifyOtp} disabled={loading || otp.join('').length < 6}
                  className="w-full bg-[#ff4e20] hover:bg-[#e84318] text-white py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm shadow-[#ff4e20]/30">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : <><ShieldCheck className="w-4 h-4" />Verify &amp; Continue</>}
                </button>

                <div className="text-center mt-4">
                  {resendCountdown > 0 ? (
                    <p className="text-xs text-gray-400">Resend in <span className="font-bold text-gray-600">{resendCountdown}s</span></p>
                  ) : (
                    <button onClick={handleResendOtp} disabled={resendLoading}
                      className="text-xs font-semibold text-[#ff4e20] hover:underline cursor-pointer disabled:opacity-50">
                      {resendLoading ? 'Sending...' : "Didn't get it? Resend code"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 'name' && (
              <div>
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">You're in! 🎉</h2>
                <p className="text-sm text-gray-500 mb-5">What should we call you?</p>

                <form onSubmit={handleSaveName} className="space-y-3">
                  <div>
                    <div className={`flex items-center border rounded-lg transition-all overflow-hidden ${error ? 'border-red-400' : 'border-gray-200 focus-within:border-[#ff4e20] focus-within:ring-1 focus-within:ring-[#ff4e20]/20'}`}>
                      <span className="pl-3.5 text-gray-400"><User className="w-4 h-4" /></span>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                        className="flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300"
                        autoFocus required />
                    </div>
                    {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
                  </div>
                  <button type="submit" disabled={loading || !name.trim()}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : 'Start Shopping 🐾'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
