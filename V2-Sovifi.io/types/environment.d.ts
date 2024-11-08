declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string;
      NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN: string;
      THIRDWEB_SECRET_KEY: string;
      THIRDWEB_API_KEY: string;
      NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_MARKETPLACE_ADDRESS: string;
      NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS: string;
      THIRDWEB_AUTH_PRIVATE_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}