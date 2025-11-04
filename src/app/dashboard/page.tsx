"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Leaf, Package, TrendingDown, Plus, ShoppingCart, FolderOpen, Bell, User, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const recentActivity = [
    { id: 1, type: "Purchase", project: "Amazon Reforestation", amount: "50 credits", date: "2 hours ago" },
    { id: 2, type: "Retirement", project: "Solar Farm India", amount: "25 credits", date: "1 day ago" },
    { id: 3, type: "Minted", project: "Wind Energy Project", amount: "1000 credits", date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary">CarbonChain</h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/marketplace" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Marketplace
                </Link>
                <Link href="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  My Projects
                </Link>
                <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <Link href="/transactions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Transactions
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </Button>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Link 
                  href="/settings/profile"
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">My Account</span>
                    <span className="text-xs text-muted-foreground">0x742d...89Ab</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Track your carbon credit portfolio and recent activity
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-shadow animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Credits</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Wallet className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Portfolio Value</p>
                <p className="text-2xl font-bold">$24,890</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Package className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Projects Tokenized</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Credits Retired</p>
                <p className="text-2xl font-bold">580</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Link href="/tokenize">
            <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-all cursor-pointer group animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Tokenize New Project</h3>
                  <p className="text-sm text-muted-foreground">Submit a new carbon project</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/marketplace">
            <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-xl transition-all cursor-pointer group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Buy Credits</h3>
                  <p className="text-sm text-muted-foreground">Browse the marketplace</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/projects">
            <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-xl transition-all cursor-pointer group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">View My Projects</h3>
                  <p className="text-sm text-muted-foreground">Manage your projects</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <FolderOpen className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Link href="/transactions">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{activity.amount}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}