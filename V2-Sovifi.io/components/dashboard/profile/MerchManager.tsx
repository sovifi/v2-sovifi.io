'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Nfc } from 'lucide-react';
import Image from 'next/image';

interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  hasNFC: boolean;
  inStock: boolean;
}

export default function MerchManager() {
  const [items, setItems] = useState<MerchItem[]>([
    {
      id: '1',
      name: 'Limited Edition T-Shirt',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      hasNFC: true,
      inStock: true,
    },
    {
      id: '2',
      name: 'Tour Hoodie',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      hasNFC: true,
      inStock: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Merch Collection</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  {item.hasNFC && (
                    <Badge variant="secondary" className="gap-1">
                      <Nfc className="h-3 w-3" />
                      NFC
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.price}</span>
                  {!item.inStock && (
                    <Badge variant="secondary">Out of Stock</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Switch checked={item.inStock} />
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