import { vehicleSchema } from '~/schema/vehicleSchema'
import { z } from 'zod'
const vehicle = z.array(vehicleSchema)

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.vehicle.findMany()
    if (data) {
      const vehicleTypes = vehicle.parse(data)
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
