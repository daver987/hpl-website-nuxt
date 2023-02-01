import { defineStore, acceptHMRUpdate } from 'pinia'

export const useServiceTypeStore = defineStore({
  id: 'serviceTypeStore',
  state: () => {
    return {
      loading: false,
      serviceTypes: null,
    }
  },
  actions: {
    async getServiceTypes() {
      try {
        const data = await $fetch('/api/get-service-type')
        this.loading = true
        this.serviceTypes = data
        console.log('Vehicle Types:', this.serviceTypes)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useServiceTypeStore, import.meta.hot))
}
