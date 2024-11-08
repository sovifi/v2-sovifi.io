'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music2, Play, Heart, BarChart2 } from 'lucide-react';

const content = [
  {
    title: 'Summer Vibes',
    type: 'Track',
    plays: '1.2M',
    likes: '45.2K',
    engagement: '8.7%',
    trend: '+15.3%',
  },
  {
    title: 'Midnight Dreams',
    type: 'Album',
    plays: '856K',
    likes: '32.1K',
    engagement: '7.9%',
    trend: '+12.8%',
  },
  {
    title: 'Acoustic Session',
    type: 'Live',
    plays: '423K',
    likes: '28.4K',
    engagement: '9.2%',
    trend: '+18.5%',
  },
];

export function ContentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {content.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="rounded-full p-2 bg-primary/10">
                <Music2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span>{item.plays} plays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span>{item.likes} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  <span>{item.engagement} engagement</span>
                </div>
              </div>
              <span className="text-sm text-green-500">{item.trend}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}