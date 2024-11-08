'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag, Gem, Users } from 'lucide-react';

export default function ArtistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const baseUrl = `/artist/${params.id}`;

  const navigation = [
    { name: 'Home', href: baseUrl, icon: Home },
    { name: 'NFTs', href: `${baseUrl}/nfts`, icon: Gem },
    { name: 'Merch', href: `${baseUrl}/merch`, icon: ShoppingBag },
    { name: 'Club', href: `${baseUrl}/club`, icon: Users },
  ];

  return (
    <div>
      <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  'gap-2',
                  pathname === item.href && 'bg-accent'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </div>
      <main>{children}</main>
    </div>
  );
}