'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, DollarSign } from 'lucide-react';

interface PlatformFeesData {
  initialFee: number;
  secondaryFee: number;
}

interface PlatformFeesStepProps {
  data: PlatformFeesData;
  onUpdate: (data: PlatformFeesData) => void;
}

export function PlatformFeesStep({ data, onUpdate }: PlatformFeesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Platform Fees</h3>
        <p className="text-sm text-muted-foreground">
          Review the platform fee structure for primary and secondary sales
        </p>
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-1 text-blue-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Fee Structure</p>
            <p className="text-sm text-muted-foreground">
              Platform fees help maintain and improve the Sovifi ecosystem while ensuring fair compensation for creators.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Primary Sales</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform Fee</p>
                <p className="text-sm text-muted-foreground">Fee taken from initial sales</p>
              </div>
              <Badge variant="secondary">2.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Artist Revenue</p>
                <p className="text-sm text-muted-foreground">Amount received by creator</p>
              </div>
              <Badge>97.5%</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">Secondary Sales</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform Fee</p>
                <p className="text-sm text-muted-foreground">Fee taken from secondary sales</p>
              </div>
              <Badge variant="secondary">3.0%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Artist Royalty</p>
                <p className="text-sm text-muted-foreground">Royalty paid to creator</p>
              </div>
              <Badge variant="secondary">7.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Seller Revenue</p>
                <p className="text-sm text-muted-foreground">Amount received by seller</p>
              </div>
              <Badge>89.5%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}