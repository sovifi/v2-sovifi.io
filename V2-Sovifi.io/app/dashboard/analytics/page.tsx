'use client';

import { Card } from '@/components/ui/card';
import { EngagementMetrics } from '@/components/dashboard/analytics/EngagementMetrics';
import { RevenueAnalytics } from '@/components/dashboard/analytics/RevenueAnalytics';
import { PlatformBreakdown } from '@/components/dashboard/analytics/PlatformBreakdown';
import { GeographicDistribution } from '@/components/dashboard/analytics/GeographicDistribution';
import { AudienceGrowth } from '@/components/dashboard/analytics/AudienceGrowth';
import { ContentPerformance } from '@/components/dashboard/analytics/ContentPerformance';
import { MusicOverview } from '@/components/dashboard/analytics/music/MusicOverview';
import { TopTracks } from '@/components/dashboard/analytics/music/TopTracks';
import { StreamingStats } from '@/components/dashboard/analytics/music/StreamingStats';
import { RoyaltyEarnings } from '@/components/dashboard/analytics/music/RoyaltyEarnings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EngagementMetrics />
            <RevenueAnalytics />
            <PlatformBreakdown />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeographicDistribution />
            <AudienceGrowth />
          </div>

          <ContentPerformance />
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <MusicOverview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TopTracks />
            <StreamingStats />
          </div>
          <RoyaltyEarnings />
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Social Media Performance</h3>
              {/* Social media metrics will go here */}
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
              {/* Engagement trends will go here */}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}