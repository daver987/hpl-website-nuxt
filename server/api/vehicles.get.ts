import { z } from 'zod'

export const vehicleTypeSchema = z.array(
  z.object({
    value: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    max_passengers: z.number(),
    max_luggage: z.number(),
    per_km: z.number(),
    per_hour: z.number(),
    min_hours_hourly: z.number(),
    min_distance: z.number(),
    min_rate_distance: z.number(),
    is_active: z.boolean(),
    name: z.string(),
    label: z.string(),
    limo_anywhere_id: z.number(),
    vehicle_image: z.string(),
  })
)

const vehicleTypePromise = z.promise(vehicleTypeSchema)
export type VehicleType = z.infer<typeof vehicleTypeSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.vehicle.findMany()
    if (!data) {
      throw new Error('No data found')
    }
    return vehicleTypeSchema.parse(data)
  } catch (error) {
    return {
      error,
    }
  }
})
