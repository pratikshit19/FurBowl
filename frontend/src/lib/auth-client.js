/**
 * Email OTP Auth Client (Development & Production)
 *
 * Flow:
 *  1. User enters email → POST /auth/send-email-otp
 *  2. OTP is sent to their inbox (Gmail / any email)
 *  3. User enters OTP → POST /auth/verify-email-otp
 *  4. On success → JWT token + user object returned
 */

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

function getEndpoints(path) {
  return isLocalhost()
    ? [`${LOCAL_API_URL}${path}`, `${CLOUD_API_URL}${path}`]
    : [`${CLOUD_API_URL}${path}`];
}

/**
 * Send OTP to an email address.
 * @param {string} email
 * @returns {{ success: boolean, error?: string }}
 */
export async function sendEmailOtpService(email) {
  const normalizedEmail = email.toLowerCase().trim();
  const endpoints = getEndpoints('/auth/send-email-otp');
  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        return { success: true, email: normalizedEmail, devMode: data.devMode };
      }

      lastError = typeof data.error === 'string' ? data.error : (data.message || 'Failed to send OTP');
    } catch (fetchErr) {
      lastError = fetchErr.message;
    }
  }

  return {
    success: false,
    error: lastError || 'Could not connect to authentication server. Please try again.',
  };
}

/**
 * Verify OTP entered by user against their email.
 * @param {{ email: string, otp: string }} params
 * @returns {{ success: boolean, user?, token?, isNewUser?, error? }}
 */
export async function verifyEmailOtpService({ email, otp }) {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanedOtp = String(otp).replace(/\D/g, '').trim();
  const endpoints = getEndpoints('/auth/verify-email-otp');
  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, otp: cleanedOtp }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.user) {
        return { success: true, ...data };
      }

      lastError = typeof data.error === 'string' ? data.error : (data.message || 'Invalid OTP');
    } catch (fetchErr) {
      lastError = fetchErr.message;
    }
  }

  return {
    success: false,
    error: lastError || 'Incorrect or expired OTP. Please try again.',
  };
}

// ── Legacy phone OTP exports (kept for any residual usage, map to no-ops) ──

export async function sendOtpService() {
  return { success: false, error: 'Phone OTP is no longer supported. Use email OTP.' };
}

export async function verifyOtpService() {
  return { success: false, error: 'Phone OTP is no longer supported. Use email OTP.' };
}

export async function retryOtpService() {}
