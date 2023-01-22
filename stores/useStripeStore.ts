import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStripeStore = defineStore('useStripeStore', {
  state: () => ({
    customerId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
  }),
  getters: {
    //
  },
  actions: {
    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStripeStore, import.meta.hot))
}
