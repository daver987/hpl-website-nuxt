import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStripeStore = defineStore('useStripeStore', () => {})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStripeStore, import.meta.hot))
}
