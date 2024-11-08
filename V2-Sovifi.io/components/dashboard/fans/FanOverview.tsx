'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, Star, Heart } from 'lucide-react';

const metrics = [
  {
    title: 'Total Fans',
    value: '24.5K',
    change: '+12.5%',
    icon: Users,
  },
  {
    title: 'Active Members',
    value: '18.2K',
    change: '+8.3%',
    icon: Heart,
  },
  {
    title: 'Reward Points Issued',
    value: '156.8K',
    change: '+25.2%',
    icon: Trophy,
  },
  {
    title: 'VIP Members',
    value: '2.4K',
    change: '+15.7%',
    icon: Star,
  },
];

export function FanOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-green-500">
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}