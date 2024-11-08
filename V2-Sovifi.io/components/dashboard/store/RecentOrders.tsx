'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserDetails } from '@/components/dashboard/community/UserDetails';
import { ShoppingBag, Wallet, ExternalLink } from 'lucide-react';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    wallet?: string;
    discordUser?: string;
    nftsOwned?: number;
    role?: string;
  };
  amount: string;
  status: 'completed' | 'processing' | 'shipped';
  date: string;
}

const RECENT_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      wallet: '0xc637...dezt',
      discordUser: 'SparklingJazz#5613',
      nftsOwned: 14,
      role: 'USER',
    },
    amount: '$79.99',
    status: 'completed',
    date: '2024-03-20',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      discordUser: 'RedFishBlueFish#3103',
      nftsOwned: 12,
      role: 'USER',
    },
    amount: '$149.99',
    status: 'shipped',
    date: '2024-03-19',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      wallet: '0xe8d3...17bf',
      discordUser: 'GoldenGaze#3090',
      nftsOwned: 4,
      role: 'USER',
    },
    amount: '$29.99',
    status: 'processing',
    date: '2024-03-18',
  },
];

export function RecentOrders() {
  const [selectedUser, setSelectedUser] = useState<Order['customer'] | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  const handleUserClick = (customer: Order['customer']) => {
    setSelectedUser(customer);
    setIsUserDetailsOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div>
                    <Button
                      variant="link"
                      className="h-auto p-0 font-medium"
                      onClick={() => handleUserClick(order.customer)}
                    >
                      {order.customer.name}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                    <div className="flex items-center gap-2 mt-1">
                      {order.customer.wallet ? (
                        <Badge variant="secondary" className="gap-1">
                          <Wallet className="h-3 w-3" />
                          {order.customer.wallet}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          No Wallet
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {order.id} - {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{order.amount}</span>
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'default'
                          : order.status === 'shipped'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserDetails
          user={{
            wallet: selectedUser.wallet || '',
            discordUser: selectedUser.discordUser || '',
            nftsOwned: selectedUser.nftsOwned || 0,
            presaleAllocated: 0,
            role: selectedUser.role || 'USER',
            profile: {
              name: selectedUser.name,
              email: selectedUser.email,
              joinedDate: '2024-01-15',
              lastActive: '2024-03-21',
              discordId: '204472305729',
            },
          }}
          open={isUserDetailsOpen}
          onOpenChange={setIsUserDetailsOpen}
        />
      )}
    </>
  );
}