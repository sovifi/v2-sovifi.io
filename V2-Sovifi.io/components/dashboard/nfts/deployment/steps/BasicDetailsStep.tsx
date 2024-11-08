'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BasicDetailsData {
  name: string;
  symbol: string;
  description: string;
  maxSupply: number;
  price: string;
  currency: string;
}

interface BasicDetailsStepProps {
  data: BasicDetailsData;
  onUpdate: (data: BasicDetailsData) => void;
}

export function BasicDetailsStep({ data, onUpdate }: BasicDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Basic Details</h3>
        <p className="text-sm text-muted-foreground">
          Set up the basic information for your NFT collection
        </p>
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-1 text-blue-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Important Information</p>
            <p className="text-sm text-muted-foreground">
              These details will be permanently stored on the blockchain and cannot be changed after deployment.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Collection Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onUpdate({ ...data, name: e.target.value })}
            placeholder="My NFT Collection"
          />
          <p className="text-sm text-muted-foreground">
            Choose a memorable name for your collection
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="symbol">Symbol</Label>
          <Input
            id="symbol"
            value={data.symbol}
            onChange={(e) => onUpdate({ ...data, symbol: e.target.value })}
            placeholder="NFT"
            maxLength={8}
          />
          <p className="text-sm text-muted-foreground">
            A short identifier for your collection (e.g., BAYC, PUNK). Maximum 8 characters.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => onUpdate({ ...data, description: e.target.value })}
            placeholder="Describe your NFT collection..."
            rows={4}
          />
          <p className="text-sm text-muted-foreground">
            Provide a clear description of your collection and its unique features
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="maxSupply">Maximum Supply</Label>
          <Input
            id="maxSupply"
            type="number"
            min="1"
            value={data.maxSupply || ''}
            onChange={(e) => onUpdate({ ...data, maxSupply: parseInt(e.target.value) || 0 })}
            placeholder="10000"
          />
          <p className="text-sm text-muted-foreground">
            The maximum number of NFTs that can ever be minted in this collection. This cannot be changed later.
          </p>
        </div>

        <div className="grid gap-4">
          <Label>Initial Sale Price</Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="number"
                step="0.000001"
                value={data.price}
                onChange={(e) => onUpdate({ ...data, price: e.target.value })}
                placeholder="0.1"
              />
            </div>
            <Select
              value={data.currency}
              onValueChange={(value) => onUpdate({ ...data, currency: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH (Sepolia)</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            Set the initial sale price for your NFTs. This can be modified later through claim phases.
          </p>
        </div>
      </div>
    </div>
  );
}