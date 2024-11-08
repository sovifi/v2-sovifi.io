'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

const regions = [
  {
    country: 'United States',
    listeners: '45.2K',
    percentage: 35,
    growth: '+12.3%',
  },
  {
    country: 'United Kingdom',
    listeners: '28.7K',
    percentage: 22,
    growth: '+8.7%',
  },
  {
    country: 'Germany',
    listeners: '19.4K',
    percentage: 15,
    growth: '+15.2%',
  },
  {
    country: 'Canada',
    listeners: '15.8K',
    percentage: 12,
    growth: '+6.8%',
  },
  {
    country: 'Australia',
    listeners: '12.3K',
    percentage: 9,
    growth: '+9.4%',
  },
];

export function GeographicDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {regions.map((region) => (
            <div key={region.country} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{region.country}</span>
                  <Badge variant="secondary">{region.listeners} listeners</Badge>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-green-500">{region.growth}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}