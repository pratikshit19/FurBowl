'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { sendEmailOtpService, verifyEmailOtpService } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';

/* ─────────────────────────────────────────────
   Step 1 — Email Input
───────────────────────────────────────────── */
function EmailInputStep({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
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
      onOtpSent(cleaned);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">Login / Sign Up</h1>
      <p className="text-plum-900/60 text-sm mb-6">
        Enter your email and we'll send a verification code to your inbox.
      </p>

      <div className="mb-5">
        <label htmlFor="email-input" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-2">
          Email Address
        </label>
        <div className="flex items-center rounded-md border border-plum-900/15 focus-within:border-coral-500 focus-within:ring-1 focus-within:ring-coral-500/30 transition-all bg-white overflow-hidden">
          <div className="flex items-center bg-plum-900/5 px-3.5 border-r border-plum-900/10">
            <Mail className="w-4 h-4 text-plum-900/40" />
          </div>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="you@gmail.com"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-plum-900 font-medium placeholder-plum-900/30 focus:outline-none"
            required
            autoFocus
          />
        </div>
        {error && (
          <p className="mt-2 text-xs text-rose-500 font-semibold">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !email.includes('@')}
        className="w-full bg-coral-500 text-white py-3.5 rounded font-bold text-sm hover:bg-coral-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-coral-500/20 flex items-center justify-center gap-2 cursor-pointer"
        id="send-email-otp-btn"
      >
        {loading ? 'Sending code…' : 'Send Verification Code'}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Step 2 — OTP Entry
───────────────────────────────────────────── */
function OtpStep({ email, onSuccess, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length >= 4) {
      const newOtp = ['', '', '', '', '', ''];
      pasted.split('').forEach((char, idx) => { if (idx < 6) newOtp[idx] = char; });
      setOtp(newOtp);
      inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join('').trim();
    if (code.length < 6) return;
    setLoading(true);
    setError('');
    try {
      const res = await verifyEmailOtpService({ email, otp: code });
      if (!res.success) {
        setError(res.error || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
        return;
      }
      onSuccess(res.user, res.token, res.isNewUser || !res.user?.name);
    } catch (err) {
      setError(err?.message || 'Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;
    setResendLoading(true);
    setError('');
    try {
      const res = await sendEmailOtpService(email);
      if (!res.success) {
        setError(res.error || 'Failed to resend OTP');
        return;
      }
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError(err?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const otpFilled = otp.join('').length === 6;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">Check Your Inbox</h1>
      <p className="text-plum-900/60 text-sm mb-1">
        We sent a 6-digit code to
      </p>
      <p className="text-sm font-bold text-coral-600 mb-6 truncate">{email}</p>

      {/* OTP Boxes */}
      <div className="flex gap-2.5 mb-5 justify-center" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center text-xl font-bold border rounded-xl focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all ${
              digit ? 'border-coral-500 bg-coral-50/50 text-coral-600' : 'border-plum-900/15 bg-white text-plum-900'
            }`}
            id={`otp-${i}`}
            autoFocus={i === 0}
            aria-label={`OTP digit ${i + 1}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-semibold text-center mb-4">{error}</p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading || !otpFilled}
        className="w-full bg-coral-500 text-white py-3.5 rounded font-bold text-sm hover:bg-coral-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-coral-500/20 cursor-pointer"
        id="verify-otp-btn"
      >
        {loading ? 'Verifying…' : 'Verify & Continue'}
      </button>

      <div className="flex justify-between items-center mt-5 pt-3 border-t border-plum-900/10">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-plum-900/60 font-semibold hover:text-coral-500 transition-colors cursor-pointer flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          Change Email
        </button>
        {resendTimer > 0 ? (
          <p className="text-xs text-plum-900/50 font-medium">Resend in {resendTimer}s</p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-xs text-coral-600 font-bold hover:underline cursor-pointer"
          >
            {resendLoading ? 'Sending…' : 'Resend Code'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step 3 — Set Username (new users only)
───────────────────────────────────────────── */
function UsernameStep({ user, token, onComplete }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername || cleanUsername.length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/auth/profile', {
        method: 'PUT',
        token,
        body: JSON.stringify({ name: cleanUsername }),
      });
      onComplete(data.user, token);
    } catch (err) {
      setError(err.message || 'Failed to save name');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">One Last Step</h1>
      <p className="text-plum-900/60 text-sm mb-6">
        What should we call you? This will be your display name on FurBowl.
      </p>

      <div className="mb-5">
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. Pratikshit"
          className="w-full border border-plum-900/15 rounded-xl px-4 py-3 text-sm text-plum-900 font-medium placeholder-plum-900/30 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all"
          autoFocus
          required
        />
        {error && <p className="text-xs text-rose-500 font-semibold mt-1.5">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || !username.trim()}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded font-bold text-sm active:scale-[0.98] disabled:opacity-50 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
      >
        {loading ? 'Saving…' : 'Start Shopping 🐾'}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Page Root
───────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'username'
  const [email, setEmail] = useState('');
  const [tempAuth, setTempAuth] = useState(null);

  const handleOtpSent = (emailAddr) => {
    setEmail(emailAddr);
    setStep('otp');
  };

  const handleSuccess = (user, token, isNewAccount = false) => {
    if (isNewAccount || !user?.name) {
      setTempAuth({ user, token });
      setStep('username');
    } else {
      setUser(user, token);
      router.push('/account');
    }
  };

  const handleUsernameComplete = (user, token) => {
    setUser(user, token);
    router.push('/account');
  };

  return (
    <div>
      {step === 'email' && (
        <EmailInputStep onOtpSent={handleOtpSent} />
      )}
      {step === 'otp' && (
        <OtpStep
          email={email}
          onSuccess={handleSuccess}
          onBack={() => setStep('email')}
        />
      )}
      {step === 'username' && tempAuth && (
        <UsernameStep
          user={tempAuth.user}
          token={tempAuth.token}
          onComplete={handleUsernameComplete}
        />
      )}
    </div>
  );
}
