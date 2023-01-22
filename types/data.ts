import { z } from 'zod'

export type SelectedServiceType = {
  label: string
  value: number
}

export type SelectedVehicleType = {
  label: string
  value: number
}

export type SelectedNumberOfHours = {
  label: string
  value: number
}

export type SelectedPassengers = {
  label: string
  value: number
}

export const tripDataSchema = z.object({
  distanceValue: z.number(),
  distanceText: z.string(),
  durationValue: z.number(),
  durationText: z.string(),
  startLat: z.number(),
  startLng: z.number(),
  endLat: z.number(),
  endLng: z.number(),
})

export type TripData = z.infer<typeof tripDataSchema>

export const placeDataSchema = z
  .object({
    formatted_address: z.string(),
    name: z.string(),
    place_id: z.string(),
    types: z.array(z.string()),
    isPearsonAirportOrigin: z.boolean().optional(),
    isPearsonAirportDestination: z.boolean().optional(),
  })
  .strip()

export type PlaceData = z.infer<typeof placeDataSchema>

export type PlaceDataOrigin = {
  formatted_address: string
  name: string
  place_id: string
  types: string[]
  isPearsonAirportOrigin?: boolean
  isPearsonAirportDestination?: boolean
}

export type PlaceDataDestination = {
  formatted_address: string
  name: string
  place_id: string
  types: string[]
}

export type Data = {
  pickupDate: string
  pickupTime: string
  returnPickupDate: string
  returnPickupTime: string
  selectedServiceType: SelectedServiceType
  selectedVehicleType: SelectedVehicleType
  selectedNumberOfHours: SelectedNumberOfHours
  selectedPassengers: SelectedPassengers
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  isRoundTrip: boolean
  isItHourly: boolean
  tripData: TripData
  placeDataOrigin: PlaceDataOrigin
  placeDataDestination: PlaceDataDestination
  calculatedDistance: number
}

export type data = {
  success: boolean
  data: Data
}
