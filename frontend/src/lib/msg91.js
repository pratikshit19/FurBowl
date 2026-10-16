/**
 * MSG91 OTP Widget Web SDK Integration (Custom Headless UI)
 *
 * Uses MSG91's `exposeMethods: true` to provide a custom UI while MSG91
 * manages multi-channel OTP delivery (SMS, WhatsApp, fallback) and token verification.
 */

const WIDGET_ID = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID || '3669786e7073323134353130';
const TOKEN_AUTH = process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH || '566725TRlYykKIBo6a973790P1';
const SCRIPT_URL = 'https://verify.msg91.com/otp-provider.js';

let scriptLoadingPromise = null;
let lastVerifiedToken = null;
let isMsg91IpBlocked = false;

function formatArg(arg) {
  if (!arg) return '';
  if (arg instanceof Error) return `${arg.name} ${arg.message} ${arg.stack || ''}`;
  if (typeof arg === 'object') {
    try { return JSON.stringify(arg); } catch (_) { return String(arg); }
  }
  return String(arg);
}

// Intercept third-party MSG91 console.error calls (e.g. "IPBlocked", rate limits) so Next.js dev overlay is not triggered
if (typeof window !== 'undefined' && !window.__msg91ConsoleIntercepted) {
  window.__msg91ConsoleIntercepted = true;
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const combined = args.map(formatArg).join(' ');
    const isMsg91Error =
      combined.includes('IPBlocked') ||
      combined.includes('ip_blocked') ||
      combined.includes('MSG91') ||
      combined.includes('OTPWidget') ||
      combined.includes('otp-provider');

    if (isMsg91Error) {
      isMsg91IpBlocked = true;
      console.warn('[MSG91 Rate Limit Note]', ...args);
      return;
    }
    return originalConsoleError.apply(console, args);
  };
}

/**
 * Dynamically loads the MSG91 OTP Widget SDK script once.
 */
export function loadMsg91Script() {
  if (typeof window === 'undefined') return Promise.resolve(false);

  // If already loaded and initialized
  if (typeof window.initSendOTP === 'function') {
    return Promise.resolve(true);
  }

  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve) => {
    // Check if script tag already exists in DOM
    const existing = document.getElementById('msg91-otp-script');
    if (existing) {
      if (typeof window.initSendOTP === 'function') {
        resolve(true);
      } else {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'msg91-otp-script';
    script.src = SCRIPT_URL;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = (err) => {
      console.warn('Failed to load MSG91 OTP Widget script:', err);
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Initializes the MSG91 OTP Widget with `exposeMethods: true` so no popup is shown.
 */
export async function initMsg91Widget({ onSuccess, onFailure } = {}) {
  if (typeof window === 'undefined') return false;
  if (isMsg91IpBlocked) return false;

  // Ensure captcha placeholder container exists to prevent MSG91 hCaptcha initialization TypeError
  if (!document.getElementById('msg91-captcha-container')) {
    const container = document.createElement('div');
    container.id = 'msg91-captcha-container';
    container.style.display = 'none';
    document.body.appendChild(container);
  }

  await loadMsg91Script();

  return new Promise((resolve) => {
    window.configuration = {
      widgetId: WIDGET_ID,
      tokenAuth: TOKEN_AUTH,
      exposeMethods: true,
      captchaRenderId: 'msg91-captcha-container',
      success: (data) => {
        // Capture verification token
        const token = extractAccessToken(data);
        if (token) lastVerifiedToken = token;
        if (onSuccess) onSuccess(data);
      },
      failure: (error) => {
        if (error?.message === 'IPBlocked' || error?.code === '408' || String(error).includes('IPBlocked')) {
          isMsg91IpBlocked = true;
          console.warn('[MSG91 Note] Client IP is throttled on widget. Fallback handles OTP delivery.');
        } else {
          console.warn('MSG91 Widget error:', error);
        }
        if (onFailure) onFailure(error);
      },
    };

    const tryInit = () => {
      if (typeof window.initSendOTP === 'function') {
        try {
          window.initSendOTP(window.configuration);
          resolve(true);
          return true;
        } catch (e) {
          console.warn('initSendOTP invocation error:', e);
        }
      }
      return false;
    };

    if (!tryInit()) {
      // Poll briefly if script is still parsing
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (tryInit() || attempts > 20) {
          clearInterval(interval);
          resolve(typeof window.sendOtp === 'function');
        }
      }, 100);
    }
  });
}

/**
 * Extract the JWT access token from MSG91 response data
 */
export function extractAccessToken(data) {
  if (!data) return null;
  if (typeof data === 'string' && data.length > 20) return data;
  if (data['access-token']) return data['access-token'];
  if (data.accessToken) return data.accessToken;
  if (data.token) return data.token;
  if (typeof data.message === 'string' && data.message.length > 20) return data.message;
  return null;
}

/**
 * Gets the last verified token received from MSG91
 */
export function getLastVerifiedToken() {
  return lastVerifiedToken;
}

/**
 * Sends OTP via MSG91 custom UI method
 * @param {string} phone - 10-digit Indian phone number
 * @param {'whatsapp'|'sms'} [channel='whatsapp'] - delivery channel
 */
export async function msg91SendOtp(phone, channel = 'whatsapp') {
  if (isMsg91IpBlocked) {
    return { fallback: true, isIpBlocked: true };
  }

  const cleaned = phone.replace(/\D/g, '').slice(-10);
  const identifier = `91${cleaned}`;

  await initMsg91Widget();

  if (typeof window !== 'undefined' && typeof window.sendOtp === 'function') {
    return new Promise((resolve) => {
      try {
        // MSG91 Web SDK accepts the mobile string directly
        window.sendOtp(
          identifier,
          (res) => {
            // If whatsapp channel requested, retry via whatsapp channel if initial was SMS
            if (channel === 'whatsapp' && typeof window.retryOtp === 'function') {
              try {
                window.retryOtp('12', () => {}, () => {});
              } catch (_) {}
            }
            resolve({ success: true, channel, data: res });
          },
          (err) => {
            const errorText = typeof err === 'string' ? err : err?.message || (typeof err === 'object' ? JSON.stringify(err) : 'Failed to send OTP');
            console.warn('MSG91 sendOtp returned callback error:', errorText);
            resolve({ fallback: true, error: errorText });
          }
        );
      } catch (e) {
        const errorText = typeof e === 'string' ? e : e?.message || 'Failed to send OTP';
        console.warn('MSG91 sendOtp caught synchronous error:', errorText);
        resolve({ fallback: true, error: errorText });
      }
    });
  }

  // If MSG91 SDK is unavailable, signal fallback
  return { fallback: true };
}

/**
 * Verifies OTP via MSG91 custom UI method
 * @param {string} otp - OTP code
 */
export async function msg91VerifyOtp(otp) {
  lastVerifiedToken = null;

  if (typeof window !== 'undefined' && typeof window.verifyOtp === 'function') {
    return new Promise((resolve) => {
      try {
        window.verifyOtp(
          otp,
          (res) => {
            const token = extractAccessToken(res) || lastVerifiedToken;
            resolve({ success: true, token, data: res });
          },
          (err) => {
            const errorMsg = typeof err === 'string' ? err : err?.message || 'Incorrect OTP';
            console.warn('MSG91 verifyOtp returned error callback:', errorMsg);
            resolve({ success: false, error: errorMsg });
          }
        );
      } catch (e) {
        const errorMsg = typeof e === 'string' ? e : e?.message || 'Verification failed';
        console.warn('MSG91 verifyOtp caught synchronous error:', errorMsg);
        resolve({ success: false, error: errorMsg });
      }
    });
  }

  return { fallback: true };
}

/**
 * Retries/resends OTP via MSG91
 * @param {'whatsapp'|'sms'|string|null} [channel='whatsapp'] - delivery channel
 */
export async function msg91RetryOtp(channel = 'whatsapp') {
  if (typeof window !== 'undefined' && typeof window.retryOtp === 'function') {
    // In MSG91 widget: '12' = WhatsApp, '11' = SMS
    const channelCode = channel === 'sms' ? '11' : (channel === 'whatsapp' ? '12' : channel);
    return new Promise((resolve, reject) => {
      try {
        window.retryOtp(
          channelCode,
          (res) => resolve({ success: true, channel, data: res }),
          (err) => {
            const errorMsg = typeof err === 'string' ? err : err?.message || 'Failed to resend OTP';
            reject(new Error(errorMsg));
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  return { fallback: true };
}
