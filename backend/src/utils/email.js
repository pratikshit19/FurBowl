import nodemailer from 'nodemailer';

/**
 * Creates a Nodemailer transporter.
 * - Production: requires GMAIL_USER + GMAIL_APP_PASSWORD
 * - Development: falls back to Ethereal fake SMTP (OTP logged to console)
 */
async function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });
  }

  // In production, fail fast if Gmail not configured
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Dev fallback: Ethereal (OTP won't actually be delivered, check console)
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  } catch {
    return null;
  }
}

/**
 * Send an OTP email to the given address.
 * @param {string} to  - recipient email
 * @param {string} otp - 6-digit OTP code
 * @returns {{ success: boolean, error?: string, previewUrl?: string }}
 */
export async function sendOtpEmail(to, otp) {
  const transporter = await getTransporter();

  if (!transporter) {
    return {
      success: false,
      error: 'Email service is not configured. Please add GMAIL_USER and GMAIL_APP_PASSWORD to your environment variables.',
    };
  }

  try {
    const fromAddress = process.env.GMAIL_USER || 'noreply@furbowl.co.in';

    const info = await transporter.sendMail({
      from: `"FurBowl 🐾" <${fromAddress}>`,
      to,
      subject: `${otp} — Your FurBowl login code`,
      text: `Your FurBowl verification code is: ${otp}\n\nValid for 10 minutes. Do not share it with anyone.\n\n– FurBowl Team`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);max-width:480px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#ff4e20;padding:28px 40px;text-align:center;">
            <p style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.3px;">🐾 FurBowl</p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:12px;">Premium pet nutrition</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#111;">Your login code</p>
            <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.6;">
              Use this code to sign in to FurBowl. It expires in <strong>10 minutes</strong>.
            </p>
            <!-- OTP Box -->
            <div style="background:#fff8f6;border:2px solid #ff4e20;border-radius:10px;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="margin:0 0 2px;font-size:11px;font-weight:600;color:#ff4e20;letter-spacing:0.08em;text-transform:uppercase;">Verification Code</p>
              <p style="margin:0;font-size:42px;font-weight:800;color:#111;letter-spacing:0.2em;font-family:'Courier New',monospace;">${otp}</p>
            </div>
            <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
              🔒 Never share this code. FurBowl will never ask for it via call or message.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;border-top:1px solid #f0f0f0;padding:16px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#bbb;">© ${new Date().getFullYear()} FurBowl · <a href="https://furbowl.co.in" style="color:#ff4e20;text-decoration:none;">furbowl.co.in</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // In dev (Ethereal), log the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`\n  📧 [DEV] Email preview URL: ${previewUrl}\n`);
    } else {
      console.log(`  ✅ OTP email sent to ${to}`);
    }

    return { success: true, previewUrl: previewUrl || null };
  } catch (err) {
    console.error('Email send error:', err.message);
    return { success: false, error: err.message };
  }
}
