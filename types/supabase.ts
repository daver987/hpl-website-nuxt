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
      base_rate: {
        Row: {
          amount: number | null
          base_distance: number | null
          base_hourly: number | null
          created_at: string | null
          id: string
          modified_at: string | null
          vehicle_type_id: string | null
        }
        Insert: {
          amount?: number | null
          base_distance?: number | null
          base_hourly?: number | null
          created_at?: string | null
          id: string
          modified_at?: string | null
          vehicle_type_id?: string | null
        }
        Update: {
          amount?: number | null
          base_distance?: number | null
          base_hourly?: number | null
          created_at?: string | null
          id?: string
          modified_at?: string | null
          vehicle_type_id?: string | null
        }
      }
      contacts: {
        Row: {
          createdAt: string
          email_address: string
          first_name: string
          id: string
          is_active: boolean | null
          is_customer: boolean
          last_name: string
          phone_number: string
          stripe_customer_id: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email_address: string
          first_name: string
          id: string
          is_active?: boolean | null
          is_customer?: boolean
          last_name: string
          phone_number: string
          stripe_customer_id?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email_address?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          is_customer?: boolean
          last_name?: string
          phone_number?: string
          stripe_customer_id?: string | null
          updatedAt?: string
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
      conversion_data: {
        Row: {
          createdAt: string
          gclid: string | null
          id: string
          source: string | null
          updatedAt: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          createdAt?: string
          gclid?: string | null
          id: string
          source?: string | null
          updatedAt?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          createdAt?: string
          gclid?: string | null
          id?: string
          source?: string | null
          updatedAt?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
      }
      line_items: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          rate_id: string | null
          tax_code: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id: string
          name?: string | null
          rate_id?: string | null
          tax_code?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          rate_id?: string | null
          tax_code?: string | null
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
          message_id: string
          message_meta: Json | null
          sender_id: string | null
          statux: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          message?: string | null
          message_id: string
          message_meta?: Json | null
          sender_id?: string | null
          statux?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          message?: string | null
          message_id?: string
          message_meta?: Json | null
          sender_id?: string | null
          statux?: string | null
        }
      }
      pricing: {
        Row: {
          amount: number | null
          base_rate_id: string | null
          created_at: string | null
          id: string
          modified_at: string | null
          rate_id: string | null
        }
        Insert: {
          amount?: number | null
          base_rate_id?: string | null
          created_at?: string | null
          id?: string
          modified_at?: string | null
          rate_id?: string | null
        }
        Update: {
          amount?: number | null
          base_rate_id?: string | null
          created_at?: string | null
          id?: string
          modified_at?: string | null
          rate_id?: string | null
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
          airportFee: string | null
          baseRate: number
          calculatedDistance: number | null
          createdAt: string
          destination_formatted_address: string
          destination_name: string
          destination_place_id: string
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
          hoursValue: string | null
          HST: number
          id: string
          isBooked: boolean
          isItHourly: boolean
          isPearsonAirportDropoff: boolean
          isPearsonAirportPickup: boolean
          isRoundTrip: boolean
          lastName: string
          origin_formatted_address: string
          origin_name: string
          origin_place_id: string
          passengersLabel: string
          passengersValue: number
          phone_number: string | null
          pickupDate: string | null
          pickupTime: string | null
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
          userId: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Insert: {
          addedToCart?: boolean
          airportFee?: string | null
          baseRate: number
          calculatedDistance?: number | null
          createdAt?: string
          destination_formatted_address: string
          destination_name: string
          destination_place_id: string
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
          hoursValue?: string | null
          HST: number
          id?: string
          isBooked?: boolean
          isItHourly?: boolean
          isPearsonAirportDropoff?: boolean
          isPearsonAirportPickup?: boolean
          isRoundTrip: boolean
          lastName: string
          origin_formatted_address: string
          origin_name: string
          origin_place_id: string
          passengersLabel: string
          passengersValue: number
          phone_number?: string | null
          pickupDate?: string | null
          pickupTime?: string | null
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
          userId: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vehicleTypeLabel: string
          vehicleTypeValue: number
        }
        Update: {
          addedToCart?: boolean
          airportFee?: string | null
          baseRate?: number
          calculatedDistance?: number | null
          createdAt?: string
          destination_formatted_address?: string
          destination_name?: string
          destination_place_id?: string
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
          hoursValue?: string | null
          HST?: number
          id?: string
          isBooked?: boolean
          isItHourly?: boolean
          isPearsonAirportDropoff?: boolean
          isPearsonAirportPickup?: boolean
          isRoundTrip?: boolean
          lastName?: string
          origin_formatted_address?: string
          origin_name?: string
          origin_place_id?: string
          passengersLabel?: string
          passengersValue?: number
          phone_number?: string | null
          pickupDate?: string | null
          pickupTime?: string | null
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
          userId?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vehicleTypeLabel?: string
          vehicleTypeValue?: number
        }
      }
      quotes_1: {
        Row: {
          addedToCart: boolean
          airportFee: number | null
          baseRate: number
          calculatedDistance: number
          createdAt: string
          destination_formatted_address: string
          destination_name: string
          destination_place_id: string
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
          origin_formatted_address: string
          origin_name: string
          origin_place_id: string
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
          destination_formatted_address: string
          destination_name: string
          destination_place_id: string
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
          origin_formatted_address: string
          origin_name: string
          origin_place_id: string
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
          destination_formatted_address?: string
          destination_name?: string
          destination_place_id?: string
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
          origin_formatted_address?: string
          origin_name?: string
          origin_place_id?: string
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
      quotes_duplicate_duplicate: {
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
          pickup_date: string
          pickup_time: string
          quote_number: number
          return_date: string | null
          return_time: string | null
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
          pickup_date: string
          pickup_time: string
          quote_number: number
          return_date?: string | null
          return_time?: string | null
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
          pickup_date?: string
          pickup_time?: string
          quote_number?: number
          return_date?: string | null
          return_time?: string | null
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
      quotes_new_formatted: {
        Row: {
          contact_id: string | null
          conversion_id: string | null
          createdAt: string
          id: string
          price_id: string | null
          quote_number: number
          status: boolean
          trip_id: string | null
          updatedAt: string
        }
        Insert: {
          contact_id?: string | null
          conversion_id?: string | null
          createdAt?: string
          id?: string
          price_id?: string | null
          quote_number: number
          status?: boolean
          trip_id?: string | null
          updatedAt?: string
        }
        Update: {
          contact_id?: string | null
          conversion_id?: string | null
          createdAt?: string
          id?: string
          price_id?: string | null
          quote_number?: number
          status?: boolean
          trip_id?: string | null
          updatedAt?: string
        }
      }
      rates: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          is_flat: boolean | null
          is_percentage: boolean | null
          is_taxable: boolean | null
          name: string | null
          rate_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_flat?: boolean | null
          is_percentage?: boolean | null
          is_taxable?: boolean | null
          name?: string | null
          rate_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_flat?: boolean | null
          is_percentage?: boolean | null
          is_taxable?: boolean | null
          name?: string | null
          rate_id?: string | null
        }
      }
      routing: {
        Row: {
          created_at: string | null
          distance_text: string | null
          distance_value: number | null
          dropoff_location_id: string
          duration_text: string | null
          durration_value: number | null
          id: string
          pickup_location_id: string
          updated_at: string | null
          waypoint_1_id: string | null
          waypoint_2_id: string | null
          waypoint_3_id: string | null
          waypoint_4_id: string | null
          waypoint_5_id: string | null
        }
        Insert: {
          created_at?: string | null
          distance_text?: string | null
          distance_value?: number | null
          dropoff_location_id: string
          duration_text?: string | null
          durration_value?: number | null
          id: string
          pickup_location_id: string
          updated_at?: string | null
          waypoint_1_id?: string | null
          waypoint_2_id?: string | null
          waypoint_3_id?: string | null
          waypoint_4_id?: string | null
          waypoint_5_id?: string | null
        }
        Update: {
          created_at?: string | null
          distance_text?: string | null
          distance_value?: number | null
          dropoff_location_id?: string
          duration_text?: string | null
          durration_value?: number | null
          id?: string
          pickup_location_id?: string
          updated_at?: string | null
          waypoint_1_id?: string | null
          waypoint_2_id?: string | null
          waypoint_3_id?: string | null
          waypoint_4_id?: string | null
          waypoint_5_id?: string | null
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
      stripe_data: {
        Row: {
          created_at: string | null
          id: string
          stripe_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          stripe_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          stripe_id?: string | null
          updated_at?: string | null
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
          created_at: string
          id: string | null
          is_active: boolean | null
          region: string | null
          tax_amount: number | null
          tax_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string | null
          is_active?: boolean | null
          region?: string | null
          tax_amount?: number | null
          tax_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string | null
          is_active?: boolean | null
          region?: string | null
          tax_amount?: number | null
          tax_name?: string | null
          updated_at?: string | null
        }
      }
      trip_locations: {
        Row: {
          created_at: string | null
          formatted_address: string | null
          id: string
          lat: number | null
          long: number | null
          name: string | null
          place_id: string | null
          types: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          formatted_address?: string | null
          id?: string
          lat?: number | null
          long?: number | null
          name?: string | null
          place_id?: string | null
          types?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          formatted_address?: string | null
          id?: string
          lat?: number | null
          long?: number | null
          name?: string | null
          place_id?: string | null
          types?: string | null
          updated_at?: string | null
        }
      }
      trip_routing: {
        Row: {
          created_at: string | null
          distance_text: string | null
          distance_value: number | null
          duration_text: string | null
          duration_value: number | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distance_text?: string | null
          distance_value?: number | null
          duration_text?: string | null
          duration_value?: number | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distance_text?: string | null
          distance_value?: number | null
          duration_text?: string | null
          duration_value?: number | null
          id?: string
          updated_at?: string | null
        }
      }
      trips: {
        Row: {
          created_at: string | null
          id: string
          pickup_date: string | null
          pickup_time: string | null
          routing_id: string | null
          service_type_id: number | null
          trip_notes: string | null
          updated_at: string | null
          vehicle_type_id: number | null
        }
        Insert: {
          created_at?: string | null
          id: string
          pickup_date?: string | null
          pickup_time?: string | null
          routing_id?: string | null
          service_type_id?: number | null
          trip_notes?: string | null
          updated_at?: string | null
          vehicle_type_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pickup_date?: string | null
          pickup_time?: string | null
          routing_id?: string | null
          service_type_id?: number | null
          trip_notes?: string | null
          updated_at?: string | null
          vehicle_type_id?: number | null
        }
      }
      user: {
        Row: {
          createdAt: string
          emailAddress: string
          firstName: string
          id: string
          is_customer: boolean
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
          is_customer?: boolean
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
          is_customer?: boolean
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
          vehicle_image: string | null
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
          vehicle_image?: string | null
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
          vehicle_image?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      update_base_rate: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
