import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import type { NFT } from '@/types';

const TOP_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Sonic Dreams #001',
    description: 'A unique audio-visual experience',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    price: '0.5',
    currency: 'ETH',
    creator: {
      id: '1',
      username: 'SoundScape',
      profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
    },
  },
  {
    id: '2',
    name: 'Beat Collection #023',
    description: 'Limited edition beat package',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60',
    price: '0.3',
    currency: 'ETH',
    creator: {
      id: '2',
      username: 'BeatMaster',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60',
    },
  },
];

export function TopNFTs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Top Performing NFTs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TOP_NFTS.map((nft) => (
            <div
              key={nft.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={nft.image} alt={nft.name} />
                  <AvatarFallback>{nft.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{nft.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {nft.description}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                {nft.price} {nft.currency}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}