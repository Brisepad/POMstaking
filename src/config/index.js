import BigNumber from "bignumber.js/bignumber";
import { BIG_TEN } from "../utils/bigNumber";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 13;

// CAKE_PER_BLOCK details
// 40 BRIS is minted per block
// 20 BRIS per block is sent to Burn pool (A farm just for burning cake)
// 10 BRIS per block goes to BRIS syrup pool
// 10 BRIS per block goes to Yield farms and lottery
// BRIS_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// BRIS/Block in src/views/Home/components/CakeStats.tsx = 20 (40 - Amount sent to burn pool)

export const BLOCKS_PER_YEAR = new BigNumber(
  (60 / BSC_BLOCK_TIME) * 60 * 24 * 365
); // 10512000
export const BASE_BSC_SCAN_URL = "https://memescan.io";
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const DEFAULT_GAS_LIMIT = 200000;
export const DEFAULT_GAS_PRICE = 5;
export const TESTNET_CHAIN_ID = "97";
export const MAINNET_CHAIN_ID = "18159";
