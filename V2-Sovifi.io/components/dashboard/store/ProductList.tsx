'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, Plus } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Limited Edition T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    price: '$29.99',
    stock: 45,
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Vinyl Record',
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&auto=format&fit=crop&q=60',
    price: '$24.99',
    stock: 5,
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Concert Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
    price: '$49.99',
    stock: 0,
    status: 'out-of-stock',
  },
];

export function ProductList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Products
        </CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      product.status === 'in-stock'
                        ? 'default'
                        : product.status === 'low-stock'
                        ? 'warning'
                        : 'destructive'
                    }
                  >
                    {product.stock} in stock
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}