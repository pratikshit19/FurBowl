'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, ShieldCheck, Loader2, User, CheckCircle2 } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { sendEmailOtpService, verifyEmailOtpService } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';

/* ── Step 1: Email Input ─────────────────────────────────────── */
function EmailStep({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleaned = email.toLowerCase().trim();
    if (!cleaned.includes('@') || !cleaned.includes('.')) {
      setError('Please enter a valid email address'); return;
    }
    setLoading(true); setError('');
    try {
      const res = await sendEmailOtpService(cleaned);
      if (!res.success) { setError(res.error || 'Failed to send code.'); return; }
      onOtpSent(cleaned);
    } catch (err) {
      setError(err?.message || 'Something went wrong.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to FurBowl</h1>
        <p className="text-sm text-gray-500">Enter your email — we'll send a one-time login code.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${error ? 'border-red-400' : 'border-gray-200 focus-within:border-[#ff4e20] focus-within:ring-2 focus-within:ring-[#ff4e20]/10'}`}>
            <span className="pl-4 text-gray-400"><Mail className="w-4 h-4" /></span>
            <input
              type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="you@gmail.com"
              className="flex-1 px-3 py-3.5 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300"
              autoFocus required id="email-input"
            />
          </div>
          {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
        </div>

        <button type="submit" disabled={loading || !email.includes('@')} id="send-email-otp-btn"
          className="w-full bg-[#ff4e20] hover:bg-[#e84318] text-white py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] shadow-md shadow-[#ff4e20]/20">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending code...</> : 'Send Verification Code →'}
        </button>
      </form>
    </div>
  );
}

/* ── Step 2: OTP Entry ───────────────────────────────────────── */
function OtpStep({ email, onSuccess, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleChange = (i, val) => {
    const d = val.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[i] = d; setOtp(next); setError('');
    if (d && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKey = (i, e) => { if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus(); };
  const handlePaste = (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (digits.length >= 4) {
      const next = ['', '', '', '', '', ''];
      digits.split('').forEach((d, i) => { if (i < 6) next[i] = d; });
      setOtp(next); refs.current[Math.min(digits.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) return;
    setLoading(true); setError('');
    try {
      const res = await verifyEmailOtpService({ email, otp: code });
      if (!res.success) {
        setError(res.error || 'Invalid code.'); setOtp(['', '', '', '', '', '']); refs.current[0]?.focus(); return;
      }
      onSuccess(res.user, res.token, res.isNewUser || !res.user?.name);
    } catch (err) {
      setError(err?.message || 'Verification failed.');
      setOtp(['', '', '', '', '', '']); refs.current[0]?.focus();
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;
    setResendLoading(true); setError('');
    try {
      const res = await sendEmailOtpService(email);
      if (res.success) { setResendTimer(30); setOtp(['', '', '', '', '', '']); refs.current[0]?.focus(); }
      else { setError(res.error || 'Failed to resend'); }
    } catch (err) { setError(err?.message || 'Failed to resend'); }
    finally { setResendLoading(false); }
  };

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 mb-6 cursor-pointer transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-[#fff0eb] rounded-full flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-[#ff4e20]" />
        </div>
        <div>
          <p className="text-base font-bold text-gray-900">Check your inbox</p>
          <p className="text-xs text-gray-500 truncate">{email}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code we sent you. Valid for 10 minutes.</p>

      <div className="flex gap-2.5 mb-5 justify-center" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input key={i} ref={(el) => (refs.current[i] = el)}
            type="text" inputMode="numeric" maxLength={1} value={digit}
            onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
            autoFocus={i === 0} id={`otp-${i}`} aria-label={`Digit ${i + 1}`}
            className={`w-12 h-14 text-center text-xl font-bold border rounded-xl focus:outline-none transition-all ${
              digit ? 'border-[#ff4e20] bg-[#fff8f6] text-[#ff4e20]' : 'border-gray-200 bg-white text-gray-900 focus:border-[#ff4e20] focus:ring-2 focus:ring-[#ff4e20]/10'
            }`}
          />
        ))}
      </div>

      {error && <p className="text-xs text-red-500 font-medium text-center mb-4">{error}</p>}

      <button onClick={handleVerify} disabled={loading || otp.join('').length < 6} id="verify-otp-btn"
        className="w-full bg-[#ff4e20] hover:bg-[#e84318] text-white py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] shadow-md shadow-[#ff4e20]/20">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : <><ShieldCheck className="w-4 h-4" />Verify &amp; Continue</>}
      </button>

      <div className="text-center mt-5">
        {resendTimer > 0 ? (
          <p className="text-xs text-gray-400">Resend in <span className="font-bold text-gray-700">{resendTimer}s</span></p>
        ) : (
          <button onClick={handleResend} disabled={resendLoading} className="text-xs font-semibold text-[#ff4e20] hover:underline cursor-pointer disabled:opacity-50">
            {resendLoading ? 'Sending...' : "Didn't receive it? Resend code"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Step 3: Name (new users) ────────────────────────────────── */
function NameStep({ user, token, onComplete }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 2) { setError('Please enter at least 2 characters'); return; }
    setLoading(true); setError('');
    try {
      const data = await apiFetch('/auth/profile', { method: 'PUT', token, body: JSON.stringify({ name: clean }) });
      onComplete(data.user, token);
    } catch (err) { setError(err.message || 'Failed to save'); setLoading(false); }
  };

  return (
    <div>
      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-5">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">You're in! 🎉</h1>
      <p className="text-sm text-gray-500 mb-6">What should we call you?</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${error ? 'border-red-400' : 'border-gray-200 focus-within:border-[#ff4e20] focus-within:ring-2 focus-within:ring-[#ff4e20]/10'}`}>
            <span className="pl-4 text-gray-400"><User className="w-4 h-4" /></span>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Your name" className="flex-1 px-3 py-3.5 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300"
              autoFocus required />
          </div>
          {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
        </div>
        <button type="submit" disabled={loading || !name.trim()}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : 'Start Shopping 🐾'}
        </button>
      </form>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [tempAuth, setTempAuth] = useState(null);

  const handleOtpSent = (addr) => { setEmail(addr); setStep('otp'); };
  const handleSuccess = (user, token, isNew) => {
    if (isNew || !user?.name) { setTempAuth({ user, token }); setStep('name'); }
    else { setUser(user, token); router.push('/account'); }
  };
  const handleComplete = (user, token) => { setUser(user, token); router.push('/account'); };

  return (
    <div>
      {step === 'email' && <EmailStep onOtpSent={handleOtpSent} />}
      {step === 'otp' && <OtpStep email={email} onSuccess={handleSuccess} onBack={() => setStep('email')} />}
      {step === 'name' && tempAuth && <NameStep user={tempAuth.user} token={tempAuth.token} onComplete={handleComplete} />}
    </div>
  );
}
