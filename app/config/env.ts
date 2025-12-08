/**
 * Environment Configuration
 *
 * Public constants that are safe to expose in frontend code
 */

// Contract Addresses (on-chain public data)
export const CONTRACT_ADDRESSES = {
  XOC_MIGRATE: '0x4FCC87E8f71B766A234418E04a05b1A3DEe80A6F',
  XOC_RELEASE: '0xCB741e27f9C3742636fa8474a981b702FCE6602E',
  XOC_TEAM_RELEASE: '0x1b553A9B5C47F55F1777f024CaB3038ddbF89c0e',
  WXOC: '0x8e1a838EAfdB267542F2d04ef628f9bed7E5748B',
} as const;

// Chain IDs
export const CHAIN_IDS = {
  TEST: 33772211,
  MAIN: 3721,
} as const;

// RPC URLs (public endpoints)
export const RPC_URLS = {
  TEST: 'https://rpc-testnet.xone.plus',
  MAIN: 'https://rpc.xone.org',
} as const;

// Block Explorer
export const BLOCK_EXPLORER = 'https://www.xonescan.com';

// Developer Portal
export const DEVELOPER_URL = 'https://developer.tokenup.org';

// Environment-specific variables (hardcoded for production deployment)
export const API_BASE_URL = 'https://bvi-api.xone.org/api';
export const LUMA_API_KEY = 'secret-Jh5voSAViEwur1Hj2X9Jq8dmi';

// Legacy export for backward compatibility
export const ENV = {
  // Contracts
  XOC_MIGRATE_ADDRESS: CONTRACT_ADDRESSES.XOC_MIGRATE,
  XOC_RELEASE_ADDRESS: CONTRACT_ADDRESSES.XOC_RELEASE,
  XOC_TEAM_RELEASE_ADDRESS: CONTRACT_ADDRESSES.XOC_TEAM_RELEASE,
  WXOC_ADDRESS: CONTRACT_ADDRESSES.WXOC,

  // Chain IDs
  TEST_CHAIN_ID: CHAIN_IDS.TEST,
  MAIN_CHAIN_ID: CHAIN_IDS.MAIN,

  // RPC URLs
  TEST_RPC_URL: RPC_URLS.TEST,
  MAIN_RPC_URL: RPC_URLS.MAIN,

  // URLs
  BLOCK_EXPLORER,
  DEVELOPER_URL,

  // API
  BASE_URL: API_BASE_URL,
  LUMA_API_KEY,
} as const;
