export const CONTRACT_FEES = {
  PLATFORM_FEE_PERCENTAGE: 2.5, // 2.5%
  ROYALTY_SPLITS: {
    ARTIST: 7.5, // 7.5% to artist
    PLATFORM: 3.0, // 3% to platform
  },
} as const;

export type ClaimPhaseType = 'PUBLIC' | 'PUBLIC_WITH_ALLOWLIST' | 'ALLOWLIST_ONLY' | 'OWNER_ONLY';

export const CLAIM_PHASE_TYPES: Record<string, ClaimPhaseType> = {
  'Public Sale': 'PUBLIC',
  'Public Sale with Allowlist': 'PUBLIC_WITH_ALLOWLIST',
  'Allowlist Only': 'ALLOWLIST_ONLY',
  'Owner Only': 'OWNER_ONLY',
} as const;

export const PHASE_DESCRIPTIONS = {
  PUBLIC: 'Open minting for everyone at a fixed price.',
  PUBLIC_WITH_ALLOWLIST: 'Public minting with special privileges for allowlisted wallets.',
  ALLOWLIST_ONLY: 'Restricted minting only for pre-approved wallets.',
  OWNER_ONLY: 'Exclusive minting rights for the contract owner.',
} as const;