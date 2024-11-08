'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users } from 'lucide-react';

const communityActivity = [
  {
    type: 'discussion',
    title: 'New Album Discussion',
    participants: 156,
    lastActive: '2 minutes ago',
    status: 'active',
  },
  {
    type: 'event',
    title: 'Virtual Meet & Greet',
    participants: 89,
    lastActive: '1 hour ago',
    status: 'upcoming',
  },
  {
    type: 'challenge',
    title: 'Cover Song Contest',
    participants: 234,
    lastActive: '3 hours ago',
    status: 'ongoing',
  },
  {
    type: 'discussion',
    title: 'Tour Dates Announcement',
    participants: 312,
    lastActive: '5 hours ago',
    status: 'active',
  },
];

export function FanCommunity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {communityActivity.map((activity, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <Badge
                    variant={
                      activity.status === 'active' ? 'default' :
                      activity.status === 'upcoming' ? 'secondary' :
                      'outline'
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{activity.participants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Last active {activity.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}