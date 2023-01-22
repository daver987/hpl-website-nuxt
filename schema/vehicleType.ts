import { z } from 'zod'

export const vehicleTypeSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  max_passengers: z.number(),
  max_luggage: z.number(),
  per_km: z.number(),
  per_hour: z.number(),
  min_hours_hourly: z.number(),
  min_rate_distance: z.number(),
  min_distance: z.number(),
  min_rate_hourly: z.number(),
  is_active: z.boolean(),
  name: z.string(),
  value: z.number(),
  isDisabled: z.boolean(),
  label: z.string(),
})

export type VehicleType = z.infer<typeof vehicleTypeSchema>
