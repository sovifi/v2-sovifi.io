import { MusicOverview } from '@/components/dashboard/music/MusicOverview';
import { TopTracks } from '@/components/dashboard/music/TopTracks';
import { StreamingStats } from '@/components/dashboard/music/StreamingStats';
import { RoyaltyEarnings } from '@/components/dashboard/music/RoyaltyEarnings';

export default function MusicDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Music Dashboard</h1>
      <MusicOverview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TopTracks />
        <StreamingStats />
      </div>
      <RoyaltyEarnings />
    </div>
  );
}