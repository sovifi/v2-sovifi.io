'use client';

import { Card } from '@/components/ui/card';
import { Gem, Users, DollarSign, TrendingUp, Music, ShoppingBag } from 'lucide-react';

const stats = [
  {
    name: 'Total NFTs',
    value: '24',
    change: '+12%',
    icon: Gem,
  },
  {
    name: 'Active Fans',
    value: '1,234',
    change: '+8.2%',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: '$12,345',
    change: '+23.1%',
    icon: DollarSign,
  },
  {
    name: 'Engagement',
    value: '89%',
    change: '+4.5%',
    icon: TrendingUp,
  },
  {
    name: 'Music Streams',
    value: '45.2K',
    change: '+15.3%',
    icon: Music,
  },
  {
    name: 'Merch Sales',
    value: '142',
    change: '+18.7%',
    icon: ShoppingBag,
  },
];

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <span className="text-sm font-medium text-green-500">
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}