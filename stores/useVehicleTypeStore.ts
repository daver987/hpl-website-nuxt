import { acceptHMRUpdate, defineStore } from 'pinia'
import { VehicleType, vehicleTypeSchema } from '~/schema/vehicleType'

export const useVehicleTypeStore = defineStore({
  id: 'vehicleTypeStore',
  state: () => {
    return {
      loading: false,
      vehicleTypes: <VehicleType[] | null>null,
    }
  },
  actions: {
    async getVehicleTypes() {
      try {
        this.vehicleTypes = await $fetch('/api/get-vehicle-type')
        vehicleTypeSchema.safeParse(this.vehicleTypes[0])
        console.log('Vehicle Types:', this.vehicleTypes)
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleTypeStore, import.meta.hot))
}
