'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { date: '2024-01', instagram: 45000, tiktok: 32000, youtube: 28000 },
  { date: '2024-02', instagram: 52000, tiktok: 38000, youtube: 30000 },
  { date: '2024-03', instagram: 61000, tiktok: 45000, youtube: 33000 },
  { date: '2024-04', instagram: 75000, tiktok: 55000, youtube: 36000 },
  { date: '2024-05', instagram: 92000, tiktok: 68000, youtube: 40000 },
  { date: '2024-06', instagram: 120500, tiktok: 85300, youtube: 40000 },
];

export function PlatformPerformance() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Platform Growth</CardTitle>
        <Select defaultValue="followers">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="followers">Followers</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="reach">Reach</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="instagram"
                stroke="#E1306C"
                strokeWidth={2}
                name="Instagram"
              />
              <Line
                type="monotone"
                dataKey="tiktok"
                stroke="#00F2EA"
                strokeWidth={2}
                name="TikTok"
              />
              <Line
                type="monotone"
                dataKey="youtube"
                stroke="#FF0000"
                strokeWidth={2}
                name="YouTube"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}