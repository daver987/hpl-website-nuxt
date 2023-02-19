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
    min_hours: z.number(),
    min_distance: z.number(),
    min_rate: z.number(),
    is_active: z.boolean(),
    label: z.string(),
    limo_anywhere_id: z.number(),
    vehicle_image: z.string(),
  })
)

export type VehicleType = z.infer<typeof vehicleTypeSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.vehicle.findMany()
    if (data) {
      const vehicleTypes = vehicleTypeSchema.parse(data)
      console.log('Vehicles:', vehicleTypes)
      return vehicleTypes
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
