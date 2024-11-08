'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

interface RoyaltyPayment {
  id: string;
  platform: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending';
}

const ROYALTY_PAYMENTS: RoyaltyPayment[] = [
  {
    id: '1',
    platform: 'Spotify',
    amount: '$1,234.56',
    date: '2024-03-20',
    status: 'completed',
  },
  {
    id: '2',
    platform: 'Apple Music',
    amount: '$987.65',
    date: '2024-03-19',
    status: 'completed',
  },
  {
    id: '3',
    platform: 'YouTube Music',
    amount: '$456.78',
    date: '2024-03-18',
    status: 'pending',
  },
  {
    id: '4',
    platform: 'Amazon Music',
    amount: '$345.67',
    date: '2024-03-17',
    status: 'completed',
  },
];

export function RoyaltyEarnings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Royalty Earnings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {ROYALTY_PAYMENTS.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <h4 className="font-medium">{payment.platform}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{payment.amount}</span>
                  <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                    {payment.status}
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