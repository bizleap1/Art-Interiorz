const nodemailer = require('nodemailer');

// Load SMTP configuration from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

/**
 * Send a branded OTP email.
 * @param {string} to Recipient email address
 * @param {string} otp 6‑digit OTP code
 */
async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'Artz Interior <artinteriorz17@gmail.com>',
    to,
    subject: 'Your Verification Code - Artz Interior',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code - Artz Interior</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        </style>
      </head>
      <body style="margin:0;padding:0;font-family:'Inter', sans-serif;background-color:#f5f5f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#D4AF37 0%,#B8960C 100%);padding:40px;text-align:center;">
            <div style="color:#1a1a1a;font-size:36px;font-weight:700;font-family:'Cormorant Garamond', serif;letter-spacing:3px;margin-bottom:8px;">
              ARTZ INTERIOR
            </div>
            <div style="color:#1a1a1a;font-size:14px;font-family:'Cormorant Garamond', serif;font-style:italic;opacity:0.9;">
              Transforming Spaces, Creating Dreams Since 2017
            </div>
          </div>

          <!-- Content -->
          <div style="padding:40px 30px;">
            <h1 style="color:#1a1a1a;font-size:28px;font-weight:600;font-family:'Cormorant Garamond', serif;margin:0 0 20px 0;text-align:center;">
              Verify Your Email
            </h1>
            <p style="color:#666666;font-size:16px;line-height:1.8;margin:0 0 35px 0;text-align:center;font-family:'Inter', sans-serif;">
              Thank you for choosing Artz Interior. Please use the verification code below to complete your registration:
            </p>

            <!-- OTP Box -->
            <div style="background:#fafafa;border:2px solid #D4AF37;border-radius:16px;padding:40px;margin:35px 0;text-align:center;">
              <p style="color:#666666;font-size:13px;margin:0 0 20px 0;text-transform:uppercase;letter-spacing:2px;font-family:'Inter', sans-serif;font-weight:500;">
                Your Verification Code
              </p>
              <div style="font-size:56px;font-weight:700;color:#D4AF37;letter-spacing:12px;margin:0;font-family:'Cormorant Garamond', serif;">
                ${otp}
              </div>
            </div>

            <!-- Info -->
            <div style="background:#fff9e6;border-left:4px solid #D4AF37;padding:20px;margin:35px 0;border-radius:8px;">
              <p style="color:#8B6914;font-size:14px;margin:0;line-height:1.8;font-family:'Inter', sans-serif;">
                <strong>⏰ Valid for 10 minutes</strong><br>
                This code will expire in 10 minutes for your security. If you did not request this code, please ignore this email.
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin:35px 0;">
              <p style="color:#666666;font-size:14px;margin:0 0 15px 0;font-family:'Inter', sans-serif;">
                Need help? Contact us:
              </p>
              <a href="tel:+919545002017" style="color:#D4AF37;text-decoration:none;font-weight:600;font-family:'Inter', sans-serif;">
                📞 +91 9545002017
              </a>
              <span style="color:#cccccc;margin:0 12px;">|</span>
              <a href="mailto:artinteriorz17@gmail.com" style="color:#D4AF37;text-decoration:none;font-weight:600;font-family:'Inter', sans-serif;">
                ✉️ artinteriorz17@gmail.com
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#1a1a1a;padding:40px;text-align:center;">
            <div style="color:#ffffff;font-size:24px;font-weight:700;font-family:'Cormorant Garamond', serif;letter-spacing:2px;margin-bottom:12px;">
              ARTZ INTERIOR
            </div>
            <p style="color:#999999;font-size:13px;margin:0 0 20px 0;font-family:'Inter', sans-serif;">
              Professional Interior Design Solutions
            </p>
            <div style="border-top:1px solid #333333;margin:24px 0;"></div>
            <p style="color:#666666;font-size:12px;margin:0 0 8px 0;font-family:'Inter', sans-serif;">
              © 2017 Artz Interior. All rights reserved.
            </p>
            <p style="color:#666666;font-size:12px;margin:0;font-family:'Inter', sans-serif;">
              <a href="#" style="color:#D4AF37;text-decoration:none;">Privacy Policy</a> | 
              <a href="#" style="color:#D4AF37;text-decoration:none;">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    console.log(`📧 Attempting to send OTP email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    console.log('✅ Email sent to:', to);
    console.log('✅ Email accepted by:', info.accepted);
    console.log('✅ Email rejected by:', info.rejected);
    return info;
  } catch (error) {
    console.error('❌ Email sending failed for:', to);
    console.error('❌ Error details:', error.message);
    console.error('❌ Full error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

module.exports = { sendOtpEmail };
