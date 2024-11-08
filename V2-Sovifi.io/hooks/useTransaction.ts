'use client';

import { useState } from 'react';
import { sendTransaction, transferTokens } from '@/lib/transactionUtils';

interface TransactionState {
  isLoading: boolean;
  error: Error | null;
  hash: string | null;
}

export function useTransaction() {
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    hash: null,
  });

  const execute = async (
    contractAddress: string,
    functionName: string,
    args?: any[],
    value?: string
  ) => {
    setState({ isLoading: true, error: null, hash: null });

    try {
      const result = await sendTransaction({
        contractAddress,
        functionName,
        args,
        value,
      });

      if (result) {
        setState({
          isLoading: false,
          error: null,
          hash: result.transactionHash,
        });
      }

      return result;
    } catch (error) {
      setState({
        isLoading: false,
        error: error as Error,
        hash: null,
      });
      return null;
    }
  };

  const transfer = async (
    contractAddress: string,
    toAddress: string,
    amount: string
  ) => {
    setState({ isLoading: true, error: null, hash: null });

    try {
      const result = await transferTokens(
        contractAddress,
        toAddress,
        amount
      );

      if (result) {
        setState({
          isLoading: false,
          error: null,
          hash: result.transactionHash,
        });
      }

      return result;
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
    transfer,
  };
}