import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: '👤',
  },
  {
    title: 'Wallet',
    href: '/settings/wallet',
    icon: '💳',
  },
  {
    title: 'KYC / Verification',
    href: '/settings/verification',
    icon: '✅',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: '🔔',
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: '🔒',
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: '⚙️',
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
            pathname === item.href
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/50',
          )}
        >
          <span className="mr-2 text-lg">{item.icon}</span>
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
