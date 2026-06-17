import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

interface EmailVerificationModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onVerified: (token: string) => void | Promise<void>;
  onResend: () => Promise<void>;
  isResending?: boolean;
}

const RESEND_COOLDOWN_SECONDS = 30;

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  open,
  email,
  onClose,
  onVerified,
  onResend,
  isResending = false,
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    setOtp('');
    setVerificationError('');
    setSuccessMessage('');
    setTimer(RESEND_COOLDOWN_SECONDS);
    const interval = window.setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => {
      window.clearInterval(interval);
      clearSuccessTimeout();
    };
  }, [open]);

  useEffect(() => clearSuccessTimeout, []);

  const handleResend = async () => {
    if (timer > 0 || isResending) return;
    setVerificationError('');
    setSuccessMessage('');
    try {
      await onResend();
      setTimer(RESEND_COOLDOWN_SECONDS);
      setSuccessMessage('OTP resent successfully!');
      clearSuccessTimeout();
      successTimeoutRef.current = setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setVerificationError(err instanceof Error ? err.message : 'Failed to resend OTP');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();
    if (trimmedOtp.length < 4) {
      setVerificationError('Please enter a valid OTP code.');
      return;
    }
    setIsVerifying(true);
    setVerificationError('');
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: trimmedOtp,
        type: 'email',
      });
      if (error) throw new Error(error.message || 'Verification failed');
      await onVerified(data.session?.access_token || '');
      onClose();
    } catch (err) {
      console.error(err);
      setVerificationError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-warm-white rounded-2xl shadow-luxury w-full max-w-md p-6 mx-4 border border-border" role="dialog" aria-modal="true" aria-labelledby="email-verification-title">
        <h2 id="email-verification-title" className="font-display text-2xl font-bold text-charcoal mb-4 text-center">Verify Email</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">Enter the 6‑digit OTP sent to <span className="font-medium text-charcoal">{email}</span>.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-center tracking-widest font-semibold text-charcoal text-lg bg-warm-white transition-all"
            required
            autoFocus
          />
          {verificationError && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200" role="alert">{verificationError}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600 text-center bg-green-50 p-3 rounded-lg border border-green-200" role="status">{successMessage}</p>
          )}
          <div className="text-sm text-muted-foreground flex justify-between items-center">
            {timer > 0 ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || isVerifying}
                className="text-gold underline font-medium hover:text-gold/80 disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isVerifying}
              className="px-6 py-3 bg-ivory text-charcoal rounded-xl hover:bg-ivory/80 text-sm font-medium disabled:opacity-50 transition-colors border border-border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying || otp.trim().length < 4}
              className="px-6 py-3 bg-gold hover:bg-gold/90 text-warm-white rounded-xl disabled:opacity-50 text-sm font-bold tracking-luxury uppercase transition-colors shadow-luxury"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
