"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, TrendingDown, AlertCircle } from "lucide-react";
import { useState } from "react";

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

  if (!isOpen || !credit) return null;

  const handleSubmit = () => {
    setError("");

    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (quantity > credit.amount) {
      setError(`Maximum ${credit.amount} credits available`);
      return;
    }

    // Call the onRetire callback if provided
    if (onRetire) {
      onRetire(credit.id, quantity, purpose);
    }

    // Reset and close
    setQuantity(0);
    setPurpose("");
    onClose();
  };

  const handleClose = () => {
    setQuantity(0);
    setPurpose("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="max-w-md w-full max-h-[90vh] flex flex-col">
        <Card className="p-6 sm:p-8 shadow-2xl border-2 relative flex-1 flex flex-col overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <TrendingDown className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Retire Carbon Credits</h3>
            <p className="text-sm text-muted-foreground">Permanent offset recording</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Retiring credits permanently removes them from circulation and officially records your environmental impact on the blockchain.
        </p>

        {/* Credit Info */}
        <Card className="p-4 border-2 bg-muted/30 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Selected Project</p>
          <p className="font-bold mb-3">{credit.project}</p>
          {credit.batchId && (
            <>
              <p className="text-sm text-muted-foreground mb-1">Batch ID</p>
              <p className="font-mono text-sm mb-3">{credit.batchId}</p>
            </>
          )}
          <p className="text-sm text-muted-foreground mb-1">Available Credits</p>
          <p className="text-2xl font-bold text-primary">{credit.amount.toLocaleString()}</p>
        </Card>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
              Quantity to Retire <span className="text-primary">*</span>
            </label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={credit.amount}
              value={quantity || ""}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 0);
                setError("");
              }}
              placeholder={`Enter amount (max ${credit.amount})`}
              className="h-12 border-2"
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-semibold mb-2">
              Purpose (Optional)
            </label>
            <textarea
              id="purpose"
              rows={3}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Corporate carbon neutrality initiative, Event offset, Supply chain emissions"
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              This will appear on your retirement certificate
            </p>
          </div>
        </div>

        {/* Gas Fee Estimate */}
        <Card className="p-4 border-2 border-accent/30 bg-accent/5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Gas Fee</p>
              <p className="font-bold">~$2.50 USD</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Network</p>
              <p className="text-sm font-semibold">Ethereum</p>
            </div>
          </div>
        </Card>

        {/* Impact Preview */}
        {quantity > 0 && (
          <Card className="p-4 border-2 border-primary/30 bg-primary/5 mb-6 animate-fade-in">
            <p className="text-sm font-semibold text-primary mb-2">Environmental Impact</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">CO₂ Offset</p>
                <p className="font-bold">{quantity} tCO₂e</p>
              </div>
              <div>
                <p className="text-muted-foreground">Trees Equivalent</p>
                <p className="font-bold">~{Math.round(quantity * 2.5)}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Moved to bottom */}

          {/* Info Note */}
          <p className="text-xs text-center text-muted-foreground mt-4">
            After confirmation, you'll receive a retirement certificate via email
          </p>
        </Card>
        
        {/* Modal Footer - Sticky on mobile */}
        <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 -mx-6 -mb-6 sm:static sm:border-t-0 sm:bg-transparent sm:p-0 sm:mx-0 sm:mb-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12"
              onClick={handleSubmit}
              disabled={!quantity || quantity <= 0}
            >
              <TrendingDown className="h-5 w-5 mr-2" />
              Confirm Retirement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
