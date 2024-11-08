'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Star, Crown, Trophy } from 'lucide-react';

const rewardTiers = [
  {
    name: 'Bronze',
    icon: Star,
    points: '0-1000',
    benefits: [
      'Early access to music releases',
      'Exclusive behind-the-scenes content',
    ],
    currentMembers: 12500,
  },
  {
    name: 'Silver',
    icon: Crown,
    points: '1001-5000',
    benefits: [
      'All Bronze benefits',
      'Exclusive merchandise discounts',
      'Monthly virtual meetups',
    ],
    currentMembers: 5800,
  },
  {
    name: 'Gold',
    icon: Trophy,
    points: '5001+',
    benefits: [
      'All Silver benefits',
      'VIP concert tickets',
      'Personal birthday message',
      'Limited edition collectibles',
    ],
    currentMembers: 2400,
  },
];

export function RewardProgram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Reward Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewardTiers.map((tier) => (
            <div
              key={tier.name}
              className="p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <tier.icon className="h-5 w-5" />
                  <h3 className="font-semibold">{tier.name}</h3>
                </div>
                <Badge variant="secondary">
                  {tier.points} points
                </Badge>
              </div>
              <ul className="space-y-2 mb-4">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {tier.currentMembers.toLocaleString()} members
                </span>
                <Button variant="outline" size="sm">
                  Edit Tier
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}