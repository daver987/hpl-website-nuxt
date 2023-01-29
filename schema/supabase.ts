// Generated by ts-to-zod
import { z } from 'zod'
import { Json } from '~/types'

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(jsonSchema),
      z.array(jsonSchema),
    ])
    .nullable()
)

export const accountsRowSchema = z.object({
  company_account_number: z.number().nullable(),
  company_address: z.string().nullable(),
  company_email: z.string().nullable(),
  company_name: z.string().nullable(),
  company_phone: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
})

export const accountsInsertSchema = z.object({
  company_account_number: z.number().optional().nullable(),
  company_address: z.string().optional().nullable(),
  company_email: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  company_phone: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
})

export const accountsUpdateSchema = z.object({
  company_account_number: z.number().optional().nullable(),
  company_address: z.string().optional().nullable(),
  company_email: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  company_phone: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
})

export const airportSurchargesRowSchema = z.object({
  airportCode: z.string().nullable(),
  airportName: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.number(),
  isActive: z.boolean().nullable(),
  isTaxable: z.boolean().nullable(),
  surchargeFee: z.number().nullable(),
  surchargeName: z.string().nullable(),
})

export const airportSurchargesInsertSchema = z.object({
  airportCode: z.string().optional().nullable(),
  airportName: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isActive: z.boolean().optional().nullable(),
  isTaxable: z.boolean().optional().nullable(),
  surchargeFee: z.number().optional().nullable(),
  surchargeName: z.string().optional().nullable(),
})

export const airportSurchargesUpdateSchema = z.object({
  airportCode: z.string().optional().nullable(),
  airportName: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isActive: z.boolean().optional().nullable(),
  isTaxable: z.boolean().optional().nullable(),
  surchargeFee: z.number().optional().nullable(),
  surchargeName: z.string().optional().nullable(),
})

export const conversationRowSchema = z.object({
  created_at: z.string().nullable(),
  creator_id: z.string().nullable(),
  deleted_at: z.string().nullable(),
  id: z.string(),
  updated_at: z.string().nullable(),
})

export const conversationInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),
  deleted_at: z.string().optional().nullable(),
  id: z.string().optional(),
  updated_at: z.string().optional().nullable(),
})

export const conversationUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),
  deleted_at: z.string().optional().nullable(),
  id: z.string().optional(),
  updated_at: z.string().optional().nullable(),
})

export const messagesRowSchema = z.object({
  conversation_id: z.string().nullable(),
  created_at: z.string().nullable(),
  deleted_at: z.string().nullable(),
  id: z.number(),
  message: z.string().nullable(),
  sender_id: z.string().nullable(),
})

export const messagesInsertSchema = z.object({
  conversation_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  deleted_at: z.string().optional().nullable(),
  id: z.number().optional(),
  message: z.string().optional().nullable(),
  sender_id: z.string().optional().nullable(),
})

export const messagesUpdateSchema = z.object({
  conversation_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  deleted_at: z.string().optional().nullable(),
  id: z.number().optional(),
  message: z.string().optional().nullable(),
  sender_id: z.string().optional().nullable(),
})

export const profilesRowSchema = z.object({
  avatar_url: z.string().nullable(),
  first_name: z.string().nullable(),
  id: z.string(),
  last_name: z.string().nullable(),
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
  website: z.string().nullable(),
})

export const profilesInsertSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  id: z.string(),
  last_name: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
})

export const profilesUpdateSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  id: z.string().optional(),
  last_name: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
})

export const quoteNumberRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.number(),
  latest_quote_number: z.number().nullable(),
})

export const quoteNumberInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  latest_quote_number: z.number().optional().nullable(),
})

export const quoteNumberUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  latest_quote_number: z.number().optional().nullable(),
})

export const quotesRowSchema = z.array(
  z.object({
    addedToCart: z.boolean(),
    airportFee: z.number().nullable(),
    baseRate: z.number(),
    calculatedDistance: z.number(),
    createdAt: z.string(),
    destinationFormattedAddress: z.string(),
    destinationName: z.string(),
    destinationPlaceId: z.string(),
    distanceText: z.string(),
    distanceValue: z.number(),
    durationText: z.string(),
    durationValue: z.number(),
    endLat: z.number(),
    endLng: z.number(),
    firstName: z.string(),
    fuelSurcharge: z.number(),
    gclid: z.string().nullable(),
    gratuity: z.number(),
    hoursLabel: z.string(),
    hoursValue: z.number(),
    HST: z.number(),
    id: z.string(),
    isBooked: z.boolean(),
    isItHourly: z.boolean(),
    isPearsonAirportDropoff: z.boolean(),
    isPearsonAirportPickup: z.boolean(),
    isRoundTrip: z.boolean(),
    lastName: z.string(),
    originFormattedAddress: z.string(),
    originName: z.string(),
    originPlaceId: z.string(),
    passengersLabel: z.string(),
    passengersValue: z.number(),
    phone_number: z.string().nullable(),
    pickupDate: z.string(),
    pickupTime: z.string(),
    quote_number: z.number(),
    returnDate: z.string().nullable(),
    returnTime: z.string().nullable(),
    roundTripTotal: z.number().nullable(),
    serviceTypeLabel: z.string(),
    serviceTypeValue: z.number(),
    startLat: z.number(),
    startLng: z.number(),
    totalFare: z.number(),
    updatedAt: z.string(),
    userEmail: z.string(),
    userId: z.string().nullable(),
    utm_campaign: z.string().nullable(),
    utm_medium: z.string().nullable(),
    utm_source: z.string().nullable(),
    utm_term: z.string().nullable(),
    vehicleTypeLabel: z.string(),
    vehicleTypeValue: z.number(),
  })
)

export const quotesInsertSchema = z.object({
  addedToCart: z.boolean().optional(),
  airportFee: z.number().optional().nullable(),
  baseRate: z.number(),
  calculatedDistance: z.number(),
  createdAt: z.string().optional(),
  destinationFormattedAddress: z.string(),
  destinationName: z.string(),
  destinationPlaceId: z.string(),
  distanceText: z.string(),
  distanceValue: z.number(),
  durationText: z.string(),
  durationValue: z.number(),
  endLat: z.number(),
  endLng: z.number(),
  firstName: z.string(),
  fuelSurcharge: z.number(),
  gclid: z.string().optional().nullable(),
  gratuity: z.number(),
  hoursLabel: z.string(),
  hoursValue: z.number().optional(),
  HST: z.number(),
  id: z.string().optional(),
  isBooked: z.boolean().optional(),
  isItHourly: z.boolean().optional(),
  isPearsonAirportDropoff: z.boolean().optional(),
  isPearsonAirportPickup: z.boolean().optional(),
  isRoundTrip: z.boolean().optional(),
  lastName: z.string(),
  originFormattedAddress: z.string(),
  originName: z.string(),
  originPlaceId: z.string(),
  passengersLabel: z.string().optional(),
  passengersValue: z.number().optional(),
  phone_number: z.string().optional().nullable(),
  pickupDate: z.string(),
  pickupTime: z.string(),
  quote_number: z.number(),
  returnDate: z.string().optional().nullable(),
  returnTime: z.string().optional().nullable(),
  roundTripTotal: z.number().optional().nullable(),
  serviceTypeLabel: z.string(),
  serviceTypeValue: z.number(),
  startLat: z.number(),
  startLng: z.number(),
  totalFare: z.number(),
  updatedAt: z.string().optional(),
  userEmail: z.string(),
  userId: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  vehicleTypeLabel: z.string(),
  vehicleTypeValue: z.number(),
})

export const quotesUpdateSchema = z.object({
  addedToCart: z.boolean().optional(),
  airportFee: z.number().optional().nullable(),
  baseRate: z.number().optional(),
  calculatedDistance: z.number().optional(),
  createdAt: z.string().optional(),
  destinationFormattedAddress: z.string().optional(),
  destinationName: z.string().optional(),
  destinationPlaceId: z.string().optional(),
  distanceText: z.string().optional(),
  distanceValue: z.number().optional(),
  durationText: z.string().optional(),
  durationValue: z.number().optional(),
  endLat: z.number().optional(),
  endLng: z.number().optional(),
  firstName: z.string().optional(),
  fuelSurcharge: z.number().optional(),
  gclid: z.string().optional().nullable(),
  gratuity: z.number().optional(),
  hoursLabel: z.string().optional(),
  hoursValue: z.number().optional(),
  HST: z.number().optional(),
  id: z.string().optional(),
  isBooked: z.boolean().optional(),
  isItHourly: z.boolean().optional(),
  isPearsonAirportDropoff: z.boolean().optional(),
  isPearsonAirportPickup: z.boolean().optional(),
  isRoundTrip: z.boolean().optional(),
  lastName: z.string().optional(),
  originFormattedAddress: z.string().optional(),
  originName: z.string().optional(),
  originPlaceId: z.string().optional(),
  passengersLabel: z.string().optional(),
  passengersValue: z.number().optional(),
  phone_number: z.string().optional().nullable(),
  pickupDate: z.string().optional(),
  pickupTime: z.string().optional(),
  quote_number: z.number().optional(),
  returnDate: z.string().optional().nullable(),
  returnTime: z.string().optional().nullable(),
  roundTripTotal: z.number().optional().nullable(),
  serviceTypeLabel: z.string().optional(),
  serviceTypeValue: z.number().optional(),
  startLat: z.number().optional(),
  startLng: z.number().optional(),
  totalFare: z.number().optional(),
  updatedAt: z.string().optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  vehicleTypeLabel: z.string().optional(),
  vehicleTypeValue: z.number().optional(),
})

export const serviceTypeRowSchema = z.array(
  z.object({
    created_at: z.string().nullable(),
    id: z.number(),
    isDisabled: z.boolean().nullable(),
    label: z.string().nullable(),
    limo_anywhere_id: z.number().nullable(),
    value: z.number().nullable(),
  })
)

export const serviceTypeInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isDisabled: z.boolean().optional().nullable(),
  label: z.string().optional().nullable(),
  limo_anywhere_id: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
})

export const serviceTypeUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isDisabled: z.boolean().optional().nullable(),
  label: z.string().optional().nullable(),
  limo_anywhere_id: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
})

export const surchargesRowSchema = z.object({
  amount: z.number().nullable(),
  created_at: z.string().nullable(),
  description: z.string().nullable(),
  id: z.number(),
  is_active: z.boolean().nullable(),
  is_flat: z.boolean().nullable(),
  is_percentage: z.boolean().nullable(),
  is_tax: z.boolean().nullable(),
  is_taxable: z.boolean().nullable(),
  name: z.string().nullable(),
})

export const surchargesInsertSchema = z.object({
  amount: z.number().optional().nullable(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.number().optional(),
  is_active: z.boolean().optional().nullable(),
  is_flat: z.boolean().optional().nullable(),
  is_percentage: z.boolean().optional().nullable(),
  is_tax: z.boolean().optional().nullable(),
  is_taxable: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
})

export const surchargesUpdateSchema = z.object({
  amount: z.number().optional().nullable(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.number().optional(),
  is_active: z.boolean().optional().nullable(),
  is_flat: z.boolean().optional().nullable(),
  is_percentage: z.boolean().optional().nullable(),
  is_tax: z.boolean().optional().nullable(),
  is_taxable: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
})

export const taxesRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.number(),
  isApplicable: z.boolean().nullable(),
  region: z.string().nullable(),
  taxAmount: z.number().nullable(),
  taxName: z.string().nullable(),
})

export const taxesInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isApplicable: z.boolean().optional().nullable(),
  region: z.string().optional().nullable(),
  taxAmount: z.number().optional().nullable(),
  taxName: z.string().optional().nullable(),
})

export const taxesUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  isApplicable: z.boolean().optional().nullable(),
  region: z.string().optional().nullable(),
  taxAmount: z.number().optional().nullable(),
  taxName: z.string().optional().nullable(),
})

export const userRowSchema = z.object({
  createdAt: z.string(),
  emailAddress: z.string(),
  firstName: z.string(),
  id: z.string(),
  isCustomer: z.boolean(),
  lastName: z.string(),
  phoneNumber: z.string(),
  stripe_customer_id: z.string().nullable(),
  updatedAt: z.string(),
  userCookie: z.string().nullable(),
})

export const userInsertSchema = z.object({
  createdAt: z.string().optional(),
  emailAddress: z.string(),
  firstName: z.string(),
  id: z.string().optional(),
  isCustomer: z.boolean().optional(),
  lastName: z.string(),
  phoneNumber: z.string(),
  stripe_customer_id: z.string().optional().nullable(),
  updatedAt: z.string().optional(),
  userCookie: z.string().optional().nullable(),
})

export const userUpdateSchema = z.object({
  createdAt: z.string().optional(),
  emailAddress: z.string().optional(),
  firstName: z.string().optional(),
  id: z.string().optional(),
  isCustomer: z.boolean().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  stripe_customer_id: z.string().optional().nullable(),
  updatedAt: z.string().optional(),
  userCookie: z.string().optional().nullable(),
})

export const vehicleTypeRowSchema = z.array(
  z.array(
    z.object({
      created_at: z.string().nullable(),
      id: z.number(),
      is_active: z.boolean().nullable(),
      isDisabled: z.boolean().nullable(),
      label: z.string().nullable(),
      limo_anywhere_id: z.number().nullable(),
      max_luggage: z.number().nullable(),
      max_passengers: z.number().nullable(),
      min_distance: z.number().nullable(),
      min_hours_hourly: z.number().nullable(),
      min_rate_distance: z.number().nullable(),
      min_rate_hourly: z.number().nullable(),
      name: z.string().nullable(),
      per_hour: z.number().nullable(),
      per_km: z.number().nullable(),
      value: z.number().nullable(),
    })
  )
)

export const vehicleTypeInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  is_active: z.boolean().optional().nullable(),
  isDisabled: z.boolean().optional().nullable(),
  label: z.string().optional().nullable(),
  limo_anywhere_id: z.number().optional().nullable(),
  max_luggage: z.number().optional().nullable(),
  max_passengers: z.number().optional().nullable(),
  min_distance: z.number().optional().nullable(),
  min_hours_hourly: z.number().optional().nullable(),
  min_rate_distance: z.number().optional().nullable(),
  min_rate_hourly: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  per_hour: z.number().optional().nullable(),
  per_km: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
})

export const vehicleTypeUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.number().optional(),
  is_active: z.boolean().optional().nullable(),
  isDisabled: z.boolean().optional().nullable(),
  label: z.string().optional().nullable(),
  limo_anywhere_id: z.number().optional().nullable(),
  max_luggage: z.number().optional().nullable(),
  max_passengers: z.number().optional().nullable(),
  min_distance: z.number().optional().nullable(),
  min_hours_hourly: z.number().optional().nullable(),
  min_rate_distance: z.number().optional().nullable(),
  min_rate_hourly: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  per_hour: z.number().optional().nullable(),
  per_km: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
})
