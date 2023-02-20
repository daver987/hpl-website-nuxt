import { serviceSchema } from '~/schema/serviceSchema'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.service.findMany()
    if (data) {
      const serviceTypes = serviceSchema.parse(data)
      console.log(serviceTypes)
      return serviceTypes
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Services Error:', error)
    return error
  }
})
