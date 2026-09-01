/**
 * Send OTP via MSG91
 * @param {string} phone - 10-digit Indian phone number
 * @param {string} otp - 6-digit OTP code
 */
export async function sendOtp(phone, otp) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID || 'FURBWL';

  if (!authKey || !templateId) {
    console.warn('MSG91 credentials not configured. OTP not sent.');
    return;
  }

  const url = 'https://api.msg91.com/api/v5/otp';
  const body = {
    template_id: templateId,
    mobile: `91${phone}`,
    authkey: authKey,
    otp,
    sender: senderId,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok || data.type !== 'success') {
    console.error('MSG91 OTP send failed:', data);
    throw new Error('Failed to send OTP');
  }

  return data;
}
