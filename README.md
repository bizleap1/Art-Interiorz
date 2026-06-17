# Artz Interior Bizleap

This workspace contains the frontend application (`artifacts/artz-interior` built with Vite & React) and the backend API service (`backend` built with Node.js/Express & MongoDB/Firebase).

---

## 🚀 How to Run Locally

### 1. Backend Server Setup
The backend handles lead submissions, saves data to MongoDB, and performs Firebase auth verification.

1. Open a terminal in the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies (use `npm.cmd` if PowerShell execution policy blocks standard script execution):
   ```bash
   npm install
   # Or in PowerShell:
   npm.cmd install
   ```
3. Start the server (uses MongoDB in-memory fallback automatically if no MongoDB Atlas URI is configured):
   ```bash
   npm start
   # Or run directly:
   node index.js
   ```
   *The backend will run on: `http://localhost:5000`*

---

### 2. Frontend Application Setup
The frontend is a Vite + React application.

1. Open a terminal in the root workspace directory.
2. Install dependencies (use `pnpm.cmd` if standard pnpm scripts are blocked by PowerShell):
   ```bash
   pnpm install
   # Or in PowerShell:
   pnpm.cmd install
   ```
3. Start the Vite development server:
   ```bash
   pnpm start
   # Or:
   pnpm run dev:artz-interior
   # Or in PowerShell:
   pnpm.cmd start
   ```
   *The frontend website will run on: `http://localhost:4173/`*
---

## 🛠️ Notes & Configuration

- **PowerShell Note**: If Windows/PowerShell blocks execution of scripts (`pnpm`, `npm`), use `.cmd` commands (e.g., `pnpm.cmd` or `npm.cmd`).
- **Firebase Authentication**: Firebase authentication has a local mock system in place. If no `firebase-admin.json` service account is provided in the `backend/config` directory, the backend server will automatically log a warning and fall back to mocking token verification for local testing.
- **MongoDB Database**: If the MongoDB connection fails or is not configured, the backend automatically spawns and connects to an in-memory MongoDB database so that leads can still be submitted and tested locally without any manual setup.

