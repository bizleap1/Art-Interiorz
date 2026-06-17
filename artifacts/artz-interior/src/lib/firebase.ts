import { initializeApp, getApps, getApp, type FirebaseApp } from "@firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type Auth,
  type ConfirmationResult,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDC2bfl6VRcpbblE-OtKUmgkHSWnn1dZXY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "art-interiorz-6a8e6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "art-interiorz-6a8e6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "art-interiorz-6a8e6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "938701027087",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? " 1: 938701027087: web: df1d2a80bacd41b91c307a",
};

/** True when required Firebase env vars are present (not placeholders). */
export function isFirebaseConfigured(): boolean {
  const { apiKey, authDomain, projectId, appId } = firebaseConfig;
  return Boolean(
    apiKey &&
    authDomain &&
    projectId &&
    appId &&
    apiKey !== "YOUR_API_KEY" &&
    !apiKey.startsWith("YOUR_"),
  );
}

function getFirebaseApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

const app = getFirebaseApp();
const auth: Auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
export type { Auth, ConfirmationResult };
