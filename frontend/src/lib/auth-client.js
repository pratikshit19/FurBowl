/**
 * Email OTP Auth Client — with 12s fetch timeout
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

/** Fetch with a timeout (default 12s) */
async function fetchWithTimeout(url, options, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Send OTP to an email address.
 */
export async function sendEmailOtpService(email) {
  const normalizedEmail = email.toLowerCase().trim();
  const endpoints = getEndpoints('/auth/send-email-otp');
  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetchWithTimeout(url, {
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
    } catch (err) {
      if (err.name === 'AbortError') {
        lastError = 'Request timed out. Please check your connection and try again.';
      } else {
        lastError = err.message;
      }
    }
  }

  return {
    success: false,
    error: lastError || 'Could not connect to server. Please try again.',
  };
}

/**
 * Verify OTP.
 */
export async function verifyEmailOtpService({ email, otp }) {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanedOtp = String(otp).replace(/\D/g, '').trim();
  const endpoints = getEndpoints('/auth/verify-email-otp');
  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetchWithTimeout(url, {
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
    } catch (err) {
      if (err.name === 'AbortError') {
        lastError = 'Request timed out. Please try again.';
      } else {
        lastError = err.message;
      }
    }
  }

  return {
    success: false,
    error: lastError || 'Incorrect or expired OTP. Please try again.',
  };
}

// Legacy no-ops
export async function sendOtpService() { return { success: false, error: 'Use email OTP.' }; }
export async function verifyOtpService() { return { success: false, error: 'Use email OTP.' }; }
export async function retryOtpService() {}
