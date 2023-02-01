import { defineStore, acceptHMRUpdate } from 'pinia'

export const useVehicleTypeStore = defineStore({
  id: 'vehicleTypeStore',
  state: () => {
    return {
      loading: false,
      vehicleTypes: null,
    }
  },
  actions: {
    async getVehicleTypes() {
      try {
        const data = await $fetch('/api/get-vehicle-type')
        this.loading = true
        this.vehicleTypes = data
        console.log('Vehicle Types:', this.vehicleTypes)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleTypeStore, import.meta.hot))
}
