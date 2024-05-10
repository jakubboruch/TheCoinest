import type { Coin } from './backendResponses';

export interface CoinExtended extends Coin {
  price?: string;
}

export interface CoinState {
  [key: string]: Partial<CoinExtended> | undefined;
}
