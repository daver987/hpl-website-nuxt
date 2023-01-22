export interface Rates {
  id: number
  name: string
  per_km: number
  per_hour: number
  min_hours_hourly: number
  min_rate_hourly: number
  min_distance: number
  min_rate_distance: number
  vehicle_image_alt: string
  vehicle_image_src: string
}

export interface Surcharges {
  fuelSurcharge: number
  gratuity: number
  HST: number
}
