'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Star } from 'lucide-react';

const topFans = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarah_j',
    points: 12500,
    level: 'Diamond',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    recentActivity: 'Purchased VIP concert ticket',
  },
  {
    id: '2',
    name: 'Mike Chen',
    username: '@mike_beats',
    points: 10800,
    level: 'Platinum',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    recentActivity: 'Shared 5 posts',
  },
  {
    id: '3',
    name: 'Emma Davis',
    username: '@emma_d',
    points: 9200,
    level: 'Gold',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    recentActivity: 'Bought limited edition merch',
  },
];

export function TopFans() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Top Fans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {topFans.map((fan) => (
              <div
                key={fan.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={fan.avatar} alt={fan.name} />
                  <AvatarFallback>{fan.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{fan.name}</h3>
                    <Badge variant="secondary">{fan.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{fan.username}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4" />
                    <span>{fan.points.toLocaleString()} points</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {fan.recentActivity}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}