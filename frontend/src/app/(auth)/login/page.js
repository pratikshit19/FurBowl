'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function PhoneStep({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      onOtpSent(cleaned);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Login / Sign Up</h1>
      <p className="text-gray-500 text-sm mb-8">Enter your mobile number to receive a one-time password</p>

      <div className="mb-5">
        <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mobile Number
        </label>
        <div className="flex">
          <div className="flex items-center bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg px-3 text-sm text-gray-500 font-medium">
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
            className="flex-1 border border-gray-200 rounded-r-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
            required
            autoFocus
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || phone.length !== 10}
        className="w-full bg-turquoise-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-turquoise-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        id="send-otp-btn"
      >
        {loading ? 'Sending OTP…' : 'Send OTP'}
      </button>
    </form>
  );
}

function OtpStep({ phone, onSuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef([]);

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
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputsRef.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return;
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: code }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      onSuccess(data.user, data.token);
    } catch (e) {
      setError(e.message);
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify when all 6 digits filled
  const otpString = otp.join('');
  if (otpString.length === 6 && !loading) {
    handleVerify();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h1>
      <p className="text-gray-500 text-sm mb-8">
        We sent a 6-digit code to <strong>+91 {phone}</strong>
      </p>

      {/* OTP Boxes */}
      <div className="flex gap-3 mb-5 justify-center" onPaste={handlePaste}>
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
            className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-turquoise-500 transition-colors ${
              digit ? 'border-turquoise-500 bg-turquoise-50 text-turquoise-700' : 'border-gray-200'
            }`}
            id={`otp-${i}`}
            autoFocus={i === 0}
            aria-label={`OTP digit ${i + 1}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-500 text-center mb-4">{error}</p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading || otpString.length !== 6}
        className="w-full bg-turquoise-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-turquoise-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        id="verify-otp-btn"
      >
        {loading ? 'Verifying…' : 'Verify OTP'}
      </button>

      <div className="text-center mt-4">
        {resendTimer > 0 ? (
          <p className="text-sm text-gray-400">Resend OTP in {resendTimer}s</p>
        ) : (
          <button className="text-sm text-turquoise-600 font-medium hover:text-turquoise-700">
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');

  const handleOtpSent = (phoneNum) => {
    setPhone(phoneNum);
    setStep('otp');
  };

  const handleSuccess = (user, token) => {
    setUser(user, token);
    router.push('/account');
  };

  return (
    <>
      {step === 'phone' && <PhoneStep onOtpSent={handleOtpSent} />}
      {step === 'otp' && <OtpStep phone={phone} onSuccess={handleSuccess} />}
    </>
  );
}
