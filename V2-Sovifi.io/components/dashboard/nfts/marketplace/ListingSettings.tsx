'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ListingSettings() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Automatic Listing</Label>
            <p className="text-sm text-muted-foreground">
              Automatically list newly minted NFTs for sale
            </p>
          </div>
          <Switch />
        </div>

        <div className="grid gap-2">
          <Label>Default Listing Price (ETH)</Label>
          <Input type="number" placeholder="0.1" />
          <p className="text-sm text-muted-foreground">
            Default price for new listings
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Private Listings</Label>
            <p className="text-sm text-muted-foreground">
              Only allow whitelisted addresses to purchase
            </p>
          </div>
          <Switch />
        </div>

        <Button>Save Settings</Button>
      </div>
    </div>
  );
}