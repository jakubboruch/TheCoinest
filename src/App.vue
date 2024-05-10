<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDebouncedRef } from '@/composables/useDebounceRef'
import { useCoinData } from '@/composables/useCoinData'
import { useParsedText } from '@/composables/useParsedText'

const inputText = useDebouncedRef('', 500, true);
const { fetchCoins, coins: apiData, loading } = useCoinData();
const { parseInputText, outputText } = useParsedText(inputText, apiData);
const outputContent = computed(() => loading.value ? 'Loading...' : outputText.value)

const setApiData = async () => {
  if (inputText.value.length) {
    await fetchCoins();
  }
}

const init = async () => {
  if (!apiData.value?.length) {
    await setApiData();
  }
  parseInputText();
}

init();

watch(inputText, async () => {
  init();
})

</script>

<template>
  <div class='the-coinest'>
    <div class='the-coinest__input-area'>
      <h1 class='the-coinest__headline'>Input</h1>
      <textarea v-model="inputText" class='the-coinest__input-text'>
      </textarea>
    </div>
    <div class='the-coinest__separator'>›</div>
    <div class='the-coinest__output-area'>
      <h1 class='the-coinest__headline'>Output</h1>
      <textarea v-model="outputContent" class='the-coinest__output-text'>
      </textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-coinest {
  display: flex;
  height: 100%;
  &__separator {
    display: flex;
    align-items: center;
    font-size: 48px;
  }
  &__input-area, &__output-area {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__input-text, &__output-text {
    width: calc(100% - 24px);
    height: calc(100% - 100px);
    border: 1px solid gray;
    border-radius: 0;
    outline: none;
    &:focus, &:active {
      border: 1px solid green;
    }
  }
}
</style>
