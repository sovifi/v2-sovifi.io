'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Wallet, 
  MessageSquare, 
  Shield, 
  History,
  ExternalLink,
  Copy,
  RefreshCw,
} from 'lucide-react';

interface UserDetailsProps {
  user: {
    wallet: string;
    discordUser: string;
    nftsOwned: number;
    presaleAllocated: number;
    role: string;
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
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetails({ user, open, onOpenChange }: UserDetailsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.discordUser}`} />
            <AvatarFallback>{user.discordUser[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{user.profile?.name || user.discordUser}</h2>
                <p className="text-sm text-muted-foreground">{user.profile?.email}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleSync}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Sync User
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{user.role}</Badge>
              <Badge variant="secondary">{user.nftsOwned} NFTs</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Wallet Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Address</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {user.wallet}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(user.wallet)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">NFTs Owned</span>
                    <Badge variant="secondary">{user.nftsOwned}</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discord Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Username</span>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {user.discordUser}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Discord ID</span>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {user.profile?.discordId}
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <History className="h-4 w-4" />
                Account History
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm">{user.profile?.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="text-sm">{user.profile?.lastActive}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {user.tokens?.map((token) => (
                <Card key={token.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">{token.name}</h4>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                {user.transactions?.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">{tx.details}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{tx.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Role & Permissions
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Role</p>
                    <p className="text-sm text-muted-foreground">User's access level in the system</p>
                  </div>
                  <Badge>{user.role}</Badge>
                </div>
                {/* Add more permission controls as needed */}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}