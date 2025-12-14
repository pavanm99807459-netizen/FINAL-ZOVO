import { useState, useEffect } from 'react';
import { X, QrCode, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  amount: number;
}

const statusMessages = [
  "Waiting for payment…",
  "Verifying transaction…",
  "Checking payment details…",
  "Processing your payment…",
];

export function QRPaymentModal({
  isOpen,
  onClose,
  onPaymentComplete,
  amount,
}: QRPaymentModalProps) {
  const [countdown, setCountdown] = useState(15);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(15);
      setStatusIndex(0);
      setIsPaid(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, [isOpen]);

  const handleIvePaid = () => {
    setIsPaid(true);
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          {isPaid ? (
            <div className="flex flex-col items-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Payment Received!
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Your order is being processed...
              </p>
            </div>
          ) : (
            <>
              {/* QR Code Placeholder */}
              <div className="relative w-56 h-56 bg-muted rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <QrCode className="w-32 h-32 text-foreground" />
                
                {/* Scan animation */}
                <div className="absolute inset-x-4 h-0.5 bg-primary/50 animate-[scan_2s_ease-in-out_infinite]" 
                  style={{
                    animation: 'scan 2s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Amount */}
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Amount to pay</p>
                <p className="text-2xl font-bold text-foreground">
                  ₹{amount.toLocaleString()}
                </p>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                    countdown <= 5
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {countdown}
                </div>
                <span className="text-sm text-muted-foreground">seconds remaining</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="animate-pulse">{statusMessages[statusIndex]}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleIvePaid}
                  className="flex-1"
                >
                  I've Paid
                </Button>
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes scan {
            0%, 100% { top: 10%; }
            50% { top: 85%; }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
