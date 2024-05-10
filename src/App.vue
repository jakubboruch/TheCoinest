<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDebouncedRef } from '@/composables/useDebounceRef'
import { useParsedText } from '@/composables/useParsedText'

const inputText = useDebouncedRef('', 500, true);
const { parseInputText, outputText, fetchCoins, coins: apiData, loading, error } = useParsedText(inputText);
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
  error.value = '';
  parseInputText();
}

init();

watch(inputText, () => {
  init();
})

</script>

<template>
  <div class='the-coinest'>
    <div class='the-coinest__content'>
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
    <div class='the-coinest__error'>
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-coinest {
  display: flex;
  height: 100%;
  flex-direction: column;
  &__content {
    display: flex;
    width: 100%;
    height: calc(100% - 100px);
  }
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
    padding: 12px;
    &:focus, &:active {
      border: 1px solid green;
    }
  }
  &__error {
    padding: 24px;
    color: darkred;
    font-weight: bold;
  }
}
</style>
