import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    hplUserId: '' as string | null,
    first_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
    stripe_customer_id: null as string | null,
  }),
  getters: {
    //
  },
  actions: {
    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
