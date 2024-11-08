'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function NewsUpdates() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'New Artist Onboarding Program',
      content: 'Introducing our new artist onboarding program with enhanced features and support.',
      date: '2024-03-20',
    },
    {
      id: '2',
      title: 'Platform Updates',
      content: 'Major improvements to the NFT minting process and reward system.',
      date: '2024-03-19',
    },
    {
      id: '3',
      title: 'Community Highlights',
      content: 'Celebrating our most active creators and collectors this month.',
      date: '2024-03-18',
    },
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                <time className="text-xs text-muted-foreground mt-2 block">
                  {new Date(item.date).toLocaleDateString()}
                </time>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}