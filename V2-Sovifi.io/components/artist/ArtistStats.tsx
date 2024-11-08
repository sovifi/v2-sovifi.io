'use client';

import { Card } from '@/components/ui/card';
import { Music2, Users, Star } from 'lucide-react';

interface ArtistStatsProps {
  artist: {
    followers: number;
    clubMembers: number;
  };
}

export default function ArtistStats({ artist }: ArtistStatsProps) {
  const stats = [
    {
      label: 'Total Followers',
      value: artist.followers.toLocaleString(),
      icon: Users,
      change: '+12%',
    },
    {
      label: 'Club Members',
      value: artist.clubMembers.toLocaleString(),
      icon: Star,
      change: '+8%',
    },
    {
      label: 'Total NFTs',
      value: '45',
      icon: Music2,
      change: '+15%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}