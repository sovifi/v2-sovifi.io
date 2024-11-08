'use client';

import { getThirdwebClient } from '@/lib/thirdweb/client';
import { sepolia } from "thirdweb/chains";
import { THIRDWEB_CONFIG } from '@/lib/thirdweb/config';
import { toast } from 'sonner';

const PLATFORM_FEE_BPS = 250; // 2.5%
const ARTIST_ROYALTY_BPS = 750; // 7.5%
const PLATFORM_ROYALTY_BPS = 300; // 3%

interface DeploymentResult {
  success: boolean;
  contractAddress?: string;
  error?: string;
  transactionHash?: string;
  explorerUrl?: string;
}

export async function deployNFTContract(
  name: string,
  symbol: string,
  maxSupply: number,
  artistAddress: string,
): Promise<DeploymentResult> {
  try {
    const client = getThirdwebClient();
    if (!client) {
      throw new Error('Failed to initialize Thirdweb client');
    }

    // Deploy the NFT Collection contract
    const contractAddress = await client.deployer.deployNFTCollection({
      name,
      symbol,
      primary_sale_recipient: artistAddress,
      platform_fee_recipient: THIRDWEB_CONFIG.platformWallet,
      platform_fee_basis_points: PLATFORM_FEE_BPS,
      fee_recipient: artistAddress,
      seller_fee_basis_points: ARTIST_ROYALTY_BPS + PLATFORM_ROYALTY_BPS,
    });

    // Get the deployed contract
    const contract = await client.getContract(contractAddress);

    // Set up the split for secondary sales
    await contract.royalties.setDefaultRoyaltyInfo({
      seller_fee_basis_points: ARTIST_ROYALTY_BPS + PLATFORM_ROYALTY_BPS,
      fee_recipient: artistAddress,
    });

    // Set up platform royalty split
    await contract.platformFees.setPlatformFeeInfo({
      platform_fee_recipient: THIRDWEB_CONFIG.platformWallet,
      platform_fee_basis_points: PLATFORM_ROYALTY_BPS,
    });

    const explorerUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;

    return {
      success: true,
      contractAddress,
      explorerUrl,
    };

  } catch (error) {
    console.error("Contract deployment failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Contract deployment failed",
    };
  }
}

export async function mintNFT(
  contractAddress: string,
  metadata: {
    name: string;
    description: string;
    image: File;
    price: string;
  }
) {
  try {
    const client = getThirdwebClient();
    const contract = await client.getContract(contractAddress);

    // Upload metadata to IPFS
    const uri = await contract.metadata.upload(metadata);

    // Mint NFT with platform fee
    const tx = await contract.erc721.mint({
      metadata: uri,
      to: contract.getSignerAddress(),
      price: metadata.price,
    });

    return {
      success: true,
      tokenId: tx.id,
      transactionHash: tx.receipt.transactionHash,
    };

  } catch (error) {
    console.error("NFT minting failed:", error);
    throw error;
  }
}

export async function listNFTForSale(
  contractAddress: string,
  tokenId: string,
  price: string
) {
  try {
    const client = getThirdwebClient();
    const contract = await client.getContract(contractAddress);

    const tx = await contract.marketplace.createListing({
      assetContract: contractAddress,
      tokenId,
      buyoutPricePerToken: price,
      quantity: 1,
    });

    return {
      success: true,
      listingId: tx.id,
      transactionHash: tx.receipt.transactionHash,
    };

  } catch (error) {
    console.error("NFT listing failed:", error);
    throw error;
  }
}