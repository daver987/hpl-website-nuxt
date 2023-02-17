import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePriceStore = defineStore('priceStore', () => {
  return {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePriceStore, import.meta.hot))
}
