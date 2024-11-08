'use client';

import { useNFTContract } from "./useNFTContract";
import { useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

export function useTokenGating(requiredTokenId?: string) {
  const address = useAddress();
  const { ownedNFTs, isLoading } = useNFTContract();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!address || !ownedNFTs) {
      setHasAccess(false);
      return;
    }

    if (requiredTokenId) {
      // Check for specific token
      setHasAccess(ownedNFTs.some(nft => nft.metadata.id === requiredTokenId));
    } else {
      // Check for any token ownership
      setHasAccess(ownedNFTs.length > 0);
    }
  }, [address, ownedNFTs, requiredTokenId]);

  return {
    hasAccess,
    isLoading,
  };
}