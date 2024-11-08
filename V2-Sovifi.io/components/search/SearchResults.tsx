'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Music2, Ticket, Verified } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SAMPLE_RESULTS = [
  {
    id: '1',
    type: 'artist',
    name: 'SoundScape',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
    verified: true,
    followers: '10.5K',
    nftCount: 23,
  },
  {
    id: '2',
    type: 'nft',
    name: 'Sonic Dreams #001',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    price: '0.5 ETH',
    category: 'music',
    artist: 'SoundScape',
  },
  {
    id: '3',
    type: 'nft',
    name: 'Summer Festival 2024',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60',
    price: '0.8 ETH',
    category: 'tickets',
    artist: 'VocalVibe',
  },
];

export default function SearchResults() {
  return (
    <div className="space-y-4">
      {SAMPLE_RESULTS.map((result) => (
        <Card key={result.id} className="p-4">
          {result.type === 'artist' ? (
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={result.image} alt={result.name} />
                <AvatarFallback>{result.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{result.name}</h3>
                  {result.verified && (
                    <Verified className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{result.followers} followers</span>
                  <span>{result.nftCount} NFTs</span>
                </div>
              </div>
              <Button asChild>
                <Link href={`/artist/${result.id}`}>View Profile</Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                <Image
                  src={result.image}
                  alt={result.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{result.name}</h3>
                  {result.category === 'music' && (
                    <Music2 className="h-4 w-4 text-muted-foreground" />
                  )}
                  {result.category === 'tickets' && (
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">by {result.artist}</p>
                <div className="mt-2">
                  <Badge variant="secondary">{result.price}</Badge>
                </div>
              </div>
              <Button asChild>
                <Link href={`/marketplace/${result.id}`}>View Details</Link>
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}