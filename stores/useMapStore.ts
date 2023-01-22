import { defineStore, acceptHMRUpdate } from 'pinia'

export interface FormOptions {
  label: string
  value: number
}

export const useMapStore = defineStore('useMapStore', {
  state: () => {
    return {
      origin_location: '',
      origin_location_type: '',
      destination_location: '',
      destination_location_type: '',
      distance_traveled: 0,
      duration_traveled: 0,
      origin_address_components: [],
      destination_address_components: [],
      origin_formatted_address: '',
      destination_formatted_address: '',
      origin_place_name: '',
      destination_place_name: '',
      origin_lat: 0,
      origin_lng: 0,
      destination_lat: 0,
      destination_lng: 0,
      base_rate: 0,
      fuel_surcharge: 0,
      gratuity_rate: 0,
      hst: 0,
      total_cost: 0,
      first_name: '',
      last_name: '',
      email_address: '',
      phone_number: '',
      vehicle_image: '',
      pickup_date: '',
      pickup_time: '',
      service_type: undefined as FormOptions,
      vehicle_type: undefined as FormOptions,
      number_of_hours: null as number | null,
      num_passengers: null as any | null,
      is_round_trip: false,
    }
  },
  actions: {
    async zapTest() {
      const { data } = await useFetch('/api/capture', {
        method: 'POST',
        body: {
          origin_address_components: this.origin_address_components,
          destination_address_components: this.destination_address_components,
          origin_formatted_address: this.origin_formatted_address,
          destination_formatted_address: this.destination_formatted_address,
          origin_place_name: this.origin_place_name,
          destination_place_name: this.destination_place_name,
          origin_lat: this.origin_lat,
          origin_lng: this.origin_lng,
          destination_lat: this.destination_lat,
          destination_lng: this.destination_lng,
          firstname: this.first_name,
          lastname: this.last_name,
          email: this.email_address,
          phone: this.phone_number,
          pick_up_date: this.pickup_date,
          pick_up_time: this.pickup_time,
          service_type: this.service_type.label,
          vehicle_type: this.vehicle_type.label,
          number_of_hours: this.number_of_hours.label,
          num_passengers: this.num_passengers,
          is_round_trip: this.is_round_trip,
          vehicle_image: this.vehicle_image,
          total_cost: this.total_cost,
          base_rate: this.base_rate,
          fuel_surcharge: this.fuel_surcharge,
          gratuity_rate: this.gratuity_rate,
          hst: this.hst,
        },
      })
      console.log(data.value)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}
