'use client';

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const activeChain = Sepolia;
const supportedChains = [Sepolia];

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebSDKProvider 
      activeChain={activeChain}
      clientId="66972f239ebaadf25b59aa2e288fcec3"
      supportedChains={supportedChains}
      dAppMeta={{
        name: "Sovifi",
        description: "Web3 Music Platform",
        logoUrl: "https://your-logo-url.com",
        url: "https://your-website.com",
        isDarkMode: false,
      }}
      autoConnect={true}
      autoSwitch={true}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}