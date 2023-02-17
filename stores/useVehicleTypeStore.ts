import { acceptHMRUpdate, defineStore } from 'pinia'
import { VehicleType } from '~/schema/vehicleType'

export const useVehicleTypeStore = defineStore('vehicleTypeStore', () => {
  const vehicleTypes = ref<VehicleType[] | null>(null)

  const getVehicleTypes = async () => {
    try {
      const { data: vehicleTypesData } = await useFetch(
        '/api/get-vehicle-types'
      )
      // @ts-ignore
      vehicleTypes.value = vehicleTypesData.value
      return vehicleTypesData.value
    } catch (error) {
      alert(error)
    }
  }
  return {
    vehicleTypes,
    getVehicleTypes,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleTypeStore, import.meta.hot))
}
