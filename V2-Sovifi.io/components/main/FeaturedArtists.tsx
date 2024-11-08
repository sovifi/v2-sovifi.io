'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import type { Artist } from '@/types';

const FEATURED_ARTISTS: Artist[] = [
  {
    id: '1',
    username: 'SoundScape',
    email: 'soundscape@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
    bio: 'Electronic music producer and visual artist',
    genres: ['Electronic', 'Ambient'],
    totalSales: '45.5',
    numberOfNFTs: 12,
    fanCount: 1500,
  },
  {
    id: '2',
    username: 'BeatMaster',
    email: 'beatmaster@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60',
    bio: 'Hip-hop producer and beat maker',
    genres: ['Hip-Hop', 'Beats'],
    totalSales: '32.8',
    numberOfNFTs: 8,
    fanCount: 1200,
  },
  {
    id: '3',
    username: 'VocalVibe',
    email: 'vocalvibe@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
    bio: 'Singer-songwriter exploring new sounds',
    genres: ['Pop', 'R&B'],
    totalSales: '28.3',
    numberOfNFTs: 6,
    fanCount: 900,
  },
];

export default function FeaturedArtists() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Featured Artists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_ARTISTS.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`}>
              <div className="group relative overflow-hidden rounded-lg">
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={artist.profileImage || ''}
                    alt={artist.username}
                    width={400}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={artist.profileImage} />
                      <AvatarFallback>{artist.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{artist.username}</h3>
                      <p className="text-sm opacity-90">{artist.genres?.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}