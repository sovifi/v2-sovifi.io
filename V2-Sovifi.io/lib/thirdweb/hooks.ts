'use client';

import { useState, useEffect } from 'react';
import { getClient } from './client';
import { THIRDWEB_CONFIG } from './config';
import { toast } from 'sonner';

export function useThirdwebClient() {
  const [client] = useState(() => getClient());
  
  useEffect(() => {
    // Validate client setup
    if (!client) {
      toast.error('Failed to initialize Thirdweb client');
    }
  }, [client]);

  return client;
}

export function useThirdwebConfig() {
  return THIRDWEB_CONFIG;
}