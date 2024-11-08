'use client';

import { useTokenGating } from '@/hooks/useTokenGating';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NFTMintButton } from '@/components/nft/NFTMintButton';
import { Lock, Loader2 } from 'lucide-react';

interface TokenGateProps {
  children: React.ReactNode;
  requiredTokenId?: string;
  fallback?: React.ReactNode;
}

export function TokenGate({ children, requiredTokenId, fallback }: TokenGateProps) {
  const { hasAccess, isLoading } = useTokenGating(requiredTokenId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!hasAccess) {
    return fallback || (
      <Card className="p-8 text-center">
        <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Access Required</h3>
        <p className="text-muted-foreground mb-4">
          You need to own a membership NFT to access this content.
        </p>
        <NFTMintButton
          metadata={{
            name: "Club Membership",
            description: "Access to exclusive content and perks",
            image: "https://your-membership-nft-image.com",
          }}
        />
      </Card>
    );
  }

  return children;
}