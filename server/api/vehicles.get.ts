import { vehicleSchema } from '~/schema/vehicleSchema'
import { z } from 'zod'
const vehicle = z.array(vehicleSchema)

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.vehicle.findMany()
    if (data) {
      const vehicleTypes = vehicle.parse(data)
      return vehicleTypes
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Vehicle Error:', error)
    return error
  }
})
