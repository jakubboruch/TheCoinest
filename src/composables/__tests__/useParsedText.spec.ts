import { expect, test } from 'vitest'
import { useParsedText } from '../useParsedText'
import { ref } from 'vue';

const inputText = ref('Test input text {{ Name/BTC }}');

test('Parse Name Marker with provided data', async () => {
  const { parseInputText, outputText, fetchCoins } = useParsedText(inputText);
  await fetchCoins();
  await parseInputText();
  expect(outputText.value).toBe('Test input text Bitcoin');
})

test('Parse Price Marker with provided data', async () => {
  inputText.value = 'Test input text {{ Price/BTC }}'
  const { parseInputText, outputText, state } = useParsedText(inputText);
  state["BTC"] = {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": "AAA.AAA USD"
  }
  await parseInputText();
  expect(outputText.value).toBe('Test input text AAA.AAA USD');
})

test('Parse Price Marker with latest price from API', async () => {
  inputText.value = 'Test input text {{ Price/BTC }}'
  const { parseInputText, outputText, fetchCoins } = useParsedText(inputText);
  await fetchCoins();
  await parseInputText();
  expect(outputText.value.split('Test input text ')[1]).toContain('.');
  expect(outputText.value.split('Test input text ')[1]).toContain('USD');
  expect(outputText.value).not.toBe('Test input text AAA.AAA USD');
})