import { acceptHMRUpdate, defineStore } from 'pinia'
import { Quote } from '~/server/api/quote.get'

export const useQuoteStore = defineStore({
  id: 'quoteStore',

  state: () => ({
    quote: {} as Quote,
  }),

  actions: {
    setQuote(items: any) {
      this.quote = items.quote.data
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
