import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStripeStore = defineStore({
  id: 'stripeStore',

  state: () => ({
    customer: {},
    session: {},
    client_secret: '',
  }),

  actions: {
    setCustomer(items: any) {
      this.customer = items
      console.log('Set Customer Fired')
    },
    setSession(item: any) {
      this.session = item
      console.log('Set Session Fired')
    },
    setClientSecret(intent: any) {
      this.client_secret = intent.client_secret
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStripeStore, import.meta.hot))
}
