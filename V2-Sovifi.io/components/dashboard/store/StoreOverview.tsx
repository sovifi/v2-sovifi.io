'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, DollarSign, Package, TrendingUp } from 'lucide-react';

const STORE_STATS = [
  {
    title: 'Total Sales',
    value: '$12,345',
    change: '+15%',
    icon: DollarSign,
  },
  {
    title: 'Orders',
    value: '156',
    change: '+8%',
    icon: ShoppingBag,
  },
  {
    title: 'Products',
    value: '45',
    change: '+3',
    icon: Package,
  },
  {
    title: 'Revenue Growth',
    value: '+23%',
    change: '+5%',
    icon: TrendingUp,
  },
];

export function StoreOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {STORE_STATS.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-500">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}