'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Music2, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ExclusiveContentProps {
  artistId: string;
}

const EXCLUSIVE_CONTENT = [
  {
    id: '1',
    title: 'Studio Session Recording',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    duration: '15:24',
    accessLevel: 'Gold',
  },
  {
    id: '2',
    title: 'Unreleased Track Preview',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    duration: '3:45',
    accessLevel: 'Platinum',
  },
  {
    id: '3',
    title: 'Behind the Scenes Photos',
    type: 'gallery',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    count: '24 images',
    accessLevel: 'Gold',
  },
];

export default function ExclusiveContent({ artistId }: ExclusiveContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Exclusive Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {EXCLUSIVE_CONTENT.map((content) => (
            <div
              key={content.id}
              className="flex gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="relative aspect-video w-40 rounded-md overflow-hidden">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
                {content.type === 'video' && (
                  <Video className="absolute top-2 right-2 h-4 w-4 text-white" />
                )}
                {content.type === 'audio' && (
                  <Music2 className="absolute top-2 right-2 h-4 w-4 text-white" />
                )}
                {content.type === 'gallery' && (
                  <ImageIcon className="absolute top-2 right-2 h-4 w-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{content.title}</h3>
                  <Badge variant="secondary">{content.accessLevel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {content.duration || content.count}
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Content
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}