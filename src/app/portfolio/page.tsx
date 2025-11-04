"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Bell, Leaf, TrendingDown, Download, Calendar, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { useState } from "react";

export default function PortfolioPage() {
  const [showRetirementModal, setShowRetirementModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<any>(null);

  const holdings = [
    {
      id: 1,
      project: "Amazon Rainforest Conservation",
      location: "Brazil",
      batchId: "#1000-1500",
      amount: 500,
      costBasis: 12.50,
      currentPrice: 13.20,
      purchaseDate: "2024-06-15",
      vintage: "2024"
    },
    {
      id: 2,
      project: "Solar Energy Farm India",
      location: "Rajasthan, India",
      batchId: "#2000-2250",
      amount: 250,
      costBasis: 8.75,
      currentPrice: 9.10,
      purchaseDate: "2024-07-20",
      vintage: "2023"
    },
    {
      id: 3,
      project: "Wind Energy Project Texas",
      location: "Texas, USA",
      batchId: "#3000-3495",
      amount: 495,
      costBasis: 10.25,
      currentPrice: 10.80,
      purchaseDate: "2024-08-10",
      vintage: "2023"
    }
  ];

  const retirementHistory = [
    {
      id: 1,
      project: "Ocean Plastic Recovery",
      amount: 100,
      date: "2024-09-01",
      purpose: "Corporate Carbon Neutrality 2024",
      certificateId: "CERT-2024-001"
    },
    {
      id: 2,
      project: "Mangrove Restoration Kenya",
      amount: 250,
      date: "2024-08-15",
      purpose: "Event Offset - Tech Conference",
      certificateId: "CERT-2024-002"
    },
    {
      id: 3,
      project: "Biomass Energy Plant",
      amount: 230,
      date: "2024-07-10",
      purpose: "Supply Chain Emissions Offset",
      certificateId: "CERT-2024-003"
    }
  ];

  const totalOwned = holdings.reduce((sum, h) => sum + h.amount, 0);
  const totalRetired = retirementHistory.reduce((sum, h) => sum + h.amount, 0);
  const totalValue = holdings.reduce((sum, h) => sum + (h.amount * h.currentPrice), 0);
  const totalGain = holdings.reduce((sum, h) => sum + (h.amount * (h.currentPrice - h.costBasis)), 0);

  const handleRetire = (credit: any) => {
    setSelectedCredit(credit);
    setShowRetirementModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <MainNav />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-bold mb-2">Portfolio & Impact Tracker</h2>
            <p className="text-muted-foreground">
              Monitor your carbon credit holdings and environmental impact
            </p>
          </div>
          <Button size="lg" className="h-12 px-6">
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Credits Owned</p>
                <p className="text-2xl font-bold">{totalOwned.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Portfolio Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Credits Retired</p>
                <p className="text-2xl font-bold">{totalRetired.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Unrealized Gain</p>
                <p className="text-2xl font-bold text-green-600">+${totalGain.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Visualization */}
        <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold mb-6">Your Environmental Impact</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{totalRetired.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">tCO₂e Offset</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {Math.round(totalRetired * 2.5).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Trees Equivalent</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-foreground mb-2">
                {Math.round(totalRetired / 4).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Cars Off Road (1 year)</p>
            </div>
          </div>
        </Card>

        {/* Holdings Table */}
        <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Current Holdings</h3>
            <Link href="/marketplace">
              <Button variant="outline" size="sm">Buy More Credits</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <div 
                key={holding.id}
                className="p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{holding.project}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{holding.location}</span>
                      </div>
                      <span>•</span>
                      <span className="font-mono">{holding.batchId}</span>
                      <span>•</span>
                      <span>Vintage {holding.vintage}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRetire(holding)}
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Retire Credits
                  </Button>
                </div>
                
                <div className="grid grid-cols-5 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="font-bold">{holding.amount} credits</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Cost Basis</p>
                    <p className="font-bold">${holding.costBasis.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                    <p className="font-bold">${holding.currentPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                    <p className="font-bold">${(holding.amount * holding.currentPrice).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Gain/Loss</p>
                    <p className={`font-bold ${(holding.currentPrice - holding.costBasis) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(holding.currentPrice - holding.costBasis) >= 0 ? '+' : ''}
                      ${(holding.amount * (holding.currentPrice - holding.costBasis)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Retirement History */}
        <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-bold mb-6">Retirement History</h3>
          <div className="space-y-4">
            {retirementHistory.map((retirement, index) => (
              <div 
                key={retirement.id}
                className="flex items-center justify-between p-5 rounded-xl bg-muted/30"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <TrendingDown className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-1">{retirement.project}</p>
                    <p className="text-sm text-muted-foreground mb-1">{retirement.purpose}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{retirement.date}</span>
                      </div>
                      <span>•</span>
                      <span className="font-mono">{retirement.certificateId}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold">{retirement.amount}</p>
                  <p className="text-xs text-muted-foreground">credits retired</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Certificate
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Retirement Modal - Will import from component */}
      {showRetirementModal && selectedCredit && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="max-w-md w-full p-8 shadow-2xl border-2 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Retire Carbon Credits</h3>
            <p className="text-muted-foreground mb-6">
              Retiring credits permanently removes them from circulation and officially records your environmental impact.
            </p>
            
            <div className="p-4 rounded-xl bg-muted/30 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Selected Project</p>
              <p className="font-bold mb-3">{selectedCredit.project}</p>
              <p className="text-sm text-muted-foreground mb-1">Available Credits</p>
              <p className="font-bold">{selectedCredit.amount} credits</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Quantity to Retire</label>
                <input 
                  type="number" 
                  max={selectedCredit.amount}
                  placeholder="Enter amount"
                  className="w-full h-12 px-4 rounded-lg border-2 border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Purpose (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="e.g., Corporate carbon neutrality initiative"
                  className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background resize-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Estimated Gas Fee</p>
              <p className="font-bold">~$2.50 USD</p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12"
                onClick={() => setShowRetirementModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 h-12"
                onClick={() => {
                  // Handle retirement
                  setShowRetirementModal(false);
                }}
              >
                Confirm Retirement
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
