'use client';

import { useState, useEffect } from 'react';
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { getThirdwebClient } from '@/lib/thirdweb/client';
import { rpcManager } from '@/lib/thirdweb/rpcManager';
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';
import { toast } from 'sonner';

interface ContractData {
  ownedNFTs: any[];
  totalSupply: number;
  isLoading: boolean;
  error: Error | null;
}

const initialState: ContractData = {
  ownedNFTs: [],
  totalSupply: 0,
  isLoading: true,
  error: null,
};

export function useContractRead(contractAddress: string) {
  const [data, setData] = useState<ContractData>(initialState);

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;
    let retryCount = 0;

    async function fetchContractData() {
      if (!contractAddress) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: new Error('No contract address provided'),
        }));
        return;
      }

      try {
        const client = await getThirdwebClient();
        if (!client) {
          throw new Error('Failed to initialize Thirdweb client');
        }

        const currentRpc = rpcManager.getCurrentRpc();
        if (!currentRpc) {
          throw new Error('No RPC endpoint available');
        }

        const contract = getContract({
          client,
          address: contractAddress,
          chain: sepolia,
        });

        const [ownedNFTs, totalSupply] = await Promise.all([
          getOwnedNFTs({
            contract,
            address: contractAddress,
          }),
          contract.erc721.totalSupply(),
        ]);

        if (mounted) {
          setData({
            ownedNFTs,
            totalSupply: totalSupply.toNumber(),
            isLoading: false,
            error: null,
          });
        }

        // Reset RPC status on successful call
        rpcManager.resetRpc(currentRpc);
      } catch (error) {
        console.error('Error fetching contract data:', error);
        
        if (!mounted) return;

        const currentRpc = rpcManager.getCurrentRpc();
        rpcManager.markRpcFailed(currentRpc);

        if (retryCount < THIRDWEB_CONFIG.retryConfig.maxRetries) {
          const nextRpc = rpcManager.getNextAvailableRpc();
          if (nextRpc) {
            retryCount++;
            const delay = Math.min(
              THIRDWEB_CONFIG.retryConfig.maxDelay,
              THIRDWEB_CONFIG.retryConfig.initialDelay * Math.pow(2, retryCount)
            );
            
            retryTimeout = setTimeout(() => {
              if (mounted) {
                fetchContractData();
              }
            }, delay);
            return;
          }
        }

        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch contract data'),
        }));
        
        toast.error('Failed to fetch contract data', {
          description: 'Please check your connection and try again later',
        });
      }
    }

    fetchContractData();

    return () => {
      mounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [contractAddress]);

  return data;
}