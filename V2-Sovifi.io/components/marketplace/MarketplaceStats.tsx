'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Banknote, Gem, LineChart, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Volume',
    value: '1,234.56 ETH',
    change: '+12.3%',
    icon: Banknote,
  },
  {
    title: 'NFTs Listed',
    value: '3,456',
    change: '+5.6%',
    icon: Gem,
  },
  {
    title: 'Active Artists',
    value: '789',
    change: '+8.9%',
    icon: Users,
  },
  {
    title: 'Floor Price',
    value: '0.25 ETH',
    change: '+3.2%',
    icon: LineChart,
  },
];

export default function MarketplaceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <stat.icon className="h-6 w-6 text-primary" />
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
      ))}
    </div>
  );
}