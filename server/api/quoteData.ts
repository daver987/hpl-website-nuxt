export type Line_items_list = {
  id: number
  label: string
  total: number
  amount: number
  is_active: boolean
  created_at: string
  is_taxable: boolean
  updated_at: string
  description?: any
  is_percentage: boolean
}

export type User = {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  stripe_customer_id: string
  is_customer: boolean
  account_id?: any
  notes?: any
  meta_data?: any
}

export type Trips = {
  id: string
  created_at: string
  updated_at: string
  origin_lat: number
  origin_lng: number
  origin_name: string
  origin_formatted_address: string
  origin_full_name: string
  origin_types: string[]
  origin_place_id: string
  destination_lat: number
  destination_lng: number
  destination_name: string
  destination_formatted_address: string
  destination_full_name: string
  destination_types: string[]
  destination_place_id: string
  distance: number
  is_return: boolean
  notes?: any
  quote_number: number
}

export type Service = {
  value: number
  created_at: string
  updated_at: string
  label: string
  is_active: boolean
  is_hourly: boolean
  limo_anywhere_id: number
}

export type Vehicle = {
  value: number
  created_at: string
  updated_at: string
  max_passengers: number
  max_luggage: number
  per_km: number
  per_hour: number
  min_hours: number
  min_distance: number
  min_rate: number
  is_active: boolean
  label: string
  limo_anywhere_id: number
  vehicle_image: string
}

export type Line_items = {
  id: string
  created_at: string
  updated_at: string
  label: string
  description?: any
  is_percentage: boolean
  is_taxable: boolean
  is_active: boolean
  amount: number
}

export type QuoteData = {
  quote_number: number
  created_at: string
  updated_at: string
  selected_hours?: any
  selected_passengers: number
  pickup_date: number
  pickup_time: number
  return_date?: any
  return_time?: any
  is_round_trip: boolean
  is_booked: boolean
  base_rate: number
  line_items_total: number
  tax_amount: number
  total_price: number
  line_items_list: Line_items_list[]
  session_id?: any
  user_id: string
  service_id: number
  vehicle_id: number
  sales_tax_id: number
  user: User
  trips: Trips[]
  service: Service
  vehicle: Vehicle
  line_items: Line_items[]
}

export type quoteData = {
  quoteData: QuoteData
}
