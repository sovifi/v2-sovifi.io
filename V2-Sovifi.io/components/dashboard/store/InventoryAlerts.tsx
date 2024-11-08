'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  id: string;
  product: string;
  type: 'low-stock' | 'out-of-stock';
  quantity: number;
  threshold: number;
}

const INVENTORY_ALERTS: Alert[] = [
  {
    id: '1',
    product: 'Limited Edition T-Shirt',
    type: 'low-stock',
    quantity: 5,
    threshold: 10,
  },
  {
    id: '2',
    product: 'Vinyl Record',
    type: 'out-of-stock',
    quantity: 0,
    threshold: 5,
  },
  {
    id: '3',
    product: 'Concert Hoodie',
    type: 'low-stock',
    quantity: 3,
    threshold: 8,
  },
];

export function InventoryAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Inventory Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {INVENTORY_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <h4 className="font-medium">{alert.product}</h4>
                  <p className="text-sm text-muted-foreground">
                    Threshold: {alert.threshold} units
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={alert.type === 'out-of-stock' ? 'destructive' : 'warning'}
                  >
                    {alert.quantity} in stock
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}