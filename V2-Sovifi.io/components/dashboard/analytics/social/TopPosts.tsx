'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';

const posts = {
  instagram: [
    {
      id: '1',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      caption: 'New single dropping next week! 🎵 #NewMusic',
      likes: '12.5K',
      comments: '856',
      shares: '2.3K',
      engagement: '8.7%',
    },
    {
      id: '2',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      caption: 'Behind the scenes from the studio 🎸',
      likes: '10.2K',
      comments: '743',
      shares: '1.8K',
      engagement: '7.5%',
    },
  ],
  tiktok: [
    {
      id: '1',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      caption: 'When the beat drops 🔥 #MusicTrend',
      likes: '45.2K',
      comments: '2.3K',
      shares: '15.8K',
      engagement: '12.3%',
    },
  ],
  youtube: [
    {
      id: '1',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      caption: 'Official Music Video - "Summer Nights"',
      likes: '28.4K',
      comments: '1.2K',
      shares: '5.6K',
      engagement: '9.1%',
    },
  ],
};

export function TopPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instagram">
          <TabsList className="mb-4">
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
          </TabsList>
          {Object.entries(posts).map(([platform, platformPosts]) => (
            <TabsContent key={platform} value={platform}>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {platformPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="relative h-24 w-24 rounded-md overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={post.caption}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.caption}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">{post.shares}</span>
                          </div>
                          <Badge variant="secondary">
                            {post.engagement} engagement
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}