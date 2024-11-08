'use client';

import {
  useAddress,
  useDisconnect,
  useBalance,
  useChain,
  useConnect,
  useContract,
  useNFTBalance,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { THIRDWEB_CONFIG } from '@/lib/thirdwebConfig';

export function useThirdWeb() {
  const address = useAddress();
  const { disconnect } = useDisconnect();
  const { connect, isLoading } = useConnect();
  const { data: balance } = useBalance();
  const chain = useChain();

  // NFT Contract
  const { contract: nftContract } = useContract(
    THIRDWEB_CONFIG.contracts.nft,
    "nft-collection"
  );

  // Marketplace Contract
  const { contract: marketplaceContract } = useContract(
    THIRDWEB_CONFIG.contracts.marketplace,
    "marketplace"
  );

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return {
    address,
    isConnected: !!address,
    isConnecting: isLoading,
    connect,
    disconnect,
    balance,
    chain,
    formatAddress,
    nftContract,
    marketplaceContract,
    Web3Button,
  };
}