import http from "@/api/http";
import type { Coin, Ticker } from "@/interfaces/backendResponses";
import type { AxiosResponse } from 'axios';
import { ref } from 'vue'
import type { Ref } from 'vue'

enum COINS_ENDPOINTS {
  coins = '/coins',
  tickers = '/tickers'
}

export function useCoinData() {
  const coins: Ref<Coin[] | null> = ref(null);
  const ticker: Ref<Ticker | null> = ref(null);
  const error: Ref<unknown> = ref(null);
  const loading = ref(false);

  const fetchCoins = async (): Promise<void> => {
    loading.value = true;
    try {
      const response: AxiosResponse<Coin[]> = await http.get(COINS_ENDPOINTS.coins);
      coins.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  const fetchTicker = async (id: string | undefined): Promise<Ticker | undefined> => {
    loading.value = true;
    if (id === undefined) {
      return undefined;
    }
    try {
      const response: AxiosResponse<Ticker> = await http.get(`${COINS_ENDPOINTS.tickers}/${id}`);
      ticker.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  return { coins, loading, ticker, error, fetchCoins, fetchTicker };
}