'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const collectors = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60',
    totalSpent: '5.2 ETH',
    itemsOwned: 12,
  },
  {
    id: 2,
    name: 'Alice Smith',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
    totalSpent: '3.8 ETH',
    itemsOwned: 8,
  },
  {
    id: 3,
    name: 'Bob Wilson',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&auto=format&fit=crop&q=60',
    totalSpent: '2.5 ETH',
    itemsOwned: 5,
  },
];

export default function TopCollectors() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {collectors.map((collector) => (
          <div key={collector.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={collector.image} alt={collector.name} />
              <AvatarFallback>{collector.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="font-medium">{collector.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{collector.totalSpent}</Badge>
                <span className="text-xs text-muted-foreground">
                  {collector.itemsOwned} items owned
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}