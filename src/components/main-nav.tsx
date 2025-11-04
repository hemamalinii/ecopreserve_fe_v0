'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bell, User, Wallet } from 'lucide-react';

interface MainNavProps {
  activeLink?: string;
  showHomeLink?: boolean;
}

export function MainNav({ activeLink, showHomeLink = true }: MainNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? 'text-primary' : 'text-foreground hover:text-primary transition-colors';
  };

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={showHomeLink ? "/" : "/dashboard"} className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">ClimateCreds</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {showHomeLink && (
                <Link 
                  href="/dashboard" 
                  className={`text-sm font-medium ${isActive('/dashboard')}`}
                >
                  Home
                </Link>
              )}
              <Link 
                href="/marketplace" 
                className={`text-sm font-medium ${isActive('/marketplace')}`}
              >
                Marketplace
              </Link>
              <Link 
                href="/projects" 
                className={`text-sm font-medium ${isActive('/projects')}`}
              >
                My Projects
              </Link>
              <Link 
                href="/portfolio" 
                className={`text-sm font-medium ${isActive('/portfolio')}`}
              >
                Portfolio
              </Link>
              <Link 
                href="/transactions" 
                className={`text-sm font-medium ${isActive('/transactions')}`}
              >
                Transactions
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
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
  );
}
