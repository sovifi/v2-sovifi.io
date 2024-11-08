export const THIRDWEB_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '',
  secretKey: process.env.THIRDWEB_SECRET_KEY || '',
  chain: 'sepolia',
  supportedChains: ['sepolia'],
  
  // NFT Collection settings
  nftCollection: {
    name: 'Sovifi NFT Collection',
    symbol: 'SNFT',
    description: 'Official NFT collection for Sovifi music platform',
    image: 'https://your-collection-image.com',
    external_link: 'https://your-website.com',
    seller_fee_basis_points: 500, // 5% royalty
    fee_recipient: process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS || '',
  },

  // Marketplace settings  
  marketplace: {
    platformFeePercent: 2.5,
    platformFeeRecipient: process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS || '',
  },

  // Contract addresses
  contracts: {
    nft: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    marketplace: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  }
};