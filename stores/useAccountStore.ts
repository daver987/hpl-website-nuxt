import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAccountStore = defineStore({
  id: 'accounts',
  state: () => {
    return {
      rows: [],
      loading: false,
      accounts: null,
    }
  },
  actions: {
    async getAccounts() {
      try {
        const data = await $fetch('/api/get-accounts')
        this.loading = true
        this.accounts = data
        console.log('accounts', this.accounts)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
