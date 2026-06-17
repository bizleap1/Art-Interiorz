const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  hashedOtp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  resendCount: { type: Number, default: 0 },
});

// TTL index to auto‑remove expired OTPs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OtpStore', OtpSchema);
