'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, ShoppingBag, Gem } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.3%',
    icon: DollarSign,
  },
  {
    title: 'NFTs Sold',
    value: '123',
    change: '+5.6%',
    icon: Gem,
  },
  {
    title: 'Merch Sales',
    value: '456',
    change: '+8.9%',
    icon: ShoppingBag,
  },
  {
    title: 'Active Fans',
    value: '789',
    change: '+3.2%',
    icon: Users,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className="ml-2 text-sm font-medium text-green-500">
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}