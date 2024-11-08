'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Music2, Ticket } from 'lucide-react';
import type { NFT } from '@/types';

interface NFTGridProps {
  category?: string;
}

const SAMPLE_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Sonic Dreams #001',
    description: 'A unique audio-visual experience',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    price: '0.5',
    currency: 'ETH',
    category: 'music',
    creator: {
      id: '1',
      username: 'SoundScape',
      profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
    },
  },
  {
    id: '2',
    name: 'Visual Harmony #023',
    description: 'Digital artwork inspired by sound waves',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60',
    price: '0.3',
    currency: 'ETH',
    category: 'artwork',
    creator: {
      id: '2',
      username: 'BeatMaster',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60',
    },
  },
  {
    id: '3',
    name: 'Summer Festival 2024',
    description: 'VIP access to the biggest music festival',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60',
    price: '0.8',
    currency: 'ETH',
    category: 'tickets',
    creator: {
      id: '3',
      username: 'VocalVibe',
      profileImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
    },
  },
];

export default function NFTGrid({ category }: NFTGridProps) {
  const filteredNFTs = category
    ? SAMPLE_NFTS.filter((nft) => nft.category === category)
    : SAMPLE_NFTS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredNFTs.map((nft) => (
        <Card key={nft.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/75"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold truncate">{nft.name}</h3>
                {nft.category === 'music' && <Music2 className="h-4 w-4 text-muted-foreground" />}
                {nft.category === 'tickets' && <Ticket className="h-4 w-4 text-muted-foreground" />}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {nft.price} {nft.currency}
              </Badge>
              <Link href={`/artist/${nft.creator.id}`} className="text-sm text-muted-foreground hover:underline">
                by {nft.creator.username}
              </Link>
            </div>
            <Button className="w-full">View Details</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}