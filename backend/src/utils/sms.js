/**
 * Send OTP via MSG91 (Supports WhatsApp & SMS)
 * @param {string} phone - 10-digit Indian phone number
 * @param {string} otp - 6-digit OTP code
 * @param {'whatsapp'|'sms'} [channel='whatsapp'] - delivery channel
 */
export async function sendOtp(phone, otp, channel = 'whatsapp') {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID || 'FURBWL';
  const widgetId = process.env.MSG91_WIDGET_ID;

  if (!authKey) {
    console.warn('MSG91 auth key not configured. OTP not dispatched to external gateway.');
    return { dev: true };
  }

  let dispatched = false;

  // 1. Primary: Direct MSG91 SendOTP v5 Engine (Dispatches OTP with custom code to phone)
  if (templateId) {
    try {
      const url = `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${phone}&authkey=${authKey}&otp=${otp}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          OTP: otp,
          otp,
          code: otp,
        }),
      });

      const data = await res.json();
      if (res.ok && data.type === 'success') {
        console.log(`✅ MSG91 OTP dispatched successfully to +91 ${phone} (ReqID: ${data.request_id})`);
        dispatched = true;
      } else {
        console.warn('MSG91 SendOTP v5 response:', data);
      }
    } catch (err) {
      console.warn('MSG91 SendOTP v5 error:', err.message);
    }
  }

  // 2. WhatsApp Multi-Channel Delivery via Widget / WhatsApp Retry
  if (channel === 'whatsapp') {
    if (widgetId) {
      try {
        const widgetRes = await fetch('https://api.msg91.com/api/v5/widget/sendOtp', {
          method: 'POST',
          headers: {
            'authkey': authKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            widgetId,
            identifier: `91${phone}`,
            channel: '12', // 12 = WhatsApp in MSG91
          }),
        });

        const widgetData = await widgetRes.json();
        if (widgetRes.ok && (widgetData.type === 'success' || widgetData.status === 'success')) {
          console.log(`✅ MSG91 WhatsApp Widget OTP dispatched to +91 ${phone}`);
          dispatched = true;
        }
      } catch (_) {}
    }

    try {
      const retryUrl = `https://control.msg91.com/api/v5/otp/retry?authkey=${authKey}&mobile=91${phone}&retrytype=whatsapp`;
      const retryRes = await fetch(retryUrl, { method: 'GET' });
      const retryData = await retryRes.json();
      if (retryRes.ok && (retryData.type === 'success' || retryData.status === 'success')) {
        console.log(`✅ MSG91 WhatsApp retry dispatched to +91 ${phone}`);
        dispatched = true;
      }
    } catch (_) {}
  }

  return { success: dispatched };
}
