import { ref, customRef } from 'vue'


const debounce = <T extends (...args: string[]) => void>(fn: T, delay = 0, immediate = false) => {
  let timeout: undefined | number = undefined;
  return (...args: string[]) => {
    if (immediate && !timeout) fn(...args)
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const useDebouncedRef = (initialValue: string, delay: number, immediate: boolean) => {
  const state = ref(initialValue)
  return customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce(
      (value: string) => {
        state.value = value
        trigger()
      },
      delay,
      immediate
    ),
  }))
}

export { useDebouncedRef };