'use client';

import { useState, useEffect } from 'react';
import { generateWallet } from '@/lib/walletUtils';
import { getWalletBalance } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

interface WalletState {
  address: string | null;
  balance: {
    displayValue: string;
    symbol: string;
  } | null;
  isLoading: boolean;
  error: Error | null;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function initWallet() {
      try {
        const result = await generateWallet();
        if (result.success && result.address && result.account) {
          // Get wallet balance
          const balance = await getWalletBalance({
            account: result.account,
            chain: sepolia,
          });

          setWalletState({
            address: result.address,
            balance: {
              displayValue: balance.displayValue,
              symbol: balance.symbol,
            },
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error(result.error || 'Failed to generate wallet');
        }
      } catch (error) {
        setWalletState({
          address: null,
          balance: null,
          isLoading: false,
          error: error as Error,
        });
      }
    }

    initWallet();
  }, []);

  return walletState;
}