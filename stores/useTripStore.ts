import { acceptHMRUpdate, defineStore } from 'pinia'
import { Place } from '~/types/DirectionsResponse'

export const useTripStore = defineStore('tripStore', () => {
  const origin = ref<Place | null>(null)
  const destination = ref<Place | null>(null)
  const tripData = ref({})

  const formattedOrigin = computed(() => {
    return origin.value
      ? formatAddress(origin.value.name, origin.value.formatted_address)
      : origin.value
  })

  const formattedDestination = computed(() => {
    return destination.value
      ? formatAddress(
        destination.value.name,
        destination.value.formatted_address
      )
      : destination.value
  })

  function formatAddress(name: string, address: string) {
    return address.includes(name) ? address : `${name}, ${address}`
  }

  return {
    origin,
    formattedOrigin,
    destination,
    formattedDestination,
    tripData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTripStore, import.meta.hot))
}
