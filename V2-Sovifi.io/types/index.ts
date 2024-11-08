export * from './thirdweb';

export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  isArtist?: boolean;
  walletAddress?: string;
}

export interface Artist extends User {
  bio?: string;
  genres?: string[];
  totalSales?: string;
  numberOfNFTs?: number;
  fanCount?: number;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: {
    id: string;
    username: string;
    profileImage?: string;
    email?: string;
    isArtist?: boolean;
  };
  owner?: {
    id: string;
    username: string;
    email?: string;
    isArtist?: boolean;
  };
  price: string;
  currency: string;
  category?: string;
  tokenId?: string;
  contractAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}