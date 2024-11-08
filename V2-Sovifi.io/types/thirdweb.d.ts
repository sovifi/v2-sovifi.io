import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

export interface NFTContract extends SmartContract<BaseContract> {
  // Add specific NFT contract methods here
  mint: (metadata: any) => Promise<any>;
  totalSupply: () => Promise<number>;
}

export interface MarketplaceContract extends SmartContract<BaseContract> {
  // Add specific marketplace contract methods here
  createListing: (listing: any) => Promise<any>;
  buyoutListing: (listingId: string, quantity: number) => Promise<any>;
}

export interface ThirdWebAuthUser {
  address: string;
  chainId: number;
}

export interface ThirdWebConfig {
  clientId: string;
  activeChain: string;
  supportedChains: string[];
  nftCollection: {
    name: string;
    symbol: string;
    description: string;
    image: string;
    external_link: string;
    seller_fee_basis_points: number;
    fee_recipient: string;
  };
  marketplace: {
    platformFeePercent: number;
    platformFeeRecipient: string;
  };
  contracts: {
    nft: string | undefined;
    marketplace: string | undefined;
  };
}