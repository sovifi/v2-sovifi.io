'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { TopNFTs } from '@/components/dashboard/TopNFTs';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { FanEngagement } from '@/components/dashboard/FanEngagement';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isLoading && (!user || !user.isArtist)) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.username}. Here's what's happening with your content.
        </p>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <RevenueChart />
        </Card>
        <Card className="p-6">
          <FanEngagement />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopNFTs />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}