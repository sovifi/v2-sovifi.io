'use client';

import { SocialOverview } from '@/components/dashboard/analytics/social/SocialOverview';
import { PlatformPerformance } from '@/components/dashboard/analytics/social/PlatformPerformance';
import { TopPosts } from '@/components/dashboard/analytics/social/TopPosts';
import { AudienceInsights } from '@/components/dashboard/analytics/social/AudienceInsights';
import { HashtagAnalytics } from '@/components/dashboard/analytics/social/HashtagAnalytics';

export default function SocialAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Social Media Analytics</h1>
      <SocialOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformPerformance />
        <AudienceInsights />
      </div>
      <TopPosts />
      <HashtagAnalytics />
    </div>
  );
}