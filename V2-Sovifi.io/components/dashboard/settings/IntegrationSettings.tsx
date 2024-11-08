'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Music2, 
  Youtube, 
  Instagram, 
  MessageSquare,
  Music,
  Video,
  XIcon
} from 'lucide-react';

const integrations = [
  {
    name: 'Spotify',
    icon: Music2,
    status: 'connected',
    lastSync: '2 hours ago',
  },
  {
    name: 'Apple Music',
    icon: Music,
    status: 'disconnected',
    lastSync: 'Never',
  },
  {
    name: 'Tidal',
    icon: Music2,
    status: 'disconnected',
    lastSync: 'Never',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    status: 'connected',
    lastSync: '1 hour ago',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    status: 'connected',
    lastSync: '30 minutes ago',
  },
  {
    name: 'TikTok',
    icon: Video,
    status: 'disconnected',
    lastSync: 'Never',
  },
  {
    name: 'X',
    icon: XIcon,
    status: 'connected',
    lastSync: '45 minutes ago',
  },
  {
    name: 'Discord',
    icon: MessageSquare,
    status: 'disconnected',
    lastSync: 'Never',
  },
];

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <integration.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last synced: {integration.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={integration.status === 'connected' ? 'default' : 'secondary'}
                >
                  {integration.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}