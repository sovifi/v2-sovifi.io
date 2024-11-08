'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Nfc } from 'lucide-react';

interface MerchItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  hasNFC: boolean;
  inStock: boolean;
}

const SAMPLE_MERCH: MerchItem[] = [
  {
    id: '1',
    name: 'Limited Edition T-Shirt',
    description: 'NFC-enabled concert shirt with exclusive digital content',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    price: '$49.99',
    hasNFC: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Tour Hoodie',
    description: 'Premium hoodie with embedded digital collectible',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    price: '$89.99',
    hasNFC: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Vinyl Record',
    description: 'Limited edition vinyl with NFC authentication',
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800',
    price: '$34.99',
    hasNFC: true,
    inStock: false,
  },
];

export default function MerchGrid({ artistId }: { artistId: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {SAMPLE_MERCH.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {item.hasNFC && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm"
              >
                <Nfc className="h-4 w-4 mr-1" />
                NFC
              </Badge>
            )}
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{item.price}</span>
              {!item.inStock && (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>
            <Button className="w-full gap-2" disabled={!item.inStock}>
              <ShoppingBag className="h-4 w-4" />
              {item.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}