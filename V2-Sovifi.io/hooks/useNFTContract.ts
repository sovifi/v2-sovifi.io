'use client';

import { useState } from 'react';
import { useContract, useNFTBalance, useOwnedNFTs } from "@thirdweb-dev/react";
import { useThirdwebClient } from './useThirdwebClient';
import { toast } from 'sonner';
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';

interface NFTMetadata {
  name: string;
  description: string;
  image: File;
  type?: 'image' | 'music';
  price?: string;
}

export function useNFTContract(contractAddress?: string) {
  const { client, error: clientError } = useThirdwebClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const address = contractAddress || THIRDWEB_CONFIG.contracts?.nft;

  const { contract } = useContract(address);
  const { data: ownedNFTs, isLoading: isLoadingOwned } = useOwnedNFTs(contract);
  const { data: balance } = useNFTBalance(contract);

  const mintNFT = async (metadata: NFTMetadata) => {
    if (!contract) {
      toast.error("No contract initialized");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Upload metadata to IPFS
      const uri = await contract.metadata.upload({
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: [
          {
            trait_type: 'type',
            value: metadata.type || 'image',
          },
          {
            trait_type: 'price',
            value: metadata.price || '0',
          },
        ],
      });

      // Mint NFT
      const tx = await contract.erc721.mint({
        name: metadata.name,
        description: metadata.description,
        image: uri,
        attributes: [
          {
            trait_type: 'type',
            value: metadata.type || 'image',
          },
          {
            trait_type: 'price',
            value: metadata.price || '0',
          },
        ],
      });

      toast.success('NFT minted successfully!');
      return tx;
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to mint NFT', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contract,
    ownedNFTs,
    balance: balance?.toNumber() || 0,
    isLoading: isLoading || isLoadingOwned,
    error: error || clientError,
    mintNFT,
  };
}