'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Gift, ShoppingBag } from 'lucide-react';
import type { Perk } from './PerksManagement';

interface PerksListProps {
  perks: Perk[];
  onToggleStatus: (perkId: string) => void;
}

export function PerksList({ perks, onToggleStatus }: PerksListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Redemptions</TableHead>
          <TableHead>Attributes</TableHead>
          <TableHead>Created On</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {perks.map((perk) => (
          <TableRow key={perk.id}>
            <TableCell className="font-medium">{perk.name}</TableCell>
            <TableCell>
              <Badge variant="secondary" className="gap-1">
                {perk.type === 'RAFFLE' ? (
                  <Gift className="h-3 w-3" />
                ) : (
                  <ShoppingBag className="h-3 w-3" />
                )}
                {perk.type}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">{perk.productId}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{perk.redemptions.current}/{perk.redemptions.total}</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ 
                      width: `${(perk.redemptions.current / perk.redemptions.total) * 100}%`
                    }}
                  />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {perk.attributes.map((attr, index) => (
                  <Badge key={index} variant="outline">
                    {attr}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{formatDate(perk.createdOn)}</TableCell>
            <TableCell>
              <Switch
                checked={perk.active}
                onCheckedChange={() => onToggleStatus(perk.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}