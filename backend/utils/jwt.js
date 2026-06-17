const jwt = require('jsonwebtoken');

// JWT secret should be defined in .env as JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || '9f8e4c8f8b3e2f0d7a6c5b4a3e2f1d9c8b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2';
const JWT_EXPIRES_IN = '15m'; // 15 minutes

function signVerificationToken(email) {
  const payload = { email, emailVerified: true };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signVerificationToken, verifyToken };
