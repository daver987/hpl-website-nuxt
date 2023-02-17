import { z } from 'zod'
export const serviceTypeSchema = z.array(
  z.object({
    value: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    label: z.string(),
    isDisabled: z.boolean(),
    limo_anywhere_id: z.number(),
  })
)

export type ServiceType = z.infer<typeof serviceTypeSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.service.findMany()
    if (data) {
      const serviceTypes = serviceTypeSchema.parse(data)
      console.log(serviceTypes)
      return serviceTypes
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
