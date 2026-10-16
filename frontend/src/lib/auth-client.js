/**
 * Multi-environment Auth Client (Development & Production)
 *
 * Seamlessly handles:
 * 1. Localhost development (http://localhost:5000 with auto-fallback to cloud)
 * 2. Production (https://furbowl.onrender.com / https://furbowl.co.in)
 * 3. Instant Dev Bypass (123456 or 1234 on localhost)
 * 4. WhatsApp OTP primary delivery via MSG91
 */

import { msg91SendOtp, msg91VerifyOtp, msg91RetryOtp } from './msg91';

export const CLOUD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furbowl.onrender.com/api/v1';
export const LOCAL_API_URL = 'http://localhost:5000/api/v1';

export function isLocalhost() {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local')
  );
}

/**
 * Universal OTP Sender
 * Works on localhost (local server or cloud fallback) and production.
 */
export async function sendOtpService(phone, channel = 'whatsapp') {
  const cleaned = phone.replace(/\D/g, '').slice(-10);
  const onLocal = isLocalhost();

  let msg91Sent = false;
  try {
    const msg91Res = await msg91SendOtp(cleaned, channel);
    if (msg91Res?.success) {
      msg91Sent = true;
    }
  } catch (mErr) {
    console.warn('MSG91 client sendOtp note:', mErr?.message);
  }

  // Candidate backend endpoints
  const endpoints = onLocal
    ? [`${LOCAL_API_URL}/auth/send-otp`, `${CLOUD_API_URL}/auth/send-otp`]
    : [`${CLOUD_API_URL}/auth/send-otp`];

  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned, channel }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        return { success: true, phone: cleaned, channel, data };
      }

      const errorText = typeof data.error === 'string' ? data.error : (data.error?.message || data.message || 'Failed to send OTP');
      if (data.suggestWhatsApp || errorText.includes('DLT')) {
        return { success: false, error: errorText, suggestWhatsApp: true };
      }

      lastError = errorText;
    } catch (fetchErr) {
      // Endpoint unreachable (e.g. localhost:5000 not started yet, or Render cold start)
      lastError = fetchErr.message;
    }
  }

  // If MSG91 widget sent OTP directly on client, proceed even if backend was unreachable
  if (msg91Sent) {
    return { success: true, phone: cleaned, channel };
  }

  // In local development, if gateway is rate-limited or servers offline, allow proceeding
  if (onLocal) {
    console.log(`[Dev Mode] Proceeding to OTP step. Use bypass code: 123456`);
    return { success: true, phone: cleaned, channel, isDevMode: true };
  }

  const cleanError = lastError?.includes('IPBlocked')
    ? 'Too many attempts from this network. Please try again in a few moments.'
    : (lastError || 'Server connection timed out. Please try again.');

  return {
    success: false,
    error: cleanError,
  };
}

/**
 * Universal OTP Verifier
 * Works in development (accepts bypass codes 123456 / 1234) and production.
 */
export async function verifyOtpService({ phone, otp }) {
  const cleanedPhone = phone.replace(/\D/g, '').slice(-10);
  const cleanedOtp = otp.replace(/\D/g, '').trim();
  const onLocal = isLocalhost();

  // Instant Dev Bypass on localhost
  if (onLocal && (cleanedOtp === '123456' || cleanedOtp === '1234')) {
    return {
      success: true,
      user: {
        id: 'usr_dev_' + cleanedPhone,
        phone: cleanedPhone,
        name: null,
        role: 'CUSTOMER',
      },
      token: 'dev-jwt-token-' + Date.now(),
      isNewUser: true,
    };
  }

  // 1. Try verifying with MSG91 widget
  let accessToken = null;
  try {
    const msg91Res = await msg91VerifyOtp(cleanedOtp);
    if (msg91Res?.token) {
      accessToken = msg91Res.token;
    }
  } catch (mErr) {
    console.warn('MSG91 verifyOtp note:', mErr?.message);
  }

  // Candidate backend endpoints
  const endpoints = onLocal
    ? [`${LOCAL_API_URL}/auth/verify-otp`, `${CLOUD_API_URL}/auth/verify-otp`]
    : [`${CLOUD_API_URL}/auth/verify-otp`];

  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanedPhone, otp: cleanedOtp, accessToken }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.user) {
        return { success: true, ...data };
      }

      lastError = typeof data.error === 'string' ? data.error : (data.error?.message || 'Invalid OTP');
    } catch (fetchErr) {
      lastError = fetchErr.message;
    }
  }

  // If MSG91 widget verified access-token, don't block user even if backend network failed
  if (accessToken) {
    return {
      success: true,
      user: { id: 'usr_' + Date.now(), phone: cleanedPhone, name: null, role: 'CUSTOMER' },
      token: accessToken,
      isNewUser: true,
    };
  }

  // In local development, if backend is unreachable and not using bypass, give clear guidance
  if (onLocal && !lastError) {
    return {
      success: false,
      error: 'Cannot connect to authentication server. For local dev testing, use bypass code: 123456',
    };
  }

  return {
    success: false,
    error: lastError || 'Incorrect or expired OTP',
  };
}

/**
 * Universal Resend OTP
 */
export async function retryOtpService(channel = 'whatsapp') {
  try {
    await msg91RetryOtp(channel);
  } catch (_) {}
}
