export type PhaseType = 'PUBLIC' | 'PUBLIC_WITH_ALLOWLIST' | 'ALLOWLIST_ONLY' | 'ONLY_OWNER';

export interface ClaimPhase {
  type: PhaseType;
  name: string;
  startDate: Date;
  maxClaimableSupply: number | 'unlimited';
  maxClaimablePerWallet: number | 'unlimited';
  price: string;
  currency: string;
  allowlist?: string[];
  creatorAddress?: string;
}

export const PHASE_TYPES: { value: PhaseType; label: string; description: string }[] = [
  {
    value: 'PUBLIC',
    label: 'Public',
    description: 'Allow any wallet to claim this drop during this claim phase.',
  },
  {
    value: 'PUBLIC_WITH_ALLOWLIST',
    label: 'Public (With Allowlist)',
    description: 'Public minting with special benefits for allowlisted wallets.',
  },
  {
    value: 'ALLOWLIST_ONLY',
    label: 'Allowlist Only',
    description: 'Restricted minting only for pre-approved wallets.',
  },
  {
    value: 'ONLY_OWNER',
    label: 'Only Owner',
    description: 'Exclusive minting rights for the contract owner.',
  },
];