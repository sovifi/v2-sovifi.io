import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NFTGrid from '@/components/marketplace/NFTGrid';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import MarketplaceStats from '@/components/marketplace/MarketplaceStats';
import { Loader2 } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">NFT Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and collect unique music NFTs from your favorite artists
        </p>
      </div>

      <MarketplaceStats />

      <Card className="p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="all">All NFTs</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="artwork">Artwork</TabsTrigger>
              <TabsTrigger value="tickets">Event Tickets</TabsTrigger>
            </TabsList>
            <MarketplaceFilters />
          </div>

          <TabsContent value="all" className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }>
              <NFTGrid />
            </Suspense>
          </TabsContent>

          <TabsContent value="music" className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }>
              <NFTGrid category="music" />
            </Suspense>
          </TabsContent>

          <TabsContent value="artwork" className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }>
              <NFTGrid category="artwork" />
            </Suspense>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }>
              <NFTGrid category="tickets" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}