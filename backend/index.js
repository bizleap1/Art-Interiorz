const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const twilio = require('twilio'); // Uncomment if using Twilio

const Lead = require('./models/Lead');
const emailOtpRouter = require('./routes/emailOtp');
const { verifyToken } = require('./utils/jwt');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
  next();
});

console.log("REGISTERING email otp route");
app.use('/api/email-otp', emailOtpRouter);

// Add root route handler
app.get('/', (req, res) => {
  res.send('Backend is running. Please go to the frontend URL (e.g. http://localhost:5177) to view the website.');
});

// OTP rate limiting and limiters removed – Firebase client handles OTP verification

// In-memory OTP store (will be replaced by Firebase client side)
// In-memory OTP store removed


const firebaseAdmin = require('./firebaseAdmin'); // initialize Firebase Admin SDK

// Connect to MongoDB Atlas
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    // In‑memory fallback (kept for development)
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to in‑memory MongoDB');
    } catch (memErr) {
      console.error('❌ Failed to start in‑memory MongoDB:', memErr.message);
      console.log('⚠️ Server will run without MongoDB (saving leads will fail, but OTP works)');
    }
  }
})();

// ==========================================
// API ROUTES
app.use('/api/email-otp', emailOtpRouter);
// ==========================================

// OTP endpoints removed – handled by Firebase client side

/**
 * 3. SAVE LEAD
 */
// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing Firebase ID token.' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    req.firebaseUid = decoded.uid;
    next();
  } catch (err) {
    console.error('Firebase token verification failed:', err);
    return res.status(401).json({ success: false, message: 'Invalid Firebase ID token.' });
  }
};

// Placeholder WhatsApp service
const whatsappService = require('./whatsappService');

// Middleware to verify custom email OTP JWT
const verifyEmailToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing verification token.' });
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = verifyToken(token);
    if (!decoded.emailVerified) throw new Error('Token not email-verified');
    req.verifiedEmail = decoded.email;
    next();
  } catch (err) {
    console.error('Email JWT verification failed:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired verification token.' });
  }
};

// Save lead via email OTP verification (uses custom JWT)
app.post('/api/leads/email', verifyEmailToken, async (req, res) => {
  try {
    const leadData = { ...req.body, email: req.verifiedEmail, verified: true };
    const newLead = new Lead(leadData);
    await newLead.save();
    console.log('✅ New Lead (email-verified) saved to MongoDB:', newLead._id);
    whatsappService.logLead(newLead);
    return res.json({ success: true, leadId: newLead._id });
  } catch (err) {
    console.error('❌ Failed to save lead:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to save lead.' });
  }
});

app.post('/api/leads', verifyFirebaseToken, async (req, res) => {
  try {
    const leadData = { ...req.body, firebaseUid: req.firebaseUid, verified: true };
    const newLead = new Lead(leadData);
    await newLead.save();
    console.log('✅ New Lead saved to MongoDB:', newLead._id);
    // WhatsApp placeholder logging
    whatsappService.logLead(newLead);
    return res.json({ success: true, leadId: newLead._id });
  } catch (err) {
    console.error('❌ Failed to save lead:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to save lead.' });
  }
});

// New endpoint to fetch all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    return res.json({ success: true, leads });
  } catch (err) {
    console.error("❌ Failed to fetch leads:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch leads." });
  }
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
