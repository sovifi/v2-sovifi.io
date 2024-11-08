import { createThirdwebClient } from "thirdweb";
import { THIRDWEB_CONFIG } from './config';
import { sepolia } from "thirdweb/chains";

// Server-side configuration using secret key
export const serverClient = createThirdwebClient({
  secretKey: THIRDWEB_CONFIG.secretKey,
  chain: sepolia,
  chains: [sepolia],
  rpc: {
    [sepolia.id]: THIRDWEB_CONFIG.rpc.sepolia,
  },
});

// Singleton pattern for server-side
let instance: ReturnType<typeof createThirdwebClient>;

export function getServerClient() {
  if (!instance) {
    instance = serverClient;
  }
  return instance;
}