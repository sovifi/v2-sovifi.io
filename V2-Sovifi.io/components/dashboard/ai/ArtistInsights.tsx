'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Lightbulb,
  TrendingUp,
  ShoppingBag,
  Trophy,
  Calendar,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'marketing' | 'merchandise' | 'rewards' | 'event';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  data: {
    correlation: string;
    source: string;
  };
  action: string;
}

const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'marketing',
    title: 'Instagram Live Session Opportunity',
    description: 'Your streaming numbers spike 127% during live sessions. Consider scheduling a live performance this week.',
    impact: 'Potential 2.3x engagement increase',
    confidence: 92,
    data: {
      correlation: 'Strong correlation between live sessions and streaming peaks',
      source: 'Instagram, Spotify data',
    },
    action: 'Schedule Live Session',
  },
  {
    id: '2',
    type: 'merchandise',
    title: 'Limited Edition Merch Drop',
    description: 'Fan engagement peaks suggest optimal timing for a merch release targeting your top 1000 fans.',
    impact: 'Estimated 45% conversion rate',
    confidence: 88,
    data: {
      correlation: 'High purchase intent from top-tier fans after recent releases',
      source: 'Store analytics, Fan engagement data',
    },
    action: 'Plan Merch Drop',
  },
  {
    id: '3',
    type: 'rewards',
    title: 'VIP Listen Party',
    description: 'Your most engaged fans are most active on weekends. Consider hosting an exclusive listening session.',
    impact: 'Projected 78% attendance rate',
    confidence: 85,
    data: {
      correlation: 'Weekend engagement patterns from top fans',
      source: 'Platform activity data',
    },
    action: 'Create Event',
  },
];

export function ArtistInsights() {
  const [insights, setInsights] = useState(SAMPLE_INSIGHTS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'marketing':
        return TrendingUp;
      case 'merchandise':
        return ShoppingBag;
      case 'rewards':
        return Trophy;
      case 'event':
        return Calendar;
      default:
        return Lightbulb;
    }
  };

  const refreshInsights = () => {
    setIsRefreshing(true);
    // Simulate API call to get new insights
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          AI Insights & Recommendations
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshInsights}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Insights
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={insight.id}
                  className="flex gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-full p-2 bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge variant="secondary">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-500">
                          {insight.impact}
                        </span>
                      </div>
                      <div className="pt-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Data Source: </span>
                          <span className="text-muted-foreground">
                            {insight.data.source}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Correlation: </span>
                          <span className="text-muted-foreground">
                            {insight.data.correlation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Button variant="default" size="sm">
                      {insight.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}