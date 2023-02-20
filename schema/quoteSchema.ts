import { z } from 'zod'

export const quoteSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  origin: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  destination: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  pickup_date: z.number(),
  pickup_time: z.number(),
  return_date: z.number().optional(),
  return_time: z.number().optional(),
  service_id: z.number(),
  vehicle_id: z.number(),
  selected_hours: z.number().optional(),
  selected_passengers: z.number(),
  is_hourly: z.boolean(),
  is_round_trip: z.boolean(),
  conversion: z.object({}),
  vehicleTypes: z.any(),
  serviceTypes: z.any(),
  lineItems: z.any(),
  salesTaxes: z.any(),
})

export type Quote = z.infer<typeof quoteSchema>
