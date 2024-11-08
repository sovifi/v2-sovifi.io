import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { THIRDWEB_CONFIG, sdkOptions } from './thirdweb/config';
import { sepolia } from "thirdweb/chains";

let client: ThirdwebClient | null = null;

export function getThirdwebClient() {
  if (!client) {
    try {
      client = createThirdwebClient({
        clientId: THIRDWEB_CONFIG.clientId,
        secretKey: THIRDWEB_CONFIG.secretKey,
        chain: sepolia,
        chains: THIRDWEB_CONFIG.supportedChains,
        rpc: {
          [sepolia.id]: THIRDWEB_CONFIG.rpc.sepolia,
        },
      });
    } catch (error) {
      console.error('Failed to initialize Thirdweb client:', error);
      return null;
    }
  }
  return client;
}

export async function getContract(contractAddress: string) {
  const client = getThirdwebClient();
  if (!client) {
    throw new Error('Failed to initialize Thirdweb client');
  }
  
  try {
    return await client.getContract(contractAddress);
  } catch (error) {
    console.error('Failed to get contract:', error);
    throw new Error('Failed to initialize contract');
  }
}

export function getWallet() {
  const client = getThirdwebClient();
  if (!client) {
    throw new Error('Failed to initialize Thirdweb client');
  }
  
  try {
    return client.wallet.connect({
      chain: sepolia,
      rpc: THIRDWEB_CONFIG.rpc.sepolia,
      privateKey: process.env.WALLET_PRIVATE_KEY || '',
    });
  } catch (error) {
    console.error('Failed to initialize wallet:', error);
    throw new Error('Failed to initialize wallet');
  }
}