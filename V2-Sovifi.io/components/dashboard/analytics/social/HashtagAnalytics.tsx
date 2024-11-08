'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, Hash } from 'lucide-react';

const hashtags = [
  {
    tag: '#NewMusic',
    posts: 156,
    reach: '245.8K',
    engagement: '8.7%',
    trend: '+45%',
  },
  {
    tag: '#BehindTheScenes',
    posts: 89,
    reach: '178.3K',
    engagement: '7.2%',
    trend: '+28%',
  },
  {
    tag: '#LiveMusic',
    posts: 67,
    reach: '156.5K',
    engagement: '6.9%',
    trend: '+15%',
  },
  {
    tag: '#StudioLife',
    posts: 45,
    reach: '98.2K',
    engagement: '5.8%',
    trend: '+12%',
  },
];

export function HashtagAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Top Performing Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {hashtags.map((hashtag) => (
              <div
                key={hashtag.tag}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{hashtag.tag}</Badge>
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Posts</p>
                      <p className="font-medium">{hashtag.posts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reach</p>
                      <p className="font-medium">{hashtag.reach}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="font-medium">{hashtag.engagement}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">{hashtag.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}