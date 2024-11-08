'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAddress, useDisconnect, useBalance, useChain, useConnect, useConnectionStatus } from "@thirdweb-dev/react";
import { toast } from 'sonner';

interface Web3ContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  balance: any;
  chainId: number | undefined;
  formatAddress: (address: string) => string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const address = useAddress();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { data: balance } = useBalance();
  const chain = useChain();
  const connectionStatus = useConnectionStatus();

  const formatAddress = (addr: string): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
    }
  };

  const value: Web3ContextType = {
    address,
    isConnected: !!address,
    isConnecting: connectionStatus === "connecting",
    connectWallet,
    disconnectWallet,
    balance,
    chainId: chain?.chainId,
    formatAddress
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3(): Web3ContextType {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}