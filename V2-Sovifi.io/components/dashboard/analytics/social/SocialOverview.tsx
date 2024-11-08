'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Heart, Share2, TrendingUp } from 'lucide-react';

const metrics = [
  {
    title: 'Total Followers',
    value: '245.8K',
    change: '+15.3%',
    icon: Users,
    breakdown: {
      instagram: '120.5K',
      tiktok: '85.3K',
      youtube: '40K',
    },
  },
  {
    title: 'Engagement Rate',
    value: '6.8%',
    change: '+2.4%',
    icon: Heart,
    breakdown: {
      instagram: '7.2%',
      tiktok: '8.5%',
      youtube: '4.7%',
    },
  },
  {
    title: 'Content Shares',
    value: '12.4K',
    change: '+28.7%',
    icon: Share2,
    breakdown: {
      instagram: '5.2K',
      tiktok: '4.8K',
      youtube: '2.4K',
    },
  },
  {
    title: 'Growth Rate',
    value: '+18.5%',
    change: '+5.2%',
    icon: TrendingUp,
    breakdown: {
      instagram: '+15.8%',
      tiktok: '+25.3%',
      youtube: '+14.4%',
    },
  },
];

export function SocialOverview() {
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
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-500">{metric.change} from last month</p>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Platform Breakdown</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="font-medium">Instagram</div>
                    <div>{metric.breakdown.instagram}</div>
                  </div>
                  <div>
                    <div className="font-medium">TikTok</div>
                    <div>{metric.breakdown.tiktok}</div>
                  </div>
                  <div>
                    <div className="font-medium">YouTube</div>
                    <div>{metric.breakdown.youtube}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}