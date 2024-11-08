'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  status: 'connected' | 'disconnected' | 'pending';
}

export function PlatformConnections() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'spotify',
      name: 'Spotify for Artists',
      icon: '/spotify-icon.png',
      connected: false,
      status: 'disconnected',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '/instagram-icon.png',
      connected: false,
      status: 'disconnected',
    },
    {
      id: 'youtube',
      name: 'YouTube Studio',
      icon: '/youtube-icon.png',
      connected: false,
      status: 'disconnected',
    },
    {
      id: 'tiktok',
      name: 'TikTok Creator',
      icon: '/tiktok-icon.png',
      connected: false,
      status: 'disconnected',
    },
  ]);

  const handleConnect = (platformId: string) => {
    // In a real implementation, this would initiate OAuth flow
    setPlatforms(platforms.map(platform => 
      platform.id === platformId
        ? { ...platform, status: 'connected', connected: true }
        : platform
    ));
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? { ...platform, status: 'disconnected', connected: false }
        : platform
    ));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect Platforms</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Your Platforms</DialogTitle>
          <DialogDescription>
            Connect your social media and streaming platforms to analyze performance correlations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{platform.name}</h4>
                  <Badge variant={platform.connected ? 'default' : 'secondary'}>
                    {platform.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant={platform.connected ? 'destructive' : 'default'}
                size="sm"
                onClick={() => platform.connected
                  ? handleDisconnect(platform.id)
                  : handleConnect(platform.id)
                }
              >
                {platform.connected ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}