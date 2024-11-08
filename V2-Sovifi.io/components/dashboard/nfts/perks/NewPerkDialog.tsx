'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { Perk } from './PerksManagement';

interface NewPerkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (perk: Omit<Perk, 'id'>) => void;
}

export function NewPerkDialog({ open, onOpenChange, onSubmit }: NewPerkDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'RAFFLE' as const,
    productId: '',
    redemptions: { current: 0, total: 1 },
    attributes: [] as string[],
    createdOn: new Date().toISOString(),
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      type: 'RAFFLE',
      productId: '',
      redemptions: { current: 0, total: 1 },
      attributes: [],
      createdOn: new Date().toISOString(),
      active: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Perk Event</DialogTitle>
          <DialogDescription>
            Set up a new perk or reward for your community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter perk name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'RAFFLE' | 'PRODUCT') =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RAFFLE">Raffle</SelectItem>
                <SelectItem value="PRODUCT">Product</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              placeholder="Enter product ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">Total Redemptions</Label>
            <Input
              id="total"
              type="number"
              min="1"
              value={formData.redemptions.total}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redemptions: { ...formData.redemptions, total: parseInt(e.target.value) },
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Perk</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}