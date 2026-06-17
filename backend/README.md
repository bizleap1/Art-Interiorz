# Artz Interior Backend

This is the Node.js/Express backend for the Artz Interior app. It handles OTP verification and stores lead data into MongoDB Atlas.

## Setup

1. Open a terminal in this `backend` directory.
2. Ensure you have run `npm install`.
3. Your MongoDB Connection URI is already configured in `.env`.
4. Run `npm start` (or `node index.js`) to start the server.

The server will run on `http://localhost:5000`.

## Features
- **POST /api/otp/send**: Generates a 6-digit OTP and stores it in memory. It logs the OTP to the console so you can test without paying for SMS.
- **POST /api/otp/verify**: Verifies the OTP you submit.
- **POST /api/leads**: Saves the full estimation configuration to your MongoDB Atlas database.

*Note: If you want to use real SMS in the future, you can uncomment the Twilio code in `index.js` and add your Twilio SID and Token to `.env`.*
