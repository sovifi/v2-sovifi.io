'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Wallet } from 'lucide-react';

interface RoyaltySettingsData {
  artistRoyalty: number;
  platformRoyalty: number;
  artistWallet: string;
}

interface RoyaltySettingsStepProps {
  data: RoyaltySettingsData;
  onUpdate: (data: RoyaltySettingsData) => void;
}

export function RoyaltySettingsStep({ data, onUpdate }: RoyaltySettingsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Royalty Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure royalty distribution for secondary sales
        </p>
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-1 text-blue-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium">About Royalties</p>
            <p className="text-sm text-muted-foreground">
              Royalties are fees paid to creators and the platform on secondary sales.
              Total royalty is set at 10.5%, with 7.5% going to the artist and 3% to the platform.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Royalty Distribution</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Artist Royalty</span>
              <Badge variant="secondary">7.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Platform Royalty</span>
              <Badge variant="secondary">3.0%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Royalty</span>
              <Badge>10.5%</Badge>
            </div>
          </div>
        </Card>

        <div className="grid gap-2">
          <Label htmlFor="artistWallet">Artist Wallet Address</Label>
          <div className="relative">
            <Wallet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="artistWallet"
              value={data.artistWallet}
              onChange={(e) => onUpdate({ ...data, artistWallet: e.target.value })}
              placeholder="0x..."
              className="pl-9"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            The wallet address that will receive artist royalties from secondary sales
          </p>
        </div>
      </div>
    </div>
  );
}