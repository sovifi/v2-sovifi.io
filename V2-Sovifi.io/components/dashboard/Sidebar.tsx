'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Palette,
  Gift,
  MessageSquare,
  Settings,
  HelpCircle,
  BarChart2,
  Store,
  Globe,
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'NFTs', href: '/dashboard/nfts', icon: Palette },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Store', href: '/dashboard/store', icon: Store },
  { name: 'Perks', href: '/dashboard/perks', icon: Gift },
  { name: 'Community', href: '/dashboard/community', icon: MessageSquare },
  { name: 'Public Profile', href: '/dashboard/profile', icon: Globe },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r hidden lg:block pt-16">
      <nav className="flex flex-col gap-1 p-4">
        {sidebarLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}