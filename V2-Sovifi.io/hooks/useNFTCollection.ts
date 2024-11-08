'use client';

import { useState } from "react";
import { useNFTContract } from "./useNFTContract";
import { toast } from "sonner";

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export function useNFTCollection() {
  const [isCreating, setIsCreating] = useState(false);
  const { contract, mintNFT } = useNFTContract();

  const createNFTCollection = async (
    metadataList: NFTMetadata[],
    onProgress?: (progress: number) => void
  ) => {
    if (!contract) {
      toast.error("No contract initialized");
      return;
    }

    setIsCreating(true);

    try {
      const total = metadataList.length;
      
      for (let i = 0; i < total; i++) {
        const metadata = metadataList[i];
        await mintNFT(metadata);
        
        if (onProgress) {
          onProgress(((i + 1) / total) * 100);
        }

        toast.success(`Minted NFT ${i + 1} of ${total}`);
      }

      toast.success("Collection created successfully!");
    } catch (err) {
      toast.error("Failed to create collection");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    createNFTCollection,
  };
}