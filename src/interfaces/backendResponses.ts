import type { TDateISO } from './dates';

export type Currency = 'BTC' | 'ETH' | 'USD' | 'EUR' | 'PLN' | 'KRW' | 'GBP' | 'CAD' | 'JPY' | 'RUB' | 'TRY' | 'NZD' | 'AUD' | 'CHF' | 'UAH' | 'HKD' | 'SGD' | 'NGN' | 'PHP' | 'MXN' | 'BRL' | 'THB' | 'CLP' | 'CNY' | 'CZK' | 'DKK' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'MYR' | 'NOK' | 'PKR' | 'SEK' | 'TWD' | 'ZAR' | 'VND' | 'BOB' | 'COP' | 'PEN' | 'ARS' | 'ISK';

interface Base {
  "id": string,
  "name": string,
  "symbol": string,
  "rank": number,
}

interface Coin extends Base {
  "is_new": boolean,
  "is_active": boolean,
  "type": 'coin' | 'token'
}

interface Ticker extends Base {
  "circulating_supply": number,
  "total_supply": number,
  "max_supply": number,
  "beta_value": number,
  "first_data_at": TDateISO,
  "last_updated": TDateISO,
  "quotes": {
    [key in Currency
      ]: {
      "price": number,
      "volume_24h": number,
      "volume_24h_change_24h": number,
      "market_cap": number,
      "market_cap_change_24h": number,
      "percent_change_15m": number,
      "percent_change_30m": number,
      "percent_change_1h": number,
      "percent_change_6h": number,
      "percent_change_12h": number,
      "percent_change_24h": number,
      "percent_change_7d": number,
      "percent_change_30d": number,
      "percent_change_1y": number,
      "ath_price": number | null,
      "ath_date": TDateISO | null,
      "percent_from_price_ath": number | null
    }
  }
}
export type { Coin, Ticker }