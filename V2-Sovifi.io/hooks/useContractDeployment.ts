'use client';

import { useState } from 'react';
import { deployNFTContract } from '@/lib/contracts/deployContract';
import { toast } from 'sonner';
import { useWallet } from './useWallet';

export function useContractDeployment() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<{
    contractAddress?: string;
    transactionHash?: string;
    explorerUrl?: string;
    verificationStatus?: 'pending' | 'verified' | 'failed';
  } | null>(null);
  
  const { address } = useWallet();

  const deployContract = async (
    name: string,
    symbol: string,
    maxSupply: number,
    royaltyBps: number = 500, // 5% default royalty
  ) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return null;
    }

    setIsDeploying(true);
    setDeploymentStatus(null);

    try {
      const result = await deployNFTContract(
        name,
        symbol,
        maxSupply,
        address,
        royaltyBps
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      setDeploymentStatus({
        contractAddress: result.contractAddress,
        transactionHash: result.transactionHash,
        explorerUrl: result.explorerUrl,
        verificationStatus: result.verificationStatus,
      });

      return result;
    } catch (error) {
      toast.error('Failed to deploy contract', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      return null;
    } finally {
      setIsDeploying(false);
    }
  };

  const verifyContract = async (contractAddress: string) => {
    // Open Etherscan verification page
    window.open(
      `https://sepolia.etherscan.io/verifyContract?a=${contractAddress}`,
      '_blank'
    );
  };

  return {
    deployContract,
    verifyContract,
    isDeploying,
    deploymentStatus,
  };
}