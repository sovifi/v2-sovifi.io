'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CONTRACT_FEES } from '@/lib/contracts/config';

interface RoyaltiesData {
  artistRoyalty: number;
  platformRoyalty: number;
  artistWallet: string;
}

interface RoyaltiesStepProps {
  data: RoyaltiesData;
  onUpdate: (data: RoyaltiesData) => void;
}

export function RoyaltiesStep({ data, onUpdate }: RoyaltiesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Royalties & Revenue Splits</h3>
        <p className="text-sm text-muted-foreground">
          Configure how revenue is distributed from primary and secondary sales
        </p>
      </div>

      <div className="grid gap-6">
        <div className="p-4 rounded-lg bg-muted">
          <h4 className="font-medium mb-2">Primary Sales</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Platform fee: {CONTRACT_FEES.PLATFORM_FEE_PERCENTAGE}%
            <br />
            Artist receives: {100 - CONTRACT_FEES.PLATFORM_FEE_PERCENTAGE}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted">
          <h4 className="font-medium mb-2">Secondary Sales</h4>
          <div className="space-y-4">
            <div>
              <Label>Artist Royalty</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={data.artistRoyalty}
                  onChange={(e) => onUpdate({ 
                    ...data, 
                    artistRoyalty: parseFloat(e.target.value) 
                  })}
                  min="0"
                  max="100"
                  step="0.1"
                  disabled
                />
                <span>%</span>
              </div>
            </div>

            <div>
              <Label>Platform Royalty</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={data.platformRoyalty}
                  onChange={(e) => onUpdate({ 
                    ...data, 
                    platformRoyalty: parseFloat(e.target.value) 
                  })}
                  min="0"
                  max="100"
                  step="0.1"
                  disabled
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="artistWallet">Artist Wallet Address</Label>
          <Input
            id="artistWallet"
            value={data.artistWallet}
            onChange={(e) => onUpdate({ ...data, artistWallet: e.target.value })}
            placeholder="0x..."
          />
          <p className="text-sm text-muted-foreground">
            The wallet address that will receive artist royalties and revenue
          </p>
        </div>
      </div>
    </div>
  );
}