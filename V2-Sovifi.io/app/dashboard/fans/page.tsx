'use client';

import { FanOverview } from '@/components/dashboard/fans/FanOverview';
import { TopFans } from '@/components/dashboard/fans/TopFans';
import { FanEngagement } from '@/components/dashboard/fans/FanEngagement';
import { RewardProgram } from '@/components/dashboard/fans/RewardProgram';
import { FanCommunity } from '@/components/dashboard/fans/FanCommunity';

export default function FansPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Fan Management</h1>
      <FanOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopFans />
        <FanEngagement />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RewardProgram />
        <FanCommunity />
      </div>
    </div>
  );
}