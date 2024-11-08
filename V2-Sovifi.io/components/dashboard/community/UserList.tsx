'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserDetails } from './UserDetails';
import { ExternalLink } from 'lucide-react';

interface User {
  wallet: string;
  discordUser: string;
  nftsOwned: number;
  presaleAllocated: number;
  role: 'ROOT' | 'ADMIN' | 'SUPPORT' | 'USER';
  profile?: {
    name: string;
    email: string;
    joinedDate: string;
    lastActive: string;
    discordId: string;
  };
  tokens?: {
    id: string;
    name: string;
    image: string;
  }[];
  transactions?: {
    id: string;
    type: string;
    date: string;
    details: string;
  }[];
}

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
      case 'ROOT':
        return 'default';
      case 'ADMIN':
        return 'secondary';
      case 'SUPPORT':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleUserClick = (user: User) => {
    // Add mock data for demo
    const enrichedUser = {
      ...user,
      profile: {
        name: 'Alice Liddell',
        email: 'alice.liddell@example.com',
        joinedDate: '2024-01-15',
        lastActive: '2024-03-21',
        discordId: '204472305729',
      },
      tokens: [
        {
          id: '1',
          name: 'SoundScape #001',
          image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
        },
        {
          id: '2',
          name: 'SoundScape #002',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
        },
      ],
      transactions: [
        {
          id: '1',
          type: 'NFT Purchase',
          date: '2024-03-20',
          details: 'Purchased SoundScape #001',
        },
        {
          id: '2',
          type: 'Discord Verification',
          date: '2024-03-19',
          details: 'Verified Discord account',
        },
      ],
    };
    setSelectedUser(enrichedUser);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wallet</TableHead>
            <TableHead>Discord User</TableHead>
            <TableHead>NFTs Owned</TableHead>
            <TableHead>Presale Allocated</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.wallet} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-mono">{user.wallet}</TableCell>
              <TableCell>{user.discordUser}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user.nftsOwned}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{user.presaleAllocated}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUserClick(user)}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserDetails
          user={selectedUser}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </>
  );
}