import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'data',

  state: () => ({
    vehicleTypes: [],
    serviceTypes: [],
    lineItems: [],
    salesTaxes: [],
  }),

  actions: {
    setVehicleTypes(vehicles: any) {
      this.vehicleTypes = vehicles
    },
    setServiceTypes(services: any) {
      this.serviceTypes = services
    },
    setLineItems(items: any) {
      this.lineItems = items
    },
    setSalesTaxes(taxes: any) {
      this.salesTaxes = taxes
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
