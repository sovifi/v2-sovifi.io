'use client';

import { ThemeProvider } from "@/components/shared/theme-provider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Web3Provider } from "@/context/Web3Context";
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';
import { metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider 
      activeChain={Sepolia}
      clientId={THIRDWEB_CONFIG.clientId}
      secretKey={THIRDWEB_CONFIG.secretKey}
      supportedChains={[Sepolia]}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect()
      ]}
      dAppMeta={{
        name: "Sovifi",
        description: "Web3 Music Platform",
        logoUrl: "https://your-logo-url.com",
        url: "https://your-website.com",
        isDarkMode: true,
      }}
    >
      <AuthProvider>
        <Web3Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors closeButton position="bottom-right" />
          </ThemeProvider>
        </Web3Provider>
      </AuthProvider>
    </ThirdwebProvider>
  );
}