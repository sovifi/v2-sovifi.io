'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Store,
  Palette,
  Trophy,
  Users,
  Settings,
  HelpCircle,
  Music,
} from 'lucide-react';

const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'NFT Collection',
    href: '/dashboard/nfts',
    icon: Palette,
  },
  {
    title: 'Merch Store',
    href: '/dashboard/merch',
    icon: Store,
  },
  {
    title: 'Rewards',
    href: '/dashboard/rewards',
    icon: Trophy,
  },
  {
    title: 'Fan Management',
    href: '/dashboard/fans',
    icon: Users,
  },
  {
    title: 'Music',
    href: '/dashboard/music',
    icon: Music,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Help',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 border-r bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-6 w-6" />
          <span className="font-bold">Sovifi</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.href}
              variant={pathname === link.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                pathname === link.href && 'bg-secondary'
              )}
              asChild
            >
              <Link href={link.href}>
                <Icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}