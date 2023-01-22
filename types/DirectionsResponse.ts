export interface DirectionsResponse {
  distanceText: string
  distanceValue: number
  durationText: string
  durationValue: number
  endLat: number
  endLng: number
  startLat: number
  startLng: number
}

export interface Place {
  place_id: string
  formatted_address: string
  name: string
  types: string[]
  isPearsonAirportOrigin?: boolean
  isPearsonAirportDestination?: boolean
}
