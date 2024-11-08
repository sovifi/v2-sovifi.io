'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { date: '2024-01', followers: 45000 },
  { date: '2024-02', followers: 52000 },
  { date: '2024-03', followers: 61000 },
  { date: '2024-04', followers: 75000 },
  { date: '2024-05', followers: 92000 },
  { date: '2024-06', followers: 124700 },
];

export function AudienceGrowth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="followers"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}