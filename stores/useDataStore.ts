import { acceptHMRUpdate, defineStore } from 'pinia'
import { Vehicle } from '~/schema/vehicleSchema'
import { Service } from '~/schema/serviceSchema'
import { LineItem } from '~/schema/lineItemSchema'
import { SalesTax } from '~/schema/salexTaxSchema'

export const useDataStore = defineStore({
  id: 'data',

  state: () => ({
    vehicleTypes: [] as Vehicle[],
    serviceTypes: [] as Service[],
    lineItems: [] as LineItem[],
    salesTaxes: [] as SalesTax[],
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
