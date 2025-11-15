"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ListSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    minted: number;
    listed: number;
  } | null;
  onList?: (projectId: number, quantity: number, pricePerCredit: number) => void;
}

export function ListSaleModal({ isOpen, onClose, project, onList }: ListSaleModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerCredit, setPricePerCredit] = useState<number>(0);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"input" | "approval" | "listing">("input");

  if (!isOpen || !project) return null;

  const availableToList = project.minted - project.listed;
  const totalValue = quantity * pricePerCredit;
  const marketplaceFee = totalValue * 0.025; // 2.5% marketplace fee
  const netProceeds = totalValue - marketplaceFee;

  const handleSubmit = async () => {
    setError("");

    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (quantity > availableToList) {
      setError(`Maximum ${availableToList.toLocaleString()} credits available to list`);
      return;
    }

    if (!pricePerCredit || pricePerCredit <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Step 1: Request token approval
      setStep("approval");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate approval

      // Step 2: Create marketplace listing
      setStep("listing");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate listing
      
      if (onList) {
        await onList(project.id, quantity, pricePerCredit);
      }

      // Reset and close
      setQuantity(0);
      setPricePerCredit(0);
      setStep("input");
      onClose();
    } catch (err) {
      setError("Transaction failed. Please try again.");
      setStep("input");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setQuantity(0);
      setPricePerCredit(0);
      setError("");
      setStep("input");
      onClose();
    }
  };

  // Processing view
  if (step !== "input") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
        <Card className="max-w-md w-full p-8 shadow-2xl border-2">
          <div className="text-center">
            {step === "approval" && (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4 animate-pulse">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Requesting Token Approval</h3>
                <p className="text-muted-foreground mb-6">
                  Please approve the marketplace contract to manage your tokens
                </p>
              </>
            )}
            {step === "listing" && (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4 animate-pulse">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Creating Marketplace Listing</h3>
                <p className="text-muted-foreground mb-6">
                  Your credits are being listed for sale
                </p>
              </>
            )}
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: step === "approval" ? "50%" : "100%" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {step === "approval" ? "Step 1 of 2" : "Step 2 of 2"}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-lg w-full p-8 shadow-2xl border-2 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gold/10 transition-colors"
          disabled={isProcessing}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
            <TrendingUp className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">List Credits for Sale</h3>
            <p className="text-sm text-muted-foreground">Create marketplace listing</p>
          </div>
        </div>

        {/* Project Info */}
        <Card className="p-4 border-2 bg-muted/30 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Project</p>
          <p className="font-bold mb-4">{project.name}</p>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Minted</p>
              <p className="font-bold">{project.minted.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Already Listed</p>
              <p className="font-bold">{project.listed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Available</p>
              <p className="font-bold text-primary">{availableToList.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
              Quantity to List <span className="text-primary">*</span>
            </label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={availableToList}
              value={quantity || ""}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 0);
                setError("");
              }}
              placeholder={`Enter amount (max ${availableToList.toLocaleString()})`}
              className="h-12 border-2"
              disabled={isProcessing}
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold mb-2">
              Price per Credit (USD) <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
              <Input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={pricePerCredit || ""}
                onChange={(e) => {
                  setPricePerCredit(parseFloat(e.target.value) || 0);
                  setError("");
                }}
                placeholder="e.g., 12.50"
                className="h-12 pl-8 border-2"
                disabled={isProcessing}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Suggested market price: $10.00 - $15.00 per credit
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {quantity > 0 && pricePerCredit > 0 && (
          <Card className="p-5 border-2 bg-card/50 mb-6 animate-fade-in">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Listing Value</span>
                <span className="font-semibold">${totalValue.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Marketplace Fee (2.5%)</span>
                <span className="font-semibold text-red-600">-${marketplaceFee.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-bold">Your Net Proceeds</span>
                <span className="text-2xl font-bold text-primary">${netProceeds.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid gap-3 mb-6">
          <Card className="p-3 border border-accent/30 bg-accent/5">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This will require two transactions: token approval and marketplace listing
              </p>
            </div>
          </Card>
          
          <Card className="p-3 border border-primary/30 bg-primary/5">
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                You can cancel or update your listing anytime from the marketplace
              </p>
            </div>
          </Card>
        </div>

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
            disabled={!quantity || quantity <= 0 || !pricePerCredit || pricePerCredit <= 0 || isProcessing}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            List for Sale
          </Button>
        </div>

        {/* Info Note */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          Estimated gas fee: ~$5.00 USD for both transactions
        </p>
      </Card>
    </div>
  );
}
