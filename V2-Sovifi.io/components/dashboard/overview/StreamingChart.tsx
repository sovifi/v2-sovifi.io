'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, ArrowRight } from 'lucide-react';

// Sample data - In production, this would come from API calls to various platforms
const streamingData = [
  { 
    date: '2024-03-01',
    spotify: 65000,
    appleMusic: 45000,
    youtube: 55000,
    tidal: 35000,
    instagramEngagement: 12000,
    tiktokViews: 80000,
    youtubeViews: 25000,
    twitterImpressions: 30000,
  },
  // ... more data points
];

const socialEvents = [
  {
    date: '2024-03-15',
    platform: 'Instagram',
    event: 'Live Session',
    engagement: '+245%',
    impact: 'Streaming spike on Spotify (+127%)',
  },
  {
    date: '2024-03-10',
    platform: 'TikTok',
    event: 'Viral Sound',
    engagement: '+450%',
    impact: 'Apple Music streams increased by 89%',
  },
];

interface CorrelationInsight {
  platform: string;
  correlation: number;
  description: string;
}

export function StreamingChart() {
  const [timeframe, setTimeframe] = useState('7d');
  const [primaryMetric, setPrimaryMetric] = useState('streams');
  const [comparisonPlatform, setComparisonPlatform] = useState('instagram');

  // These would be calculated from actual data
  const correlationInsights: CorrelationInsight[] = [
    {
      platform: 'Instagram',
      correlation: 0.85,
      description: 'Strong correlation with streaming peaks during live sessions',
    },
    {
      platform: 'TikTok',
      correlation: 0.92,
      description: 'Very strong correlation with viral sound trends',
    },
    {
      platform: 'YouTube',
      correlation: 0.76,
      description: 'Good correlation with music video releases',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">STREAMING HOTSPOTS</h3>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={comparisonPlatform} onValueChange={setComparisonPlatform}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Compare with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="spotify"
                  stroke="#1DB954"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="instagramEngagement"
                  stroke="#E1306C"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Correlation Insights
            </h4>
            <div className="space-y-3">
              {correlationInsights.map((insight) => (
                <div key={insight.platform} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{insight.platform}</span>
                    <Badge variant={insight.correlation > 0.8 ? 'default' : 'secondary'}>
                      {(insight.correlation * 100).toFixed(0)}% match
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Recent Impact Events
            </h4>
            <div className="space-y-3">
              {socialEvents.map((event, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{event.platform}</span>
                    <Badge>{event.engagement}</Badge>
                  </div>
                  <p className="text-xs">{event.event}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    {event.impact}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#1DB954' }} />
            <span className="text-sm">Spotify Streams</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#E1306C' }} />
            <span className="text-sm">Instagram Engagement</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Connect More Platforms
        </Button>
      </div>
    </div>
  );
}