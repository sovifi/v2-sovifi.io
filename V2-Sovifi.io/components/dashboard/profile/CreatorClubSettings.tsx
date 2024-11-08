'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Crown, Plus, Trash2, Loader2 } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
}

export default function CreatorClubSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>([
    {
      id: '1',
      name: 'Gold',
      price: '0.5',
      benefits: [
        'Exclusive behind-the-scenes content',
        'Early access to new releases',
        'Members-only Discord channel',
      ],
    },
    {
      id: '2',
      name: 'Platinum',
      price: '1.5',
      benefits: [
        'All Gold benefits',
        'Virtual meet & greets',
        'Exclusive merch drops',
        'Vote on setlists',
      ],
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement settings update logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Creator Club Status</Label>
          <p className="text-sm text-muted-foreground">
            Enable or disable your Creator Club
          </p>
        </div>
        <Switch defaultChecked />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Membership Tiers</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Tier
          </Button>
        </div>

        <div className="grid gap-4">
          {tiers.map((tier) => (
            <Card key={tier.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    <h4 className="font-semibold">{tier.name}</h4>
                  </div>
                  <Badge variant="secondary">{tier.price} ETH</Badge>
                </div>

                <div className="space-y-2">
                  <Label>Benefits</Label>
                  <ul className="space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm">{benefit}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Benefit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}