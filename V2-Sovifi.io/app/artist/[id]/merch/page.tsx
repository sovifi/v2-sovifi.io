import { Suspense } from 'react';
import MerchGrid from '@/components/artist/MerchGrid';
import MerchFilters from '@/components/artist/MerchFilters';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ArtistMerchPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Official Merch</h1>
        <p className="text-muted-foreground">
          Exclusive NFC-enabled merchandise and collectibles
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-6">
          <MerchFilters />
          
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }>
            <MerchGrid artistId={params.id} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}