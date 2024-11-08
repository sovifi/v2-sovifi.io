'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Crown, Ticket, Music, Star } from 'lucide-react';

const MEMBERSHIP_TIERS = [
  {
    name: 'Gold',
    price: '0.5 ETH',
    benefits: [
      'Exclusive behind-the-scenes content',
      'Early access to new releases',
      'Members-only Discord channel',
      'Digital collectible pack',
    ],
    icon: Crown,
  },
  {
    name: 'Platinum',
    price: '1.5 ETH',
    benefits: [
      'All Gold benefits',
      'Virtual meet & greets',
      'Exclusive merch drops',
      'Vote on setlists',
      'Birthday message from artist',
    ],
    icon: Star,
  },
];

export default function CreatorClub({ artistId }: { artistId: string }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Creator Club
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Join the Club</h3>
            <p className="text-muted-foreground">
              Get exclusive access to unique experiences, early releases, and special perks
              through NFT membership.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span>Early Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>Exclusive Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Special Perks</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {MEMBERSHIP_TIERS.map((tier) => (
              <Dialog key={tier.name}>
                <DialogTrigger asChild>
                  <div className="p-4 rounded-lg border cursor-pointer hover:bg-accent">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <tier.icon className="h-5 w-5" />
                        <h4 className="font-semibold">{tier.name}</h4>
                      </div>
                      <Badge variant="secondary">{tier.price}</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join {tier.name} Membership</DialogTitle>
                    <DialogDescription>
                      Connect your wallet to purchase the membership NFT and unlock exclusive benefits.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200"
                        alt={`${tier.name} Membership`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Benefits Include:</h4>
                      <ul className="text-sm space-y-1">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full">Purchase Membership</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}