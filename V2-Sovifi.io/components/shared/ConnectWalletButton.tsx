'use client';

import { ConnectWallet } from "@thirdweb-dev/react";
import { useWeb3 } from '@/context/Web3Context';

export function ConnectWalletButton() {
  const { formatAddress, address } = useWeb3();

  return (
    <ConnectWallet 
      theme="dark"
      btnTitle={address ? formatAddress(address) : "Connect Wallet"}
      modalSize="wide"
    />
  );
}