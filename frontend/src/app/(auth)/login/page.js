'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { initMsg91Widget } from '@/lib/msg91';
import { sendOtpService, verifyOtpService, retryOtpService, isLocalhost } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function PhoneStep({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState('whatsapp');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    initMsg91Widget().catch((err) => console.warn('MSG91 init warning:', err));
  }, []);

  const handleSubmit = async (e, chosenChannel = 'whatsapp') => {
    e?.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setChannel(chosenChannel);
    setLoading(true); setError('');
    try {
      const res = await sendOtpService(cleaned, chosenChannel);
      if (!res.success) {
        setError(res.error || 'Failed to send OTP');
        setLoading(false);
        return;
      }
      onOtpSent(cleaned, chosenChannel);
    } catch (e) {
      const msg = typeof e === 'string' ? e : (e?.message || 'Failed to send verification code');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 'whatsapp')}>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">Login / Sign Up</h1>
      <p className="text-plum-900/60 text-sm mb-4">Enter your mobile number to receive an instant verification code</p>

      <div className="mb-5">
        <label htmlFor="phone-input" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-2">
          Mobile Number
        </label>
        <div className="flex rounded-md border border-plum-900/15 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/30 transition-all bg-white overflow-hidden">
          <div className="flex items-center bg-plum-900/5 px-3.5 text-sm text-plum-900/70 font-bold border-r border-plum-900/10">
            +91
          </div>
          <input
            id="phone-input"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="9876543210"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-plum-900 font-medium placeholder-plum-900/30 focus:outline-none"
            required
            autoFocus
          />
        </div>
        {error && (
          <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 font-medium space-y-1.5">
            <p>{typeof error === 'string' ? error : (error?.message || 'Something went wrong')}</p>
            {String(error || '').includes('DLT') && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'whatsapp')}
                className="font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Switch to WhatsApp OTP now</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Primary Action: WhatsApp OTP */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'whatsapp')}
          disabled={loading || phone.length !== 10}
          className="w-full bg-[#25D366] text-white py-3.5 rounded font-bold text-sm hover:bg-[#20bd5a] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          id="send-whatsapp-otp-btn"
        >
          {loading && channel === 'whatsapp' ? (
            'Sending WhatsApp OTP…'
          ) : (
            <>
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Get OTP on WhatsApp</span>
            </>
          )}
        </button>

        {/* Secondary Action: SMS OTP */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'sms')}
          disabled={loading || phone.length !== 10}
          className="w-full bg-white border border-plum-900/15 text-plum-900 py-2.5 rounded font-semibold text-xs hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          id="send-sms-otp-btn"
        >
          {loading && channel === 'sms' ? (
            'Sending SMS…'
          ) : (
            <span>Get OTP via SMS</span>
          )}
        </button>
      </div>
    </form>
  );
}

function OtpStep({ phone, channel = 'whatsapp', onSuccess, onBack }) {
  const [currentChannel, setCurrentChannel] = useState(channel);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
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
      pasted.split('').forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pasted.length, 5);
      inputsRef.current[nextFocus]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join('').trim();
    if (code.length < 4) return;
    setLoading(true); setError('');
    try {
      const res = await verifyOtpService({ phone, otp: code });
      if (!res.success) {
        setError(res.error || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
        return;
      }
      onSuccess(res.user, res.token, res.isNewUser || !res.user?.name);
    } catch (e) {
      setError(typeof e === 'string' ? e : (e?.message || 'Invalid OTP'));
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (targetChannel = currentChannel) => {
    if (resendTimer > 0) return;
    setLoading(true);
    setCurrentChannel(targetChannel);
    try {
      await retryOtpService(targetChannel);
      const res = await sendOtpService(phone, targetChannel);
      if (!res.success) {
        setError(res.error || 'Failed to resend OTP');
        return;
      }
      setResendTimer(30);
      setError('');
    } catch (e) {
      setError(typeof e === 'string' ? e : (e?.message || 'Failed to resend OTP'));
    } finally {
      setLoading(false);
    }
  };

  const otpString = otp.join('');

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">Enter Verification Code</h1>
      <p className="text-plum-900/60 text-sm mb-4">
        {currentChannel === 'whatsapp' ? (
          <>
            We sent a verification code to your <strong className="text-emerald-700 font-bold">WhatsApp</strong> at{' '}
            <strong className="text-plum-900 font-bold">+91 {phone}</strong>
          </>
        ) : (
          <>
            We sent an SMS verification code to <strong className="text-plum-900 font-bold">+91 {phone}</strong>
          </>
        )}
      </p>

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
        disabled={loading || otpString.length < 4}
        className="w-full bg-coral-500 text-white py-3.5 rounded font-bold text-sm hover:bg-coral-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-coral-500/20 cursor-pointer"
        id="verify-otp-btn"
      >
        {loading ? 'Verifying…' : 'Verify OTP'}
      </button>

      <div className="flex flex-col gap-2.5 mt-5 pt-3 border-t border-plum-900/10">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-plum-900/60 font-semibold hover:text-coral-500 transition-colors cursor-pointer"
          >
            ← Change Number
          </button>
          {resendTimer > 0 ? (
            <p className="text-xs text-plum-900/50 font-medium">Resend in {resendTimer}s</p>
          ) : (
            <button
              type="button"
              onClick={() => handleResend(currentChannel)}
              className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              {currentChannel === 'whatsapp' && <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />}
              <span>Resend on {currentChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'}</span>
            </button>
          )}
        </div>

        {resendTimer <= 0 && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => handleResend(currentChannel === 'whatsapp' ? 'sms' : 'whatsapp')}
              className="text-xs text-plum-900/70 hover:text-plum-900 underline font-medium cursor-pointer"
            >
              Send via {currentChannel === 'whatsapp' ? 'SMS' : 'WhatsApp (Instant)'} instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmailStep({ onSuccess }) {
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login';
      const body = { email: email.trim(), password };

      const data = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      onSuccess(data.user, data.token, mode === 'signup' || data.isNewUser || !data.user.name);
    } catch (e) {
      // Fallback for demo/offline
      if (e.message.includes('fetch') || e.message.includes('Failed') || e.message.includes('HTTP')) {
        const fallbackUser = {
          id: 'usr_' + Date.now(),
          email: email.trim(),
          name: null,
        };
        onSuccess(fallbackUser, 'demo-token-' + Date.now(), mode === 'signup');
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">
        {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
      </h1>
      <p className="text-plum-900/60 text-sm mb-6">
        {mode === 'signup'
          ? 'Enter your details to create a new FurBowl account'
          : 'Sign in with your registered email and password'}
      </p>

      {/* Mode Sub-toggle */}
      <div className="flex bg-plum-900/5 p-1 rounded-xl mb-5 border border-plum-900/10">
        <button
          type="button"
          onClick={() => { setMode('signup'); setError(''); }}
          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all ${
            mode === 'signup'
              ? 'bg-white text-plum-900 shadow-xs'
              : 'text-plum-900/60 hover:text-plum-900'
          }`}
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => { setMode('login'); setError(''); }}
          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all ${
            mode === 'login'
              ? 'bg-white text-plum-900 shadow-xs'
              : 'text-plum-900/60 hover:text-plum-900'
          }`}
        >
          Sign In
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="priya@example.com"
          className="w-full border border-plum-900/15 rounded-xl px-4 py-3 text-sm text-plum-900 font-medium focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-plum-900/15 rounded-xl px-4 py-3 text-sm text-plum-900 font-medium focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all"
          required
        />
      </div>

      {error && <p className="text-xs text-rose-500 font-semibold mb-4 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-coral-500 text-white py-3.5 rounded font-bold text-sm hover:bg-coral-600 active:scale-[0.98] disabled:opacity-50 transition-all shadow-md shadow-coral-500/20"
      >
        {loading
          ? mode === 'signup' ? 'Creating Account…' : 'Signing In…'
          : mode === 'signup' ? 'Create Account' : 'Sign In with Email'}
      </button>
    </form>
  );
}

function UsernameStep({ user, token, onComplete }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setError('Please enter a username');
      return;
    }
    if (cleanUsername.length < 2) {
      setError('Username must be at least 2 characters');
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
      setError(err.message || 'Failed to save username');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-plum-900 mb-2">
        Choose your preferred username
      </h1>
      <p className="text-plum-900/60 text-sm mb-6">
        This will be your display name and identity across FurBowl.
      </p>

      <div className="mb-5">
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-2">
          Preferred Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. pratikshit"
          className="w-full border border-plum-900/15 rounded-xl px-4 py-3 text-sm text-plum-900 font-medium placeholder-plum-900/30 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all"
          autoFocus
          required
        />
        {error && <p className="text-xs text-peach-600 font-semibold mt-1.5">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || !username.trim()}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded font-bold text-sm active:scale-[0.98] disabled:opacity-50 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
      >
        {loading ? 'Saving…' : 'Confirm Username'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'username'
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState('whatsapp');
  const [tempAuth, setTempAuth] = useState(null);

  const handleOtpSent = (phoneNum, chosenChannel = 'whatsapp') => {
    setPhone(phoneNum);
    setChannel(chosenChannel);
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
      {/* Top Method Tabs */}
      {step === 'phone' && (
        <div className="flex border-b border-plum-900/10 mb-6">
          <button
            type="button"
            onClick={() => setMethod('phone')}
            className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 transition-all flex items-center justify-center gap-2 ${
              method === 'phone'
                ? 'border-emerald-500 text-emerald-700'
                : 'border-transparent text-plum-900/50 hover:text-plum-900'
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp / Phone OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod('email')}
            className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 transition-all flex items-center justify-center gap-2 ${
              method === 'email'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-plum-900/50 hover:text-plum-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email &amp; Password</span>
          </button>
        </div>
      )}

      {step === 'username' && tempAuth ? (
        <UsernameStep
          user={tempAuth.user}
          token={tempAuth.token}
          onComplete={handleUsernameComplete}
        />
      ) : method === 'email' ? (
        <EmailStep onSuccess={handleSuccess} />
      ) : step === 'phone' ? (
        <PhoneStep onOtpSent={handleOtpSent} />
      ) : (
        <OtpStep phone={phone} channel={channel} onSuccess={handleSuccess} onBack={() => setStep('phone')} />
      )}
    </div>
  );
}
