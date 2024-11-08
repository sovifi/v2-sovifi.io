'use client';

import { Card } from '@/components/ui/card';
import { Users, Heart, MessageCircle, Share2 } from 'lucide-react';

const ENGAGEMENT_STATS = [
  {
    title: 'Total Fans',
    value: '1,234',
    change: '+12%',
    icon: Users,
  },
  {
    title: 'Likes',
    value: '8.5K',
    change: '+23%',
    icon: Heart,
  },
  {
    title: 'Comments',
    value: '921',
    change: '+8%',
    icon: MessageCircle,
  },
  {
    title: 'Shares',
    value: '432',
    change: '+15%',
    icon: Share2,
  },
];

export function FanEngagement() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {ENGAGEMENT_STATS.map((stat) => (
        <div
          key={stat.title}
          className="flex items-center gap-4 rounded-lg border p-4"
        >
          <div className="rounded-full bg-primary/10 p-2">
            <stat.icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{stat.title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className="text-xs text-green-500">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}