import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore('quoteStore', {
  state: () => {
    return {
      loading: false,
      quote: <any | null>null,
      quote_number: <string | number | null>2455,
      quoteNumberLatest: <number | null>2455,
    }
  },
  actions: {
    async getQuoteSingle() {
      try {
        const data = await $fetch('/api/get-quote-single', {
          query: { quote_number: this.quote_number },
        })
        console.log('Single Quote:', data)
        this.quote = data
        return data
      } catch (error) {
        alert(error)
      }
    },
    async getQuoteNumberLatest() {
      try {
        const data = await $fetch('/api/get-quotenumber')
        console.log('Latest Quote Number:', this.quoteNumberLatest)
        this.quoteNumberLatest = data
        return data
      } catch (error) {
        alert(error)
      }
    },
    getters: {},
  },
})

if (import.meta.hot) {
  //@ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
