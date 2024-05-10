import { ref, reactive } from 'vue';
import http from '@/api/http'
import { METHODS, SEPARATOR } from '@/enums/base.enum';
import { COINS_ENDPOINTS } from '@/enums/endpoints.enum';
import type { Ref } from 'vue';
import type { Coin, Currency } from '@/interfaces/backendResponses';
import type { CoinState } from '@/interfaces/coinState';
import type { Ticker } from '@/interfaces/backendResponses';
import type { AxiosResponse } from 'axios';



const re = /\{\{(.+?)\}\}/g;

export function useParsedText(inputText: Ref<string>) {
  const coins: Ref<Coin[] | null> = ref(null);
  const ticker: Ref<Ticker | null> = ref(null);
  const error: Ref<unknown> = ref(null);
  const loading = ref(false);
  const outputText = ref('');
  const state: CoinState = reactive({})

  const fetchCoins = async (): Promise<void> => {
    try {
      loading.value = true;
      const response: AxiosResponse<Coin[]> = await http.get(COINS_ENDPOINTS.coins);
      coins.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  const fetchTicker = async (id: string | undefined): Promise<Ticker | undefined> => {
    if (id === undefined) {
      return undefined;
    }
    try {
      loading.value = true;
      const response: AxiosResponse<Ticker> = await http.get(`${COINS_ENDPOINTS.tickers}/${id}`);
      ticker.value = response.data;
    } catch (e: any) {
      error.value = e?.response?.data?.error ?? e;
    } finally {
      loading.value = false;
    }
  }

  const getReplacement = async (...params: string[]) => {
    switch(params[0]) {
      case METHODS.Name:
        return getName(params[1]);
      case METHODS.Price:
        return await getPrice(params[1]);
      default:
        return undefined;
    }
  }

  const getName = (symbol: string): string | undefined => {
    if (!state[symbol]?.name) {
      state[symbol] = (coins.value || []).find((coin: Coin) => coin.symbol === symbol);
    }
    return state[symbol]?.name;
  }

  const getPrice = async (symbol: string, currency: Currency = 'USD'): Promise<string | undefined> => {
    if (!state[symbol]) {
      state[symbol] = {};
    }
    if (state[symbol] && !state[symbol]?.price) {
      const coin: Coin | undefined = (coins.value || []).find((coin: Coin) => coin.symbol === symbol);
      const id = coin?.id;
      await fetchTicker(id);
      if (ticker.value?.quotes[currency]?.price) {
        state[symbol]!.price = ticker.value?.quotes[currency]?.price ? `${ticker.value?.quotes[currency]?.price} ${currency}` : undefined;
        ticker.value = null;
      }
    }
    return state[symbol]?.price;
  }

  const parseInputText = async (): Promise<void> => {
    const dataPromises: Promise<string | undefined>[] = [];
    let counter = 0;
    const matchLength = inputText.value.match(re)?.length ?? 0;
    if (!matchLength) {
      outputText.value = inputText.value;
    }
    inputText.value.replace(re, (match: string, code: string): string => {
      const codeSplit = code.trim().split(SEPARATOR.Default);
      dataPromises.push(getReplacement(...codeSplit));
      return '';
    });
    const results = await Promise.all(dataPromises);
    outputText.value = inputText.value.replace(re, (match: string) => {
      return results[counter++] ?? match;
    });
  }

  return { parseInputText, outputText, state, fetchCoins, fetchTicker, coins, loading, ticker, error };
}