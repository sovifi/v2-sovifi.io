'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const metrics = [
  {
    title: 'Total Followers',
    value: '124.7K',
    change: '+12.3%',
    icon: Users,
  },
  {
    title: 'Engagement Rate',
    value: '8.2%',
    change: '+2.1%',
    icon: ThumbsUp,
  },
  {
    title: 'Comments',
    value: '3.4K',
    change: '+15.7%',
    icon: MessageCircle,
  },
  {
    title: 'Shares',
    value: '2.1K',
    change: '+8.9%',
    icon: Share2,
  },
];

export function EngagementMetrics() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="flex flex-col gap-2 p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center justify-between">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-green-500">
                  {metric.change}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </h4>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}