import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore('quoteStore', () => {
  const quote = useStorageAsync('quote_data', {})
  const quote_number = useStorageAsync('quote_number', 2455)
  const quoteNumberLatest = ref<number | null>(2455)

  const getQuoteSingle = async () => {
    try {
      const { data: quoteData } = await useFetch('/api/get-quote-single', {
        query: { quote_number: 2562 },
      })
      console.log('Single Quote:', quoteData.value)
      quote.value = quoteData.value
      return quote.value
    } catch (error) {
      alert(error)
    }
  }

  const getQuoteNumberLatest = async () => {
    try {
      const { data: quoteNumber } = await useFetch('/api/get-quotenumber')
      console.log('Latest Quote Number:', quoteNumber.value)
      quoteNumberLatest.value = quoteNumber.value
      return quoteNumber
    } catch (error) {
      alert(error)
    }
  }

  return {
    getQuoteNumberLatest,
    getQuoteSingle,
    quoteNumberLatest,
    quote,
    quote_number,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
