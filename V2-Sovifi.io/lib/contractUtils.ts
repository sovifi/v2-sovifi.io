'use client';

import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { toWei } from "thirdweb/utils";
import { getThirdwebClient } from './thirdwebClient';
import { generateWallet } from './walletUtils';
import { toast } from 'sonner';

interface ContractCallParams {
  contractAddress: string;
  method: string;
  params: any[];
}

export async function callContractMethod({ 
  contractAddress, 
  method, 
  params 
}: ContractCallParams) {
  try {
    const client = getThirdwebClient();
    const walletResult = await generateWallet();
    
    if (!walletResult.success || !walletResult.account) {
      throw new Error('Failed to initialize wallet');
    }

    const contract = getContract({
      client,
      address: contractAddress,
      chain: sepolia,
    });

    // Prepare the transaction
    const transaction = prepareContractCall({
      contract,
      method,
      params,
    });

    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account: walletResult.account,
    });

    toast.success('Transaction successful!', {
      description: `Transaction hash: ${result.transactionHash}`,
    });

    return result;
  } catch (error) {
    console.error('Contract call failed:', error);
    toast.error('Transaction failed', {
      description: error instanceof Error ? error.message : 'Please try again',
    });
    return null;
  }
}

// Common contract interactions
export async function mintNFT(
  contractAddress: string,
  to: string,
  tokenId: number,
  amount: number = 1
) {
  return callContractMethod({
    contractAddress,
    method: 'function mintTo(address to, uint256 tokenId, uint256 amount)',
    params: [to, tokenId, amount],
  });
}

export async function setClaimConditions(
  contractAddress: string,
  tokenId: number,
  conditions: any[]
) {
  return callContractMethod({
    contractAddress,
    method: 'function setClaimConditions(uint256 tokenId, IClaimCondition[] conditions)',
    params: [tokenId, conditions],
  });
}

export async function setRoyaltyInfo(
  contractAddress: string,
  receiver: string,
  bps: number
) {
  return callContractMethod({
    contractAddress,
    method: 'function setDefaultRoyaltyInfo(address receiver, uint96 bps)',
    params: [receiver, bps],
  });
}

export async function setPlatformFees(
  contractAddress: string,
  receiver: string,
  bps: number
) {
  return callContractMethod({
    contractAddress,
    method: 'function setPlatformFees(address receiver, uint96 bps)',
    params: [receiver, bps],
  });
}

export async function withdraw(
  contractAddress: string,
  to: string,
  amount: string
) {
  return callContractMethod({
    contractAddress,
    method: 'function withdraw(address to, uint256 amount)',
    params: [to, toWei(amount)],
  });
}