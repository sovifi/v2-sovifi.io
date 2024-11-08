'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store } from 'lucide-react';
import type { NFT } from '@/types';

const FEATURED_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Sonic Dreams #001',
    description: 'A unique audio-visual experience',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    creator: {
      id: '1',
      username: 'SoundScape',
      email: 'soundscape@example.com',
      isArtist: true,
    },
    owner: {
      id: '1',
      username: 'SoundScape',
      email: 'soundscape@example.com',
      isArtist: true,
    },
    price: '0.5',
    currency: 'ETH',
    tokenId: '1',
    contractAddress: '0x...',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
  },
  {
    id: '2',
    name: 'Beat Collection #023',
    description: 'Limited edition beat package',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60',
    creator: {
      id: '2',
      username: 'BeatMaster',
      email: 'beatmaster@example.com',
      isArtist: true,
    },
    owner: {
      id: '2',
      username: 'BeatMaster',
      email: 'beatmaster@example.com',
      isArtist: true,
    },
    price: '0.3',
    currency: 'ETH',
    tokenId: '2',
    contractAddress: '0x...',
    createdAt: '2024-03-19',
    updatedAt: '2024-03-19',
  },
  {
    id: '3',
    name: 'Vocal Sessions #005',
    description: 'Exclusive vocal tracks and stems',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60',
    creator: {
      id: '3',
      username: 'VocalVibe',
      email: 'vocalvibe@example.com',
      isArtist: true,
    },
    owner: {
      id: '3',
      username: 'VocalVibe',
      email: 'vocalvibe@example.com',
      isArtist: true,
    },
    price: '0.2',
    currency: 'ETH',
    tokenId: '3',
    contractAddress: '0x...',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-18',
  },
];

export default function MarketplacePreview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Featured NFTs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_NFTS.map((nft) => (
            <Link key={nft.id} href={`/marketplace/${nft.id}`}>
              <div className="group relative overflow-hidden rounded-lg border bg-card">
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    width={400}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{nft.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="secondary">
                      {nft.price} {nft.currency}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      by {nft.creator.username}
                    </span>
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