'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const topSellers = [
  {
    id: '1',
    name: 'MALIBU ENTRY',
    image: '/nft-1.jpg',
    stats: {
      unitsSold: 325,
      revenue: '$65,331.00',
    },
  },
  {
    id: '2',
    name: 'FRESH HANDS',
    image: '/nft-2.jpg',
    stats: {
      unitsSold: 245,
      revenue: '$45,123.00',
    },
  },
  {
    id: '3',
    name: 'VIP SECTION',
    image: '/nft-3.jpg',
    stats: {
      unitsSold: 198,
      revenue: '$32,456.00',
    },
  },
  {
    id: '4',
    name: 'TRIPPY',
    image: '/nft-4.jpg',
    stats: {
      unitsSold: 156,
      revenue: '$28,789.00',
    },
  },
];

export function TopSellers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-normal">TOP SELLERS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {topSellers.map((seller) => (
            <div
              key={seller.id}
              className="relative overflow-hidden rounded-lg aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src={seller.image}
                alt={seller.name}
                width={200}
                height={200}
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 text-white z-20">
                <h3 className="text-sm font-medium">{seller.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}