import { defineStore, acceptHMRUpdate } from 'pinia'

export const useContactsStore = defineStore({
  id: 'contacts',
  state: () => {
    return {
      loading: false,
      contacts: null,
    }
  },
  actions: {
    async getContacts() {
      try {
        const data = await $fetch('/api/get-contacts')
        this.loading = true
        this.contacts = data
        console.log('contacts', this.contacts)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactsStore, import.meta.hot))
}
