'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserList } from './UserList';
import { Search, Users } from 'lucide-react';

interface User {
  wallet: string;
  discordUser: string;
  nftsOwned: number;
  presaleAllocated: number;
  role: 'ROOT' | 'ADMIN' | 'SUPPORT' | 'USER';
}

const DEMO_USERS: User[] = [
  {
    wallet: '0xc637...dezt',
    discordUser: 'SparklingJazz#5613',
    nftsOwned: 14,
    presaleAllocated: 2,
    role: 'ROOT',
  },
  {
    wallet: '0x327a...16d1',
    discordUser: 'RedFishBlueFish#3103',
    nftsOwned: 12,
    presaleAllocated: 2,
    role: 'ADMIN',
  },
  {
    wallet: '0xead4...2949',
    discordUser: 'MysticMeadow#4641',
    nftsOwned: 7,
    presaleAllocated: 2,
    role: 'ADMIN',
  },
  {
    wallet: '0xe8d3...17bf',
    discordUser: 'GoldenGaze#3090',
    nftsOwned: 4,
    presaleAllocated: 1,
    role: 'SUPPORT',
  },
];

export function CommunityManagement() {
  const [users] = useState<User[]>(DEMO_USERS);
  const [filter, setFilter] = useState<'all' | 'support' | 'admin' | 'root'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) => {
    const matchesFilter = 
      filter === 'all' || 
      user.role.toLowerCase() === filter.toLowerCase();

    const matchesSearch = 
      user.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.discordUser.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Community Management</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your community members across Web3 platforms
          </p>
        </div>
        <Button className="gap-2">
          <Users className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Wallet, Discord Username, or Discord ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'support' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('support')}
              >
                Support
              </Button>
              <Button
                variant={filter === 'admin' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('admin')}
              >
                Admin
              </Button>
              <Button
                variant={filter === 'root' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('root')}
              >
                Root
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">15,888</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Discord</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Discord Users</p>
                  <p className="text-2xl font-bold">6,699</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Presale</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Presale Users</p>
                  <p className="text-2xl font-bold">7,249</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Active</Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                  <p className="text-2xl font-bold">2,453</p>
                </div>
              </div>
            </Card>
          </div>

          <UserList users={filteredUsers} />
        </div>
      </Card>
    </div>
  );
}