'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNFTContract } from '@/hooks/useNFTContract';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface NFTMintButtonProps {
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes?: {
      trait_type: string;
      value: string;
    }[];
  };
  onSuccess?: () => void;
}

export function NFTMintButton({ metadata, onSuccess }: NFTMintButtonProps) {
  const [isMinting, setIsMinting] = useState(false);
  const { mintNFT } = useNFTContract();

  const handleMint = async () => {
    setIsMinting(true);

    try {
      await mintNFT(metadata);
      toast.success('NFT minted successfully!');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to mint NFT');
      console.error('Mint error:', error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Button 
      onClick={handleMint} 
      disabled={isMinting}
      className="gap-2"
    >
      {isMinting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Minting...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Mint NFT
        </>
      )}
    </Button>
  );
}