'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const engagementData = [
  {
    month: 'Jan',
    comments: 850,
    shares: 420,
    purchases: 280,
  },
  {
    month: 'Feb',
    comments: 920,
    shares: 380,
    purchases: 310,
  },
  {
    month: 'Mar',
    comments: 1100,
    shares: 560,
    purchases: 450,
  },
  {
    month: 'Apr',
    comments: 980,
    shares: 620,
    purchases: 380,
  },
  {
    month: 'May',
    comments: 1250,
    shares: 780,
    purchases: 520,
  },
  {
    month: 'Jun',
    comments: 1480,
    shares: 890,
    purchases: 610,
  },
];

export function FanEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fan Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="comments" name="Comments" fill="#8884d8" />
              <Bar dataKey="shares" name="Shares" fill="#82ca9d" />
              <Bar dataKey="purchases" name="Purchases" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}