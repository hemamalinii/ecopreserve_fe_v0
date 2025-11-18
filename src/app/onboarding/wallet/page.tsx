"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Wallet, Check, Loader2 } from "lucide-react";

const WALLET_TYPES = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Most popular Ethereum wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect any mobile wallet",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "User-friendly crypto wallet",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Solana & Ethereum wallet",
  },
];

export default function WalletOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleConnect = () => {
    if (!selectedWallet) return;
    
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setWalletAddress("0x742d...89Ab");
      setIsConnected(true);
      setIsConnecting(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2 rounded-full mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">
                Step {currentStep} of 3
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Connect Your Wallet
          </h1>
          <p className="text-lg text-muted-foreground">
            Link your crypto wallet to unlock all features
          </p>
        </div>

        {/* Step 1: Choose Wallet */}
        {currentStep === 1 && (
          <div className="animate-fade-in-up">
            <Card className="p-8 shadow-2xl border-2 backdrop-blur-sm bg-card/95">
              <h2 className="text-2xl font-bold mb-6">Choose Your Wallet</h2>
              
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                {WALLET_TYPES.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet.id)}
                    className={`group relative p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${
                      selectedWallet === wallet.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{wallet.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{wallet.name}</h3>
                          {selectedWallet === wallet.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {wallet.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => router.push("/")}
                >
                  Skip for Now
                </Button>
                <Button
                  className="rounded-full gap-2"
                  disabled={!selectedWallet}
                  onClick={() => setCurrentStep(2)}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Connect Wallet */}
        {currentStep === 2 && (
          <div className="animate-fade-in-up">
            <Card className="p-8 shadow-2xl border-2 backdrop-blur-sm bg-card/95">
              <div className="text-center mb-8">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Wallet className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Authorize the connection in your wallet extension
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-6 mb-8">
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Wallet Selected</h3>
                      <p className="text-sm text-muted-foreground">
                        {WALLET_TYPES.find((w) => w.id === selectedWallet)?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {isConnecting && (
                  <div className="p-6 rounded-xl bg-accent/10 border border-accent/30 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-3" />
                    <p className="font-semibold text-accent">Connecting...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please confirm in your wallet
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setCurrentStep(1)}
                  disabled={isConnecting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  className="rounded-full gap-2"
                  onClick={handleConnect}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect Wallet
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && isConnected && (
          <div className="animate-fade-in-up">
            <Card className="p-8 shadow-2xl border-2 backdrop-blur-sm bg-card/95">
              <div className="text-center mb-8">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Check className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Successfully Connected!</h2>
                <p className="text-muted-foreground text-lg">
                  Your wallet is now linked to your account
                </p>
              </div>

              <div className="max-w-md mx-auto mb-8">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                  <Label className="text-sm font-semibold mb-2 block">
                    Connected Wallet Address
                  </Label>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Wallet className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">
                      {walletAddress}
                    </span>
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="rounded-full gap-2 h-14 px-8 text-base"
                  onClick={handleFinish}
                >
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
