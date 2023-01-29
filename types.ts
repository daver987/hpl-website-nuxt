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
      accounts: {
        Row: {
          company_account_number: number | null
          company_address: string | null
          company_email: string | null
          company_name: string | null
          company_phone: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          company_account_number?: number | null
          company_address?: string | null
          company_email?: string | null
          company_name?: string | null
          company_phone?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          company_account_number?: number | null
          company_address?: string | null
          company_email?: string | null
          company_name?: string | null
          company_phone?: string | null
          created_at?: string | null
          id?: string
        }
      }
      airport_surcharges: {
        Row: {
          airportCode: string | null
          airportName: string | null
          created_at: string | null
          id: number
          isActive: boolean | null
          isTaxable: boolean | null
          surchargeFee: number | null
          surchargeName: string | null
        }
        Insert: {
          airportCode?: string | null
          airportName?: string | null
          created_at?: string | null
          id?: number
          isActive?: boolean | null
          isTaxable?: boolean | null
          surchargeFee?: number | null
          surchargeName?: string | null
        }
        Update: {
          airportCode?: string | null
          airportName?: string | null
          created_at?: string | null
          id?: number
          isActive?: boolean | null
          isTaxable?: boolean | null
          surchargeFee?: number | null
          surchargeName?: string | null
        }
      }
      conversation: {
        Row: {
          created_at: string | null
          creator_id: string | null
          deleted_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: number
          message: string | null
          sender_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          message?: string | null
          sender_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          message?: string | null
          sender_id?: string | null
        }
      }
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
          airportFee: number | null
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
          gclid: string | null
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
          phone_number: string | null
          pickupDate: string
          pickupTime: string
          quote_number: number
          returnDate: string | null
          returnTime: string | null
          roundTripTotal: number | null
          serviceTypeLabel: string
          serviceTypeValue: number
          startLat: number
          startLng: number
          totalFare: number
          updatedAt: string
          userEmail: string
          userId: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Insert: {
          addedToCart?: boolean
          airportFee?: number | null
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
          gclid?: string | null
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
          phone_number?: string | null
          pickupDate: string
          pickupTime: string
          quote_number: number
          returnDate?: string | null
          returnTime?: string | null
          roundTripTotal?: number | null
          serviceTypeLabel: string
          serviceTypeValue: number
          startLat: number
          startLng: number
          totalFare: number
          updatedAt?: string
          userEmail: string
          userId?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Update: {
          addedToCart?: boolean
          airportFee?: number | null
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
          gclid?: string | null
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
          phone_number?: string | null
          pickupDate?: string
          pickupTime?: string
          quote_number?: number
          returnDate?: string | null
          returnTime?: string | null
          roundTripTotal?: number | null
          serviceTypeLabel?: string
          serviceTypeValue?: number
          startLat?: number
          startLng?: number
          totalFare?: number
          updatedAt?: string
          userEmail?: string
          userId?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
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
          limo_anywhere_id: number | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          isDisabled?: boolean | null
          label?: string | null
          limo_anywhere_id?: number | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          isDisabled?: boolean | null
          label?: string | null
          limo_anywhere_id?: number | null
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
      taxes: {
        Row: {
          created_at: string | null
          id: number
          isApplicable: boolean | null
          region: string | null
          taxAmount: number | null
          taxName: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          isApplicable?: boolean | null
          region?: string | null
          taxAmount?: number | null
          taxName?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          isApplicable?: boolean | null
          region?: string | null
          taxAmount?: number | null
          taxName?: string | null
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
          userCookie: string | null
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
          userCookie?: string | null
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
          userCookie?: string | null
        }
      }
      vehicle_type: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          isDisabled: boolean | null
          label: string | null
          limo_anywhere_id: number | null
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
          limo_anywhere_id?: number | null
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
          limo_anywhere_id?: number | null
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
  }
}
