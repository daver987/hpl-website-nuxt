import { defineStore, acceptHMRUpdate } from 'pinia'
import { Quote } from '~/schema/quote'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => ({
    quoteNumber: 0 as number | string | null,
    isRoundTrip: false,
    quoteData: {} as Quote | null,
  }),
  getters: {
    //
  },
  actions: {
    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
