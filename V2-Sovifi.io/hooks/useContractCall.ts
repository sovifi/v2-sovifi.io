'use client';

import { useState } from 'react';
import { callContractMethod } from '@/lib/contractUtils';

interface ContractCallState {
  isLoading: boolean;
  error: Error | null;
  hash: string | null;
}

export function useContractCall() {
  const [state, setState] = useState<ContractCallState>({
    isLoading: false,
    error: null,
    hash: null,
  });

  const execute = async (
    contractAddress: string,
    method: string,
    params: any[]
  ) => {
    setState({ isLoading: true, error: null, hash: null });

    try {
      const result = await callContractMethod({
        contractAddress,
        method,
        params,
      });

      if (result) {
        setState({
          isLoading: false,
          error: null,
          hash: result.transactionHash,
        });
        return result;
      }
      return null;
    } catch (error) {
      setState({
        isLoading: false,
        error: error as Error,
        hash: null,
      });
      return null;
    }
  };

  return {
    ...state,
    execute,
  };
}