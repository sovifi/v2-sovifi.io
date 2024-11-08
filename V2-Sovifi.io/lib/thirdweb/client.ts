'use client';

import { createThirdwebClient } from "thirdweb";
import { THIRDWEB_CONFIG } from './config';
import { sepolia } from "thirdweb/chains";

// Client-side configuration using client ID
export function createClientSideClient() {
  return createThirdwebClient({
    clientId: THIRDWEB_CONFIG.clientId,
    chain: sepolia,
    chains: [sepolia],
    rpc: {
      [sepolia.id]: THIRDWEB_CONFIG.rpc.sepolia,
    },
  });
}

let clientInstance: ReturnType<typeof createThirdwebClient> | null = null;

export function getClientSideClient() {
  if (!clientInstance) {
    clientInstance = createClientSideClient();
  }
  return clientInstance;
}