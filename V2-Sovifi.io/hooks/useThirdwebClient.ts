'use client';

import { createThirdwebClient } from "thirdweb";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';
import { sepolia } from "thirdweb/chains";

interface ThirdwebClientState {
  client: ReturnType<typeof createThirdwebClient> | null;
  error: Error | null;
  isLoading: boolean;
}

export function useThirdwebClient() {
  const [state, setState] = useState<ThirdwebClientState>({
    client: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = THIRDWEB_CONFIG.retryConfig.maxRetries;

    const initClient = async () => {
      try {
        const client = createThirdwebClient({
          clientId: THIRDWEB_CONFIG.clientId,
          secretKey: THIRDWEB_CONFIG.secretKey,
          chain: sepolia,
          chains: [sepolia],
          rpc: {
            [sepolia.id]: THIRDWEB_CONFIG.rpc.sepolia,
          },
        });

        // Test the client connection
        await client.getProvider().getNetwork();

        if (mounted) {
          setState({
            client,
            error: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Client initialization failed:", error);
        
        if (!mounted) return;

        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initClient, THIRDWEB_CONFIG.retryConfig.initialDelay * retryCount);
          return;
        }

        setState({
          client: null,
          error: error instanceof Error ? error : new Error('Failed to initialize client'),
          isLoading: false,
        });

        toast.error('Failed to initialize Thirdweb client', {
          description: 'Please check your connection and try again',
        });
      }
    };

    initClient();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}