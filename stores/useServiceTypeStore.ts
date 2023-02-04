import { acceptHMRUpdate, defineStore } from 'pinia'

export const useServiceTypeStore = defineStore({
  id: 'serviceTypeStore',
  state: () => {
    return {
      loading: false,
      serviceTypes: [],
    }
  },
  actions: {
    async getServiceTypes() {
      try {
        this.serviceTypes = await $fetch('/api/get-service-type')
        console.log('Vehicle Types:', this.serviceTypes)
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useServiceTypeStore, import.meta.hot))
}
