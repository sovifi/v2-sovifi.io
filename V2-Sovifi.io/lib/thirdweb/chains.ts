import { defineChain } from "thirdweb";
import { sepolia } from "thirdweb/chains";

// Use predefined Sepolia chain
export const CHAIN = sepolia;

// Custom chain configuration if needed
export const customChain = defineChain({
  // Sepolia testnet
  id: 11155111,
  // Custom RPC URL if needed
  rpc: process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Sepolia Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
  testnet: true,
});