import { sepolia } from "thirdweb/chains";

// Get environment variables with type safety
const CLIENT_ID = "66972f239ebaadf25b59aa2e288fcec3";
const SECRET_KEY = "wJoitOnGn8RRGf1IKSNBUZevt3u0pq0BlR8dclBTocGCiSEsM1rex87Fn5wNBK-u9nRBbQnE5bfqtBtrLfnRcw";
const API_KEY = process.env.THIRDWEB_API_KEY;

// Construct RPC URL with API key
const RPC_URL = API_KEY 
  ? `https://11155111.rpc.thirdweb.com/${API_KEY}`
  : undefined;

// Fallback RPC endpoints for redundancy
const RPC_ENDPOINTS = {
  sepolia: [
    RPC_URL,
    "https://rpc2.sepolia.org",
    "https://rpc.sepolia.org",
    "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "https://rpc.ankr.com/eth_sepolia",
  ].filter(Boolean) as string[]
};

// Configure Sepolia chain
const SEPOLIA_CHAIN = {
  ...sepolia,
  rpc: RPC_ENDPOINTS.sepolia[0],
};

export const THIRDWEB_CONFIG = {
  // Client-side credentials
  clientId: CLIENT_ID,
  
  // Server-side credentials
  secretKey: SECRET_KEY,
  
  // RPC configuration
  apiKey: API_KEY,
  chain: SEPOLIA_CHAIN,
  supportedChains: [SEPOLIA_CHAIN],
  
  // Client configuration
  rpc: {
    sepolia: RPC_ENDPOINTS.sepolia[0],
    fallbackRpcs: RPC_ENDPOINTS.sepolia,
  },
  
  // Platform settings
  platformFees: {
    initial: 2.5,
    secondary: 3.0,
  },
  royalties: {
    artist: 7.5,
    platform: 3.0,
  },
  retryConfig: {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 5000,
  },
} as const;