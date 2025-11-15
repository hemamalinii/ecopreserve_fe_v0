"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, ShoppingCart, AlertCircle, CreditCard, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    price: number;
    credits: number;
    location: string;
  } | null;
  onPurchase?: (projectId: number, quantity: number, paymentMethod: "crypto" | "fiat") => void;
}

export function BuyCreditsModal({ isOpen, onClose, project, onPurchase }: BuyCreditsModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "fiat">("crypto");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !project) return null;

  const subtotal = quantity * project.price;
  const gasFee = paymentMethod === "crypto" ? 2.50 : 0;
  const processingFee = paymentMethod === "fiat" ? subtotal * 0.029 + 0.30 : 0; // 2.9% + $0.30 for fiat
  const total = subtotal + gasFee + processingFee;

  const handleSubmit = async () => {
    setError("");

    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (quantity > project.credits) {
      setError(`Maximum ${project.credits.toLocaleString()} credits available`);
      return;
    }

    setIsProcessing(true);
    try {
      if (onPurchase) {
        await onPurchase(project.id, quantity, paymentMethod);
      }
      
      // Reset and close
      setQuantity(0);
      setPaymentMethod("crypto");
      onClose();
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setQuantity(0);
    setPaymentMethod("crypto");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-lg w-full p-8 shadow-2xl border-2 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          disabled={isProcessing}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <ShoppingCart className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Buy Carbon Credits</h3>
            <p className="text-sm text-muted-foreground">Purchase verified offsets</p>
          </div>
        </div>

        {/* Project Info */}
        <Card className="p-4 border-2 bg-muted/30 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Selected Project</p>
          <p className="font-bold mb-2">{project.title}</p>
          <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price per Credit</p>
              <p className="text-xl font-bold text-primary">${project.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Available</p>
              <p className="text-lg font-bold">{project.credits.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Quantity Input */}
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
            Quantity <span className="text-primary">*</span>
          </label>
          <Input
            id="quantity"
            type="number"
            min="1"
            max={project.credits}
            value={quantity || ""}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value) || 0);
              setError("");
            }}
            placeholder={`Enter amount (max ${project.credits.toLocaleString()})`}
            className="h-12 border-2"
            disabled={isProcessing}
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("crypto")}
              disabled={isProcessing}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === "crypto"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-gold/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <WalletIcon className="h-5 w-5" />
                <span className="font-semibold">Crypto Wallet</span>
              </div>
              <p className="text-xs text-muted-foreground">Pay with ETH/USDC</p>
            </button>

            <button
              onClick={() => setPaymentMethod("fiat")}
              disabled={isProcessing}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === "fiat"
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold">Credit Card</span>
              </div>
              <p className="text-xs text-muted-foreground">Pay with USD/EUR</p>
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        {quantity > 0 && (
          <Card className="p-5 border-2 bg-card/50 mb-6 animate-fade-in">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({quantity} credits)</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              
              {paymentMethod === "crypto" && gasFee > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Gas Fee</span>
                  <span className="font-semibold">${gasFee.toFixed(2)}</span>
                </div>
              )}
              
              {paymentMethod === "fiat" && processingFee > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee (2.9% + $0.30)</span>
                  <span className="font-semibold">${processingFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Environmental Impact Preview */}
        {quantity > 0 && (
          <Card className="p-4 border-2 border-primary/30 bg-primary/5 mb-6 animate-fade-in">
            <p className="text-sm font-semibold text-primary mb-3">Your Impact</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold">{quantity}</p>
                <p className="text-xs text-muted-foreground">tCO₂e Offset</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(quantity * 2.5)}</p>
                <p className="text-xs text-muted-foreground">Trees Equiv.</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(quantity / 4)}</p>
                <p className="text-xs text-muted-foreground">Cars Off Road</p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-12"
            onClick={handleSubmit}
            disabled={!quantity || quantity <= 0 || isProcessing}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Complete Purchase
              </>
            )}
          </Button>
        </div>

        {/* Info Note */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          {paymentMethod === "crypto" 
            ? "Your wallet will prompt you to approve the transaction"
            : "You'll be redirected to a secure payment page"}
        </p>
      </Card>
    </div>
  );
}
