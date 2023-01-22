export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      quote_number: {
        Row: {
          created_at: string | null
          id: number
          latest_quote_number: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          latest_quote_number?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          latest_quote_number?: number | null
        }
      }
      quotes: {
        Row: {
          addedToCart: boolean
          baseRate: number
          calculatedDistance: number
          createdAt: string
          destinationFormattedAddress: string
          destinationName: string
          destinationPlaceId: string
          distanceText: string
          distanceValue: number
          durationText: string
          durationValue: number
          endLat: number
          endLng: number
          firstName: string
          fuelSurcharge: number
          gratuity: number
          hoursLabel: string
          hoursValue: number
          HST: number
          id: string
          isBooked: boolean
          isItHourly: boolean
          isPearsonAirportDropoff: boolean
          isPearsonAirportPickup: boolean
          isRoundTrip: boolean
          lastName: string
          originFormattedAddress: string
          originName: string
          originPlaceId: string
          passengersLabel: string
          passengersValue: number
          pickupDate: string
          pickupTime: string
          quote_number: number
          returnDate: string | null
          returnTime: string | null
          serviceTypeLabel: string
          serviceTypeValue: number
          startLat: number
          startLng: number
          totalFare: number
          updatedAt: string
          userEmail: string
          userId: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Insert: {
          addedToCart?: boolean
          baseRate: number
          calculatedDistance: number
          createdAt?: string
          destinationFormattedAddress: string
          destinationName: string
          destinationPlaceId: string
          distanceText: string
          distanceValue: number
          durationText: string
          durationValue: number
          endLat: number
          endLng: number
          firstName: string
          fuelSurcharge: number
          gratuity: number
          hoursLabel: string
          hoursValue?: number
          HST: number
          id?: string
          isBooked?: boolean
          isItHourly?: boolean
          isPearsonAirportDropoff?: boolean
          isPearsonAirportPickup?: boolean
          isRoundTrip?: boolean
          lastName: string
          originFormattedAddress: string
          originName: string
          originPlaceId: string
          passengersLabel?: string
          passengersValue?: number
          pickupDate: string
          pickupTime: string
          quote_number: number
          returnDate?: string | null
          returnTime?: string | null
          serviceTypeLabel: string
          serviceTypeValue: number
          startLat: number
          startLng: number
          totalFare: number
          updatedAt?: string
          userEmail: string
          userId?: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Update: {
          addedToCart?: boolean
          baseRate?: number
          calculatedDistance?: number
          createdAt?: string
          destinationFormattedAddress?: string
          destinationName?: string
          destinationPlaceId?: string
          distanceText?: string
          distanceValue?: number
          durationText?: string
          durationValue?: number
          endLat?: number
          endLng?: number
          firstName?: string
          fuelSurcharge?: number
          gratuity?: number
          hoursLabel?: string
          hoursValue?: number
          HST?: number
          id?: string
          isBooked?: boolean
          isItHourly?: boolean
          isPearsonAirportDropoff?: boolean
          isPearsonAirportPickup?: boolean
          isRoundTrip?: boolean
          lastName?: string
          originFormattedAddress?: string
          originName?: string
          originPlaceId?: string
          passengersLabel?: string
          passengersValue?: number
          pickupDate?: string
          pickupTime?: string
          quote_number?: number
          returnDate?: string | null
          returnTime?: string | null
          serviceTypeLabel?: string
          serviceTypeValue?: number
          startLat?: number
          startLng?: number
          totalFare?: number
          updatedAt?: string
          userEmail?: string
          userId?: string | null
          vehicleTypeLabel?: string
          vehicleTypeValue?: number
        }
      }
      service_type: {
        Row: {
          created_at: string | null
          id: number
          isDisabled: boolean | null
          label: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          isDisabled?: boolean | null
          label?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          isDisabled?: boolean | null
          label?: string | null
          value?: number | null
        }
      }
      surcharges: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          is_flat: boolean | null
          is_percentage: boolean | null
          is_tax: boolean | null
          is_taxable: boolean | null
          name: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_flat?: boolean | null
          is_percentage?: boolean | null
          is_tax?: boolean | null
          is_taxable?: boolean | null
          name?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_flat?: boolean | null
          is_percentage?: boolean | null
          is_tax?: boolean | null
          is_taxable?: boolean | null
          name?: string | null
        }
      }
      user: {
        Row: {
          createdAt: string
          emailAddress: string
          firstName: string
          id: string
          isCustomer: boolean
          lastName: string
          phoneNumber: string
          stripe_customer_id: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          emailAddress: string
          firstName: string
          id?: string
          isCustomer?: boolean
          lastName: string
          phoneNumber: string
          stripe_customer_id?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          emailAddress?: string
          firstName?: string
          id?: string
          isCustomer?: boolean
          lastName?: string
          phoneNumber?: string
          stripe_customer_id?: string | null
          updatedAt?: string
        }
      }
      vehicle_type: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          isDisabled: boolean | null
          label: string | null
          max_luggage: number | null
          max_passengers: number | null
          min_distance: number | null
          min_hours_hourly: number | null
          min_rate_distance: number | null
          min_rate_hourly: number | null
          name: string | null
          per_hour: number | null
          per_km: number | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          isDisabled?: boolean | null
          label?: string | null
          max_luggage?: number | null
          max_passengers?: number | null
          min_distance?: number | null
          min_hours_hourly?: number | null
          min_rate_distance?: number | null
          min_rate_hourly?: number | null
          name?: string | null
          per_hour?: number | null
          per_km?: number | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          isDisabled?: boolean | null
          label?: string | null
          max_luggage?: number | null
          max_passengers?: number | null
          min_distance?: number | null
          min_hours_hourly?: number | null
          min_rate_distance?: number | null
          min_rate_hourly?: number | null
          name?: string | null
          per_hour?: number | null
          per_km?: number | null
          value?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_new_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
