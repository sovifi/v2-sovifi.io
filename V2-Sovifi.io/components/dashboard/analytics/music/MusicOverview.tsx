'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, PlayCircle, Download, TrendingUp } from 'lucide-react';

const OVERVIEW_STATS = [
  {
    title: 'Total Streams',
    value: '1.2M',
    change: '+15%',
    icon: PlayCircle,
  },
  {
    title: 'Downloads',
    value: '45.2K',
    change: '+8%',
    icon: Download,
  },
  {
    title: 'Active Listeners',
    value: '256K',
    change: '+12%',
    icon: Music,
  },
  {
    title: 'Revenue Growth',
    value: '+23%',
    change: '+5%',
    icon: TrendingUp,
  },
];

export function MusicOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {OVERVIEW_STATS.map((stat) => (
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