import nodemailer from 'nodemailer';

/**
 * Creates a Nodemailer transporter.
 * Uses Gmail SMTP (App Password) in production / staging.
 * Falls back to Ethereal (fake SMTP) in development if Gmail creds not set.
 */
async function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }

  // Dev fallback: Ethereal (captures emails, doesn't deliver — check console for preview URL)
  const testAccount = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return transport;
}

/**
 * Send an OTP email.
 * @param {string} to  - recipient email address
 * @param {string} otp - 6-digit OTP code
 */
export async function sendOtpEmail(to, otp) {
  try {
    const transporter = await getTransporter();

    const mailOptions = {
      from: `"FurBowl 🐾" <${process.env.GMAIL_USER || 'noreply@furbowl.co.in'}>`,
      to,
      subject: `${otp} is your FurBowl verification code`,
      text: `Your FurBowl verification code is: ${otp}\n\nThis code expires in 10 minutes. Do not share it with anyone.\n\n– The FurBowl Team`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>FurBowl OTP</title>
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#fdf8f2;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f2;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:520px;width:100%;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#ff6b35 0%,#ff4e20 100%);padding:32px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">🐾 FurBowl</h1>
                      <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:500;">Premium pet nutrition, delivered.</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 40px 32px;">
                      <h2 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#1a1035;">Your Verification Code</h2>
                      <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
                        Use the code below to log in to your FurBowl account. This code is valid for <strong>10 minutes</strong> and can only be used once.
                      </p>

                      <!-- OTP Box -->
                      <div style="background:#fdf8f2;border:2px dashed #ff6b35;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
                        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#ff6b35;letter-spacing:0.1em;text-transform:uppercase;">Verification Code</p>
                        <p style="margin:0;font-size:44px;font-weight:800;color:#1a1035;letter-spacing:0.15em;font-family:'Courier New',monospace;">${otp}</p>
                      </div>

                      <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                        🔒 Never share this code with anyone. FurBowl will never ask for your OTP via call or chat.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#9ca3af;">
                        © ${new Date().getFullYear()} FurBowl · Premium Pet Nutrition<br/>
                        <a href="https://furbowl.co.in" style="color:#ff6b35;text-decoration:none;">furbowl.co.in</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // In dev (Ethereal), log preview URL
    if (!process.env.GMAIL_USER) {
      console.log(`📧 [DEV] Email OTP preview: ${nodemailer.getTestMessageUrl(info)}`);
    } else {
      console.log(`✅ OTP email sent to ${to} (MessageID: ${info.messageId})`);
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err.message);
    return { success: false, error: err.message };
  }
}
