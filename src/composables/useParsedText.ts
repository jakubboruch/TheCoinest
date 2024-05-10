import { ref, reactive } from 'vue';
import { Methods, Separator } from '@/enums/base.enum'
import { useCoinData } from '@/composables/useCoinData'
import type { Ref } from 'vue';
import type { Coin, Currency } from '@/interfaces/backendResponses'
import type { CoinState } from '@/interfaces/coinState'

const re = /\{\{(.+?)\}\}/g;

export function useParsedText(inputText: Ref<string>, apiData: Ref<Coin[] | null>) {
  const { fetchTicker, ticker } = useCoinData();
  const outputText = ref('');
  const state: CoinState = reactive({})

  const getReplacement = async (...params: string[]) => {
    switch(params[0]) {
      case Methods.Name:
        return getName(params[1]);
      case Methods.Price:
        return await getPrice(params[1]);
      default:
        return undefined;
    }
  }

  const getName = (symbol: string): string | undefined => {
    if (!state[symbol]?.name) {
      state[symbol] = (apiData.value || []).find((coin: Coin) => coin.symbol === symbol);
    }
    return state[symbol]?.name;
  }

  const getPrice = async (symbol: string, currency: Currency = 'USD'): Promise<string | undefined> => {
    if (!state[symbol]) {
      state[symbol] = {};
    }
    if (state[symbol] && !state[symbol]?.price) {
      const coin: Coin | undefined = (apiData.value || []).find((coin: Coin) => coin.symbol === symbol);
      const id = coin?.id;
      await fetchTicker(id);
      state[symbol]!.price = ticker.value?.quotes[currency]?.price ? `${ticker.value?.quotes[currency]?.price} ${currency}` : undefined;

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
      const codeSplit = code.trim().split(Separator.Default);
      dataPromises.push(getReplacement(...codeSplit));
      return '';
    });
    const results = await Promise.all(dataPromises);
    outputText.value = inputText.value.replace(re, (match: string) => {
      return results[counter++] ?? match;
    });
  }

  return { parseInputText, outputText, state };
}