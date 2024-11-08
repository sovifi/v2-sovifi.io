'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 18200 },
  { month: 'Mar', revenue: 15800 },
  { month: 'Apr', revenue: 22400 },
  { month: 'May', revenue: 28900 },
  { month: 'Jun', revenue: 32100 },
];

export function RevenueAnalytics() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}