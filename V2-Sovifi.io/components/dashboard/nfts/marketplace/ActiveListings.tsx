'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useNFTContract } from '@/hooks/useNFTContract';
import { formatEther } from 'viem';
import { Edit2, Trash2, Tag } from 'lucide-react';
import Image from 'next/image';

export function ActiveListings() {
  const { ownedNFTs, contract } = useNFTContract();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedNFTs?.map((nft) => (
          <Card key={nft.metadata.id} className="p-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={nft.metadata.image || ''}
                alt={nft.metadata.name || ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{nft.metadata.name}</h3>
                <Badge variant="secondary">
                  {formatEther(BigInt(nft.metadata.price || 0))} ETH
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit Price
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Tag className="h-4 w-4" />
                  Delist
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}