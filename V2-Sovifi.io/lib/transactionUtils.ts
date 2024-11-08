'use client';

import { getContract, sendTransaction as thirdwebSendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getThirdwebClient } from './thirdwebClient';
import { generateWallet } from './walletUtils';
import { toast } from 'sonner';

interface TransactionConfig {
  contractAddress: string;
  functionName: string;
  args?: any[];
  value?: string;
}

export async function sendTransaction(config: TransactionConfig) {
  try {
    const client = getThirdwebClient();
    const walletResult = await generateWallet();
    
    if (!walletResult.success || !walletResult.account) {
      throw new Error('Failed to initialize wallet');
    }

    const contract = getContract({
      client,
      address: config.contractAddress,
      chain: sepolia,
    });

    // Prepare the transaction
    const transaction = await contract.prepare(
      config.functionName,
      config.args || [],
      { value: config.value }
    );

    // Send the transaction
    const result = await thirdwebSendTransaction({
      transaction,
      account: walletResult.account,
    });

    toast.success('Transaction successful!', {
      description: `Transaction hash: ${result.transactionHash}`,
    });

    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    toast.error('Transaction failed', {
      description: error instanceof Error ? error.message : 'Please try again',
    });
    return null;
  }
}

// Specific transaction functions
export async function transferTokens(
  contractAddress: string,
  toAddress: string,
  amount: string
) {
  const client = getThirdwebClient();
  const contract = getContract({
    client,
    address: contractAddress,
    chain: sepolia,
  });

  const walletResult = await generateWallet();
  if (!walletResult.success || !walletResult.account) {
    throw new Error('Failed to initialize wallet');
  }

  // Import and use the transfer extension
  const { transfer } = await import("thirdweb/extensions/erc20");
  
  const transaction = transfer({
    contract,
    to: toAddress,
    amount: amount,
  });

  return thirdwebSendTransaction({
    transaction,
    account: walletResult.account,
  });
}

export async function mintNFT(
  contractAddress: string, 
  tokenId: number, 
  quantity: number = 1
) {
  return sendTransaction({
    contractAddress,
    functionName: 'mint',
    args: [tokenId, quantity],
  });
}

export async function listNFTForSale(
  contractAddress: string,
  tokenId: number,
  price: string
) {
  return sendTransaction({
    contractAddress,
    functionName: 'list',
    args: [tokenId, price],
  });
}

export async function buyNFT(
  contractAddress: string,
  tokenId: number,
  price: string
) {
  return sendTransaction({
    contractAddress,
    functionName: 'buy',
    args: [tokenId],
    value: price,
  });
}

export async function withdrawRoyalties(contractAddress: string) {
  return sendTransaction({
    contractAddress,
    functionName: 'withdrawRoyalties',
  });
}