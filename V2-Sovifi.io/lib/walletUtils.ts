'use client';

import { privateKeyToAccount } from "thirdweb/wallets";
import { getThirdwebClient } from './thirdwebClient';
import { toast } from 'sonner';

// This is a demo private key - NEVER use real private keys in production code
const DEMO_PRIVATE_KEY = '0x1234567890123456789012345678901234567890123456789012345678901234';

export async function generateWallet() {
  try {
    const client = getThirdwebClient();
    if (!client) {
      throw new Error('Failed to initialize Thirdweb client');
    }

    const account = privateKeyToAccount({
      client,
      privateKey: DEMO_PRIVATE_KEY,
    });

    if (!account) {
      throw new Error('Failed to create account');
    }

    const address = account.address;
    console.log("Connected as", address);
    
    return {
      success: true,
      account,
      address,
    };
  } catch (error) {
    console.error('Failed to generate wallet:', error);
    toast.error('Failed to generate wallet', {
      description: error instanceof Error ? error.message : 'Please check your connection and try again'
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}