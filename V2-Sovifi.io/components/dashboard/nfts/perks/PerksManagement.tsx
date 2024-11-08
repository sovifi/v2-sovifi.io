'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PerksList } from './PerksList';
import { NewPerkDialog } from './NewPerkDialog';
import { Gift, Filter } from 'lucide-react';

export interface Perk {
  id: string;
  name: string;
  type: 'RAFFLE' | 'PRODUCT';
  productId: string;
  redemptions: {
    current: number;
    total: number;
  };
  attributes: string[];
  createdOn: string;
  active: boolean;
}

const DEMO_PERKS: Perk[] = [
  {
    id: '1',
    name: 'VIP Meet & Greet',
    type: 'RAFFLE',
    productId: '33319602-0c3b-4969-23',
    redemptions: { current: 1, total: 1 },
    attributes: ['Placeholder: 8'],
    createdOn: '2024-03-23T10:43:00Z',
    active: false,
  },
  {
    id: '2',
    name: 'Exclusive Merch Drop',
    type: 'PRODUCT',
    productId: '364787831234235',
    redemptions: { current: 0, total: 3 },
    attributes: ['Perk: Care Package'],
    createdOn: '2024-03-17T12:05:00Z',
    active: true,
  },
];

export function PerksManagement() {
  const [perks, setPerks] = useState<Perk[]>(DEMO_PERKS);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPerks = perks.filter((perk) => {
    if (filter === 'active') return perk.active;
    if (filter === 'inactive') return !perk.active;
    return true;
  });

  const handleNewPerk = (perk: Omit<Perk, 'id'>) => {
    const newPerk = {
      ...perk,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPerks([...perks, newPerk as Perk]);
    setIsDialogOpen(false);
  };

  const togglePerkStatus = (perkId: string) => {
    setPerks(perks.map(perk => 
      perk.id === perkId ? { ...perk, active: !perk.active } : perk
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Perk Events</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track your community perks and rewards
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button
              variant={filter === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'inactive' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('inactive')}
            >
              Not Active
            </Button>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Gift className="h-4 w-4" />
            New Perk Event
          </Button>
        </div>
      </div>

      <Card>
        <PerksList perks={filteredPerks} onToggleStatus={togglePerkStatus} />
      </Card>

      <NewPerkDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleNewPerk}
      />
    </div>
  );
}