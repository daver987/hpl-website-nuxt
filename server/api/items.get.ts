import { z } from 'zod'

export const lineItemSchema = z.array(
  z.object({
    id: z.string(),
    label: z.string(),
    amount: z.number(),
    is_taxable: z.boolean(),
    is_percentage: z.boolean(),
    is_active: z.boolean(),
  })
)

export type LineItem = z.infer<typeof lineItemSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.lineItem.findMany()
    if (data) {
      const lineItems = lineItemSchema.parse(data)
      console.log(lineItems)
      return lineItems
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
