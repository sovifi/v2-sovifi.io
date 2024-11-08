import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Verified, Heart, Share2 } from 'lucide-react';

interface ArtistHeroProps {
  artist: {
    name: string;
    bio: string;
    coverImage: string;
    profileImage: string;
    followers: number;
    clubMembers: number;
    verified: boolean;
  };
}

export default function ArtistHero({ artist }: ArtistHeroProps) {
  return (
    <div className="relative">
      <div className="h-[400px] relative">
        <Image
          src={artist.coverImage}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto">
        <div className="relative -mt-32 flex flex-col md:flex-row gap-8 items-end">
          <div className="relative h-48 w-48 rounded-lg overflow-hidden border-4 border-background">
            <Image
              src={artist.profileImage}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold">{artist.name}</h1>
              {artist.verified && (
                <Verified className="h-6 w-6 text-blue-500" />
              )}
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {artist.bio}
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="font-semibold">
                  {artist.followers.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Club Members</p>
                <p className="font-semibold">
                  {artist.clubMembers.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className="gap-2">
                <Heart className="h-4 w-4" />
                Follow
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}