import { Suspense } from 'react';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import SearchFilters from '@/components/search/SearchFilters';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Search</h1>
        <p className="text-muted-foreground">
          Discover artists, NFTs, and exclusive content
        </p>
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SearchFilters />
        <div className="lg:col-span-3">
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </div>
  );
}