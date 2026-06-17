import React, { useState, useEffect, useRef, FormEvent } from "react";
import type { ConfirmationResult } from "@firebase/auth";
import { motion } from "framer-motion";

/** Dev/offline mock returned when Firebase phone auth is unavailable. */
export interface MockConfirmationResult {
  confirm: (code: string) => Promise<{ user: { getIdToken: () => Promise<string> } }>;
}

export type PhoneConfirmationResult = ConfirmationResult | MockConfirmationResult;

interface PhoneVerificationModalProps {
  open: boolean;
  onClose: () => void;
  confirmationResult: PhoneConfirmationResult | null;
  onVerified: (idToken: string) => void | Promise<void>;
  onResend: () => Promise<void>;
  isResending?: boolean;
}

function getFirebaseAuthErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = String((err as { code: string }).code);
    switch (code) {
      case "auth/invalid-verification-code":
        return "Invalid OTP code. Please check and try again.";
      case "auth/code-expired":
        return "The OTP code has expired. Please request a new OTP.";
      case "auth/quota-exceeded":
        return "SMS quota exceeded. Please try again later.";
      case "auth/missing-verification-code":
        return "Verification code is required.";
      case "auth/session-expired":
        return "The verification session has expired. Please resend a new OTP.";
      default:
        break;
    }
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Verification failed. Please try again.";
}

const RESEND_COOLDOWN_SECONDS = 30;

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  open,
  onClose,
  confirmationResult,
  onVerified,
  onResend,
  isResending = false,
}) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSuccessTimeout = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!open) return;

    setOtp("");
    setVerificationError("");
    setSuccessMessage("");
    setTimer(RESEND_COOLDOWN_SECONDS);

    const interval = window.setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(interval);
      clearSuccessTimeout();
    };
  }, [open]);

  useEffect(() => {
    return () => clearSuccessTimeout();
  }, []);

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    setVerificationError("");
    setSuccessMessage("");

    try {
      await onResend();
      setTimer(RESEND_COOLDOWN_SECONDS);
      setSuccessMessage("OTP resent successfully!");
      clearSuccessTimeout();
      successTimeoutRef.current = setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: unknown) {
      console.error(err);
      setVerificationError(
        err instanceof Error ? err.message : "Failed to resend OTP. Please try again.",
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!confirmationResult) {
      setVerificationError("OTP session expired. Please request a new OTP.");
      return;
    }

    const trimmedOtp = otp.trim();
    if (trimmedOtp.length < 4) {
      setVerificationError("Please enter a valid OTP code.");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    try {
      const result = await confirmationResult.confirm(trimmedOtp);
      const idToken = await result.user.getIdToken();
      await onVerified(idToken);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      setVerificationError(getFirebaseAuthErrorMessage(err));
    } finally {
      setIsVerifying(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 border border-gray-100 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-verification-title"
      >
        <h2 id="phone-verification-title" className="text-xl font-bold mb-2 text-gray-800">
          Verify Phone Number
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Please enter the 6-digit verification code sent to your phone.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#10b981] focus:ring-4 focus:ring-green-50 text-center tracking-widest font-bold text-xl text-gray-800 transition-all bg-gray-50/30"
              required
              id="otp-input"
              autoFocus
            />
          </div>

          {verificationError && (
            <p className="text-sm text-red-600 bg-red-50/50 border border-red-100 rounded-lg py-2 px-3 text-center" role="alert" id="otp-error-msg">
              {verificationError}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 bg-green-50/50 border border-green-100 rounded-lg py-2 px-3 text-center" role="status" id="otp-success-msg">
              {successMessage}
            </p>
          )}

          <div className="text-sm text-gray-600 flex justify-between items-center px-1">
            {timer > 0 ? (
              <span className="text-gray-400">Resend OTP in <span className="font-semibold text-gray-600">{timer}s</span></span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || isVerifying}
                className="text-[#10b981] hover:text-[#059669] underline font-semibold transition-colors disabled:opacity-50"
                id="resend-otp-button"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isVerifying}
              className="px-5 py-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-semibold transition-all border border-gray-100 disabled:opacity-50"
              id="cancel-verification-button"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isVerifying || otp.trim().length < 4}
              className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-lg shadow-green-100 hover:shadow-green-200 disabled:opacity-50 disabled:shadow-none text-sm font-semibold transition-all transform active:scale-[0.98]"
              id="verify-otp-button"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PhoneVerificationModal;
