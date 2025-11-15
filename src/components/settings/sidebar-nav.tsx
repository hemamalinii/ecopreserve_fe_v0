'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, Wallet, CheckCircle2, Bell, Lock, Settings } from 'lucide-react';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: <User className="h-4 w-4" />,
  },
  {
    title: 'Wallet',
    href: '/settings/wallet',
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: 'Verification',
    href: '/settings/verification',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: <Lock className="h-4 w-4" />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <Settings className="h-4 w-4" />,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      <div className="px-3 py-2 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account settings</p>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'hover:bg-accent/50 hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
              pathname.startsWith(item.href)
                ? 'bg-accent text-accent-foreground font-semibold'
                : 'text-muted-foreground',
            )}
          >
            <span className="mr-3 flex h-4 w-4 items-center justify-center">
              {item.icon}
            </span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
