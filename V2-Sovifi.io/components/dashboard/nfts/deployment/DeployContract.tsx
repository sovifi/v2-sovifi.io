'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeploymentForm {
  name: string;
  symbol: string;
  maxSupply: string;
  royaltyBps: string;
}

export function DeployContract() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState<DeploymentForm>({
    name: '',
    symbol: '',
    maxSupply: '',
    royaltyBps: '500', // 5% default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    try {
      // Deployment logic will go here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      toast.success('Contract deployed successfully!');
    } catch (error) {
      toast.error('Failed to deploy contract');
      console.error('Deployment error:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Collection Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My NFT Collection"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
              placeholder="NFT"
              required
            />
            <p className="text-sm text-muted-foreground">
              A short identifier for your collection (e.g., BAYC, PUNK)
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="maxSupply">Maximum Supply</Label>
            <Input
              id="maxSupply"
              type="number"
              min="1"
              value={formData.maxSupply}
              onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
              placeholder="10000"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="royaltyBps">Royalty Percentage</Label>
            <Input
              id="royaltyBps"
              type="number"
              value={formData.royaltyBps}
              onChange={(e) => setFormData(prev => ({ ...prev, royaltyBps: e.target.value }))}
              placeholder="500 (5%)"
            />
            <p className="text-sm text-muted-foreground">
              Enter basis points (100 = 1%). Default is 500 (5%)
            </p>
          </div>
        </div>

        <Button type="submit" disabled={isDeploying} className="w-full">
          {isDeploying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deploying Contract...
            </>
          ) : (
            'Deploy Contract'
          )}
        </Button>
      </form>
    </Card>
  );
}