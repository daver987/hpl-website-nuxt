import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore({
  id: 'quoteStore',

  state: () => ({
    userQuoteData: null as null | unknown,
    isRoundTrip: false,
  }),

  actions: {
    setQuoteData(quote: any) {
      this.userQuoteData = quote
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
