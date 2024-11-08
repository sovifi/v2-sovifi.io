import { Suspense } from 'react';
import NewsUpdates from '@/components/main/NewsUpdates';
import FeaturedArtists from '@/components/main/FeaturedArtists';
import MarketplacePreview from '@/components/main/MarketplacePreview';
import CreatorSearch from '@/components/main/CreatorSearch';
import { Button } from '@/components/ui/button';
import { Music4, Sparkles } from 'lucide-react';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="flex flex-col gap-12 py-8">
          {/* Hero Section */}
          <section className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-7xl py-24 sm:py-32">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Connect with Artists in the Web3 Space
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                  Collect NFTs, earn rewards, and join exclusive communities. 
                  Connect your wallet to start your journey in the future of music.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button size="lg" className="gap-2">
                    <Music4 className="w-4 h-4" />
                    Explore Artists
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Start Collecting
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                  <Music4 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connect with Artists</h3>
                  <p className="text-muted-foreground">Join exclusive communities and get direct access to your favorite artists.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                  <Sparkles className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Collect NFTs</h3>
                  <p className="text-muted-foreground">Own unique digital assets and support artists directly.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                  <Music4 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                  <p className="text-muted-foreground">Get rewarded for your engagement and support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Content Sections */}
          <section className="px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-12">
              <Suspense fallback={<div>Loading featured artists...</div>}>
                <FeaturedArtists />
              </Suspense>

              <Suspense fallback={<div>Loading marketplace preview...</div>}>
                <MarketplacePreview />
              </Suspense>

              <Suspense fallback={<div>Loading news updates...</div>}>
                <NewsUpdates />
              </Suspense>

              <Suspense fallback={<div>Loading creator search...</div>}>
                <CreatorSearch />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}