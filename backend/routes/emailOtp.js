// // const express = require('express');
// // const bcrypt = require('bcrypt');
// // const OtpStore = require('../models/OtpStore');
// // const { sendOtpEmail } = require('../utils/emailSender');
// // const { signVerificationToken } = require('../utils/jwt');

// // const router = express.Router();

// // console.log('✅ emailOtp router loaded');

// // // SEND OTP
// // router.post('/send', async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Email is required.'
// //       });
// //     }

// //     app.use('/api/email-otp', emailOtpRouter);


// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     const hashedOtp = await bcrypt.hash(otp, 10);

// //     const now = new Date();
// //     const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

// //     await OtpStore.findOneAndUpdate(
// //       { email },
// //       {
// //         email,
// //         hashedOtp,
// //         createdAt: now,
// //         expiresAt,
// //         attempts: 0,
// //         resendCount: 0
// //       },
// //       {
// //         upsert: true,
// //         new: true
// //       }
// //     );

// //     await sendOtpEmail(email, otp);

// //     console.log(`✅ OTP sent to ${email} (OTP: ${otp})`);

// //     return res.status(200).json({
// //       success: true,
// //       message: 'OTP sent successfully.'
// //     });
// //   } catch (error) {
// //     console.error('❌ Send OTP Error:', error);

// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || 'Failed to send OTP.'
// //     });
// //   }
// // });

// // // VERIFY OTP
// // router.post('/verify', async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;

// //     if (!email || !otp) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Email and OTP are required.'
// //       });
// //     }

// //     const record = await OtpStore.findOne({ email });

// //     if (!record) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'OTP not found or expired.'
// //       });
// //     }

// //     if (new Date() > record.expiresAt) {
// //       await OtpStore.deleteOne({ email });

// //       return res.status(410).json({
// //         success: false,
// //         message: 'OTP expired.'
// //       });
// //     }

// //     if (record.attempts >= 5) {
// //       await OtpStore.deleteOne({ email });

// //       return res.status(429).json({
// //         success: false,
// //         message: 'Too many attempts.'
// //       });
// //     }

// //     const isValid = await bcrypt.compare(
// //       otp,
// //       record.hashedOtp
// //     );

// //     if (!isValid) {
// //       record.attempts += 1;
// //       await record.save();

// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid OTP.'
// //       });
// //     }

// //     const token = signVerificationToken(email);

// //     await OtpStore.deleteOne({ email });

// //     console.log(`✅ Email verified: ${email}`);

// //     return res.status(200).json({
// //       success: true,
// //       token,
// //       message: 'Email verified successfully.'
// //     });
// //   } catch (error) {
// //     console.error('❌ Verify OTP Error:', error);

// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || 'Verification failed.'
// //     });
// //   }
// // });

// // module.exports = router;



// ////////////////////


// const express = require('express');
// const bcrypt = require('bcrypt');
// const OtpStore = require('../models/OtpStore');
// const { sendOtpEmail } = require('../utils/emailSender');
// const { signVerificationToken } = require('../utils/jwt');

// const router = express.Router();

// console.log('✅ emailOtp router loaded');

// // SEND OTP
// router.post('/send', async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required.'
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     const now = new Date();
//     const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

//     await OtpStore.findOneAndUpdate(
//       { email },
//       {
//         email,
//         hashedOtp,
//         createdAt: now,
//         expiresAt,
//         attempts: 0,
//         resendCount: 0
//       },
//       {
//         upsert: true,
//         new: true
//       }
//     );

//     await sendOtpEmail(email, otp);

//     console.log(`✅ OTP sent to ${email} (OTP: ${otp})`);

//     return res.status(200).json({
//       success: true,
//       message: 'OTP sent successfully.'
//     });
//   } catch (error) {
//     console.error('❌ Send OTP Error:', error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send OTP.'
//     });
//   }
// });

// // VERIFY OTP
// router.post('/verify', async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and OTP are required.'
//       });
//     }

//     const record = await OtpStore.findOne({ email });

//     if (!record) {
//       return res.status(404).json({
//         success: false,
//         message: 'OTP not found or expired.'
//       });
//     }

//     if (new Date() > record.expiresAt) {
//       await OtpStore.deleteOne({ email });

//       return res.status(410).json({
//         success: false,
//         message: 'OTP expired.'
//       });
//     }

//     if (record.attempts >= 5) {
//       await OtpStore.deleteOne({ email });

//       return res.status(429).json({
//         success: false,
//         message: 'Too many attempts.'
//       });
//     }

//     const isValid = await bcrypt.compare(otp, record.hashedOtp);

//     if (!isValid) {
//       record.attempts += 1;
//       await record.save();

//       return res.status(401).json({
//         success: false,
//         message: 'Invalid OTP.'
//       });
//     }

//     const token = signVerificationToken(email);

//     await OtpStore.deleteOne({ email });

//     console.log(`✅ Email verified: ${email}`);

//     return res.status(200).json({
//       success: true,
//       token,
//       message: 'Email verified successfully.'
//     });
//   } catch (error) {
//     console.error('❌ Verify OTP Error:', error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || 'Verification failed.'
//     });
//   }
// });

// module.exports = router;
// ////////////////

const express = require('express');
const bcrypt = require('bcrypt');
const OtpStore = require('../models/OtpStore');
const { sendOtpEmail } = require('../utils/emailSender');
const { signVerificationToken } = require('../utils/jwt');

const router = express.Router();

console.log('✅ emailOtp router loaded');

// SEND OTP
router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      console.log('❌ Send OTP failed: Email is required');
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    console.log(`📧 Sending OTP to ${email}`);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

    await OtpStore.findOneAndUpdate(
      { email },
      { email, hashedOtp, createdAt: now, expiresAt, attempts: 0, resendCount: 0 },
      { upsert: true, new: true }
    );

    try {
      await sendOtpEmail(email, otp);
      console.log(`✅ OTP sent successfully to ${email} (OTP: ${otp})`);
    } catch (emailError) {
      console.error(`❌ Email sending failed for ${email}:`, emailError.message);
      console.error(`❌ Email error details:`, emailError);
      // OTP is still generated and stored, just email failed
    }
    
    // Always log OTP in development mode for testing
    console.log(`🔧 DEVELOPMENT MODE: Your OTP is ${otp} for ${email}`);

    return res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('❌ Send OTP Error:', error);
    console.error('❌ Error details:', error.message);
    return res.status(500).json({ success: false, message: error.message || 'Failed to send OTP.' });
  }
});

// VERIFY OTP
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      console.log('❌ Verify OTP failed: Email and OTP are required');
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    console.log(`🔐 Verifying OTP for ${email}`);

    const record = await OtpStore.findOne({ email });
    if (!record) {
      console.log(`❌ Verify OTP failed: No OTP record found for ${email}`);
      return res.status(404).json({ success: false, message: 'OTP not found or expired.' });
    }

    if (new Date() > record.expiresAt) {
      console.log(`❌ Verify OTP failed: OTP expired for ${email}`);
      await OtpStore.deleteOne({ email });
      return res.status(410).json({ success: false, message: 'OTP expired.' });
    }

    if (record.attempts >= 5) {
      console.log(`❌ Verify OTP failed: Too many attempts for ${email}`);
      await OtpStore.deleteOne({ email });
      return res.status(429).json({ success: false, message: 'Too many attempts.' });
    }

    const isValid = await bcrypt.compare(otp, record.hashedOtp);
    if (!isValid) {
      record.attempts += 1;
      await record.save();
      console.log(`❌ Verify OTP failed: Invalid OTP for ${email} (attempt ${record.attempts})`);
      return res.status(401).json({ success: false, message: 'Invalid OTP.' });
    }

    const token = signVerificationToken(email);
    await OtpStore.deleteOne({ email });

    console.log(`✅ Email verified successfully: ${email}`);
    return res.status(200).json({ success: true, token, message: 'Email verified successfully.' });
  } catch (error) {
    console.error('❌ Verify OTP Error:', error);
    console.error('❌ Error details:', error.message);
    return res.status(500).json({ success: false, message: error.message || 'Verification failed.' });
  }
});

module.exports = router;
