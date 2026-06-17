const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Resolve the path either from the root workspace directory or relatively
let serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || path.join(__dirname, 'config', 'firebase-admin.json');
if (process.env.FIREBASE_SERVICE_ACCOUNT && !path.isAbsolute(process.env.FIREBASE_SERVICE_ACCOUNT)) {
  // Try relative to workspace root first, then relative to backend folder
  const workspacePath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT);
  const backendPath = path.resolve(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT);
  if (fs.existsSync(workspacePath)) {
    serviceAccountPath = workspacePath;
  } else if (fs.existsSync(backendPath)) {
    serviceAccountPath = backendPath;
  } else {
    serviceAccountPath = workspacePath; // default fallback
  }
}

let firebaseAdmin;

if (fs.existsSync(serviceAccountPath)) {
  try {
    admin.initializeApp({
      credential: admin.cert(require(serviceAccountPath))
    });
    firebaseAdmin = admin;
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
  }
} else {
  console.warn(`⚠️ Firebase Service Account file not found at: ${serviceAccountPath}`);
  console.warn('⚠️ Firebase token verification will be mocked for local development.');
}

if (!firebaseAdmin) {
  firebaseAdmin = {
    auth: () => ({
      verifyIdToken: async (token) => {
        console.log('🛡️ [Firebase Mock] Verifying token:', token);
        return { uid: 'mocked-firebase-uid-12345' };
      }
    })
  };
}

module.exports = firebaseAdmin;
