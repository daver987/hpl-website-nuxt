export interface SalesTax {
  id: number
  created_at: Date
  updated_at: Date
  tax_name: string
  amount: number
  region: string
  is_active: boolean
}

export interface Vehicle {
  value: number
  created_at: Date
  updated_at: Date
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

export interface Service {
  value: number
  created_at: Date
  updated_at: Date
  label: string
  is_active: boolean
  is_hourly: boolean
  limo_anywhere_id: number
}

export interface Trip {
  id: string
  created_at: Date
  updated_at: Date
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
  notes?: string
  quote_number: number
}

export interface User {
  id: string
  created_at: Date
  updated_at: Date
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  stripe_customer_id?: string | null
  is_customer: boolean
  account_id?: string | null
  notes?: string | null
  meta_data?: any
}

export interface Quote {
  quote_number: number
  created_at: Date
  updated_at: Date
  selected_hours?: number | null
  selected_passengers: number
  pickup_date: number
  pickup_time: number
  return_date?: number | null
  return_time?: number | null
  is_round_trip: boolean
  is_booked: boolean
  base_rate: number
  line_items_total: number
  tax_amount: number
  total_price: number
  session_id?: string | null
  user_id: string
  service_id: number
  vehicle_id: number
  sales_tax_id: number
  sales_tax: SalesTax
  vehicle: Vehicle
  service: Service
  trips: Trip[]
  user: User
}
