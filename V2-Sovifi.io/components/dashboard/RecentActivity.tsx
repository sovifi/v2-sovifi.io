import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'sale' | 'mint' | 'bid' | 'follow';
  description: string;
  time: string;
}

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    description: 'Sonic Dreams #001 sold for 0.5 ETH',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'mint',
    description: 'New NFT "Beat Collection #023" minted',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'bid',
    description: 'New bid received on Visual Harmony #023',
    time: '5 hours ago',
  },
  {
    id: '4',
    type: 'follow',
    description: '25 new followers this week',
    time: '1 day ago',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex flex-col space-y-1 border-b pb-4 last:border-0"
              >
                <p className="text-sm">{item.description}</p>
                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}