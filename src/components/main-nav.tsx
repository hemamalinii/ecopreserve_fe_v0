"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bell, User, LogIn, LogOut, Home, ShoppingCart, FolderKanban, LayoutDashboard, Info, Wallet, Receipt } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';

interface MainNavProps {
  showHomeLink?: boolean;
}

export function MainNav({ showHomeLink = true }: MainNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActive = (href: string) => {
    return pathname === href ? 'text-primary font-semibold' : 'text-foreground hover:text-gold transition-colors';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Conditional Home button behavior: Dashboard if logged in, Landing page if not
  const getHomeHref = () => {
    return user ? '/dashboard' : '/';
  };

  const navItems = user ? [
    // Logged-in user navigation
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: 'Marketplace', href: '/marketplace', icon: <ShoppingCart className="h-4 w-4" /> },
    { name: 'My Projects', href: '/projects', icon: <FolderKanban className="h-4 w-4" /> },
    { name: 'Portfolio', href: '/portfolio', icon: <Wallet className="h-4 w-4" /> },
    { name: 'Transactions', href: '/transactions', icon: <Receipt className="h-4 w-4" /> },
  ] : [
    // Guest navigation
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Marketplace', href: '/marketplace', icon: <ShoppingCart className="h-4 w-4" /> },
    { name: 'About', href: '/about', icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">carbon<span className="text-gold font-extrabold text-2xl">ready</span>.<span className="text-accent font-extrabold text-2xl">earth</span></span>
          </Link>
          
          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-gold ${isActive(item.href)}`}
              >
                <span className="hidden sm:inline">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side - Auth and Profile */}
        <div className="flex items-center gap-4">
          {/* Login Status */}
          <div className="hidden items-center text-sm md:flex">
            {isClient && user ? (
              <span className="text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.name || user.email?.split('@')[0]}</span>
              </span>
            ) : (
              <Link 
                href="/auth/login" 
                className="flex items-center gap-1 text-muted-foreground hover:text-gold"
              >
                <LogIn className="h-4 w-4" />
                <span>Guest (Sign In)</span>
              </Link>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Profile Dropdown */}
          {isClient && user ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-px bg-border" />
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden md:inline">Profile</span>
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    href="/settings/profile" 
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-gold/10"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-gold/10 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
