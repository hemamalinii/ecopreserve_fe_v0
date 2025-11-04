"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, TrendingDown, AlertCircle, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

interface RetirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  credit: {
    id: number;
    project: string;
    amount: number;
    batchId?: string;
  } | null;
  onRetire?: (creditId: number, amount: number, purpose: string) => void;
}

export function RetirementModal({ isOpen, onClose, credit, onRetire }: RetirementModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Reset form when modal is opened/closed or credit changes
  useEffect(() => {
    if (isOpen && credit) {
      setQuantity(0);
      setPurpose("");
      setError("");
      setIsSubmitting(false);
    }
  }, [isOpen, credit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (quantity > (credit?.amount || 0)) {
      setError(`Maximum ${credit?.amount} credits available`);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Call the onRetire callback if provided
      if (onRetire && credit) {
        await onRetire(credit.id, quantity, purpose);
      }

      // Close the modal after successful submission
      onClose();
    } catch (err) {
      setError("Failed to process retirement. Please try again.");
      console.error("Retirement error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !credit) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg">
        <Card className="relative overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  Retire Carbon Credits
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Permanently remove credits from circulation
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-background/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Project Info */}
            <div className="space-y-2">
              <h3 className="font-medium">Project</h3>
              <Card className="p-4 border">
                <p className="font-medium">{credit.project}</p>
                {credit.batchId && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Batch: <span className="font-mono">{credit.batchId}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Available: <span className="font-medium text-foreground">{credit.amount.toLocaleString()}</span> credits
                </p>
              </Card>
            </div>

            {/* Quantity Input */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="block font-medium">
                How many credits would you like to retire? <span className="text-red-500">*</span>
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={credit.amount}
                value={quantity || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setQuantity(isNaN(value) ? 0 : value);
                  setError("");
                }}
                placeholder={`Enter amount (1-${credit.amount})`}
                className="h-12 text-base"
                required
              />
              {error && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <label htmlFor="purpose" className="block font-medium">
                Purpose (optional)
              </label>
              <textarea
                id="purpose"
                rows={3}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="E.g., Carbon neutral event, Corporate sustainability goal, etc."
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                This will be included in your retirement certificate
              </p>
            </div>

            {/* Impact Preview */}
            {quantity > 0 && (
              <Card className="p-4 border border-green-100 bg-green-50">
                <h3 className="font-medium text-green-800 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Your Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">CO₂ Offset</p>
                    <p className="font-semibold">{quantity} tCO₂e</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Equivalent to</p>
                    <p className="font-semibold">~{Math.round(quantity * 2.5)} trees</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Transaction Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Gas Fee</span>
                <span>~$2.50 USD</span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total Credits to Retire</span>
                <span>{quantity || 0}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!quantity || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Confirm Retirement
                  </span>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              You'll receive a retirement certificate via email after confirmation.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
