"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Bell, Search, SlidersHorizontal, Download, ExternalLink, Leaf, ShoppingCart, Coins, TrendingDown, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { useState } from "react";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const transactions = [
    {
      id: 1,
      type: "buy",
      date: "2024-09-25 14:32:18",
      project: "Amazon Rainforest Conservation",
      amount: 50,
      pricePerCredit: 12.50,
      total: 625.00,
      txHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      status: "completed"
    },
    {
      id: 2,
      type: "retire",
      date: "2024-09-20 10:15:42",
      project: "Solar Energy Farm India",
      amount: 25,
      pricePerCredit: 8.75,
      total: 218.75,
      txHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      status: "completed"
    },
    {
      id: 3,
      type: "mint",
      date: "2024-09-15 16:45:33",
      project: "Wind Energy Project Texas",
      amount: 1000,
      pricePerCredit: 0,
      total: 0,
      txHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      status: "completed"
    },
    {
      id: 4,
      type: "buy",
      date: "2024-09-10 11:20:05",
      project: "Ocean Plastic Recovery",
      amount: 100,
      pricePerCredit: 15.00,
      total: 1500.00,
      txHash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      status: "completed"
    },
    {
      id: 5,
      type: "sell",
      date: "2024-09-05 09:30:22",
      project: "Mangrove Restoration Kenya",
      amount: 75,
      pricePerCredit: 11.50,
      total: 862.50,
      txHash: "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      status: "completed"
    },
    {
      id: 6,
      type: "buy",
      date: "2024-09-01 13:42:18",
      project: "Biomass Energy Plant",
      amount: 200,
      pricePerCredit: 9.00,
      total: 1800.00,
      txHash: "0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      status: "completed"
    },
    {
      id: 7,
      type: "retire",
      date: "2024-08-28 15:18:47",
      project: "Solar Energy Farm India",
      amount: 50,
      pricePerCredit: 8.75,
      total: 437.50,
      txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
      status: "completed"
    },
    {
      id: 8,
      type: "mint",
      date: "2024-08-20 12:05:33",
      project: "Amazon Rainforest Conservation",
      amount: 50000,
      pricePerCredit: 0,
      total: 0,
      txHash: "0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567",
      status: "completed"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ShoppingCart className="h-5 w-5 text-accent" />;
      case "sell":
        return <ArrowUpDown className="h-5 w-5 text-secondary-foreground" />;
      case "mint":
        return <Coins className="h-5 w-5 text-primary" />;
      case "retire":
        return <TrendingDown className="h-5 w-5 text-primary" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "buy":
        return "bg-accent/20 text-accent border-accent/30";
      case "sell":
        return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      case "mint":
        return "bg-primary/20 text-primary border-primary/30";
      case "retire":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case "buy":
        return "text-accent";
      case "sell":
        return "text-green-600";
      case "mint":
        return "text-primary";
      case "retire":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const handleExport = () => {
    // Export to CSV logic
    console.log("Exporting transactions to CSV...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <MainNav />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-bold mb-2">Transaction History</h2>
            <p className="text-muted-foreground">
              Complete ledger of all your blockchain activity
            </p>
          </div>
          <Button size="lg" className="h-12 px-6" onClick={handleExport}>
            <Download className="h-5 w-5 mr-2" />
            Export to CSV
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up">
            <p className="text-sm text-muted-foreground font-medium mb-1">Total Transactions</p>
            <p className="text-3xl font-bold">{transactions.length}</p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Credits Purchased</p>
            <p className="text-3xl font-bold text-accent">
              {transactions.filter(t => t.type === "buy").reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Credits Minted</p>
            <p className="text-3xl font-bold text-primary">
              {transactions.filter(t => t.type === "mint").reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Credits Retired</p>
            <p className="text-3xl font-bold text-primary">
              {transactions.filter(t => t.type === "retire").reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by project name, transaction hash, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-2"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 px-6"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-6 mb-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-sm font-semibold mb-2 block">Transaction Type</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Types</option>
                  <option>Buy</option>
                  <option>Sell</option>
                  <option>Mint</option>
                  <option>Retire</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Date Range</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Status</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Transactions Table */}
        <Card className="shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Date & Time</th>
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Project</th>
                  <th className="text-right p-6 text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="text-right p-6 text-sm font-semibold text-muted-foreground">Price</th>
                  <th className="text-right p-6 text-sm font-semibold text-muted-foreground">Total</th>
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr 
                    key={tx.id} 
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-6">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-semibold text-xs w-fit ${getTypeBadge(tx.type)}`}>
                        {getTypeIcon(tx.type)}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-medium">{tx.date.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">{tx.date.split(' ')[1]}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-semibold">{tx.project}</p>
                    </td>
                    <td className="p-6 text-right">
                      <p className={`font-bold ${getAmountColor(tx.type)}`}>
                        {tx.type === "buy" || tx.type === "mint" ? "+" : "-"}
                        {tx.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <p className="font-semibold">
                        {tx.pricePerCredit > 0 ? `$${tx.pricePerCredit.toFixed(2)}` : "-"}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <p className="font-bold">
                        {tx.total > 0 ? `$${tx.total.toFixed(2)}` : "-"}
                      </p>
                    </td>
                    <td className="p-6">
                      <a 
                        href={`https://etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
                      >
                        {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </main>
    </div>
  );
}
