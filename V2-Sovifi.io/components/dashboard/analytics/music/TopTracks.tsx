'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Music2, PlayCircle } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  streams: string;
  trend: string;
  duration: string;
}

const TOP_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Digital Dreams',
    streams: '450K',
    trend: '+12%',
    duration: '3:45',
  },
  {
    id: '2',
    title: 'Night Vibes',
    streams: '380K',
    trend: '+8%',
    duration: '4:20',
  },
  {
    id: '3',
    title: 'Urban Flow',
    streams: '320K',
    trend: '+15%',
    duration: '3:30',
  },
  {
    id: '4',
    title: 'Sunset Melody',
    streams: '290K',
    trend: '+5%',
    duration: '3:55',
  },
];

export function TopTracks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="h-5 w-5" />
          Top Tracks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {TOP_TRACKS.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-4">
                  <PlayCircle className="h-8 w-8 text-primary cursor-pointer hover:text-primary/80" />
                  <div>
                    <h4 className="font-medium">{track.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {track.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{track.streams}</Badge>
                  <span className="text-sm text-green-500">{track.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}