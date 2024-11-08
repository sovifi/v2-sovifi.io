'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Music2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface NFT {
  id: string;
  name: string;
  price: string;
  image: string;
  type: 'music' | 'image';
  active: boolean;
}

export default function NFTCollectionManager() {
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: '1',
      name: 'Sonic Dreams #001',
      price: '0.5 ETH',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      type: 'music',
      active: true,
    },
    {
      id: '2',
      name: 'Beat Collection #023',
      price: '0.3 ETH',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      type: 'music',
      active: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">NFT Collection</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create NFT
        </Button>
      </div>

      <div className="grid gap-4">
        {nfts.map((nft) => (
          <Card key={nft.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{nft.name}</h4>
                  {nft.type === 'music' ? (
                    <Music2 className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Badge variant="secondary">{nft.price}</Badge>
              </div>

              <div className="flex items-center gap-4">
                <Switch checked={nft.active} />
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}