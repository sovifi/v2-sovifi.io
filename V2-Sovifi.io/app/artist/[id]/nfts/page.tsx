import { Suspense } from 'react';
import NFTGallery from '@/components/artist/NFTGallery';
import NFTFilters from '@/components/artist/NFTFilters';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ArtistNFTsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Digital Collectibles</h1>
        <p className="text-muted-foreground">
          Explore and collect exclusive NFTs from the artist
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-6">
          <NFTFilters />
          
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }>
            <NFTGallery artistId={params.id} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}