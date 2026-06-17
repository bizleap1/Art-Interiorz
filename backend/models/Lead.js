const mongoose = require('mongoose');

// Lead schema definition with email OTP verification fields and removal of duplicate/legacy definitions
const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: Boolean, default: false },
  projectType: { type: String }, // full‑home, kitchen, wardrobe
  bhkType: String,
  bhkSubSize: String,
  roomCounts: {
    living: Number,
    kitchen: Number,
    bedroom: Number,
    bathroom: Number,
    dining: Number,
  },
  kitchenLayout: String,
  wardrobeLength: String,
  wardrobeType: String,
  wardrobeFinish: String,
  wardrobeAccessories: [String],
  selectedPackage: String,
  estimatedQuote: { type: String },
  // Email OTP verification fields
  emailVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  verificationMethod: { type: String, default: "email_otp" },
}, { timestamps: true });

// Pre‑save hook to prevent duplicate verified leads (same email)
LeadSchema.pre('save', async function (next) {
  if (this.emailVerified) {
    const existing = await this.constructor.findOne({ email: this.email, emailVerified: true });
    if (existing && existing._id.toString() !== this._id.toString()) {
      const err = new Error('Lead already exists for this verified email.');
      err.name = 'DuplicateVerifiedEmail';
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Lead', LeadSchema);
