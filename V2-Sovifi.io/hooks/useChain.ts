'use client';

import { useState, useEffect } from 'react';
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';
import { toast } from 'sonner';

export function useChain() {
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkChainSupport = async () => {
      try {
        // Check if current chain is supported
        const supported = THIRDWEB_CONFIG.supportedChains.some(
          chain => chain.id === THIRDWEB_CONFIG.chain.id
        );
        setIsSupported(supported);

        if (!supported) {
          toast.error('Unsupported chain', {
            description: 'Please switch to Sepolia testnet',
          });
        }
      } catch (error) {
        console.error('Chain check failed:', error);
        setIsSupported(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkChainSupport();
  }, []);

  return {
    chain: THIRDWEB_CONFIG.chain,
    isSupported,
    isLoading,
  };
}