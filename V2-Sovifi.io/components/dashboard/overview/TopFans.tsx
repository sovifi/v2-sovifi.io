'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const topFans = [
  {
    username: 'ECHO__3929',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80',
    score: 82,
  },
  {
    username: 'MIKEY__READ',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80',
    score: 81,
  },
  {
    username: 'ALEX.DRIVE.5000',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
    score: 80,
  },
  {
    username: 'ICARUS_BL_UST',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80',
    score: 76,
  },
  {
    username: 'LUTHER.MAKING1992',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80',
    score: 70,
  },
];

export function TopFans() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">TOP FANS</CardTitle>
        <Select defaultValue="100">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Top" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">Top 100</SelectItem>
            <SelectItem value="50">Top 50</SelectItem>
            <SelectItem value="10">Top 10</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topFans.map((fan, index) => (
            <div key={fan.username} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-4">
                {index + 1}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={fan.avatar} />
                <AvatarFallback>{fan.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {fan.username}
                </p>
                <Progress value={fan.score} className="h-2" />
              </div>
              <span className="text-sm font-medium">{fan.score}/100</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}