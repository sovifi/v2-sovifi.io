'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNFTContract } from '@/hooks/useNFTContract';
import { formatEther } from 'viem';
import { Music2, Image as ImageIcon, MoreVertical, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NFTGrid() {
  const { ownedNFTs, isLoading } = useNFTContract();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="aspect-square animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (!ownedNFTs?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No NFTs created yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {ownedNFTs.map((nft) => (
        <Card key={nft.metadata.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Image
              src={nft.metadata.image || ''}
              alt={nft.metadata.name || ''}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                  <DropdownMenuItem>Transfer</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Burn</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold truncate">{nft.metadata.name}</h3>
              {nft.metadata.attributes?.find(attr => attr.trait_type === 'type')?.value === 'music' ? (
                <Music2 className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {formatEther(BigInt(nft.metadata.price || 0))} ETH
              </Badge>
              <Button variant="ghost" size="sm">
                List for Sale
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}