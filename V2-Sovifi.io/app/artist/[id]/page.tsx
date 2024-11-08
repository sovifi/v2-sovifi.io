import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CreatorClub from '@/components/artist/CreatorClub';
import ArtistHero from '@/components/artist/ArtistHero';
import ArtistStats from '@/components/artist/ArtistStats';
import ExclusiveContent from '@/components/artist/ExclusiveContent';
import UpcomingEvents from '@/components/artist/UpcomingEvents';
import { Loader2 } from 'lucide-react';

async function getArtist(id: string) {
  // Demo artist data
  const artist = {
    id: '1',
    name: 'SoundScape',
    bio: 'Electronic music producer and visual artist exploring new soundscapes',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    followers: 124700,
    clubMembers: 2500,
    verified: true,
  };

  return artist;
}

export default async function ArtistProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const artist = await getArtist(params.id);

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ArtistHero artist={artist} />
      
      <div className="container mx-auto py-8 space-y-12">
        <ArtistStats artist={artist} />

        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
          <CreatorClub artistId={artist.id} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
            <ExclusiveContent artistId={artist.id} />
          </Suspense>

          <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
            <UpcomingEvents artistId={artist.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}