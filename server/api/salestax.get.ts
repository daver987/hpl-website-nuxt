import { z } from 'zod'

export const SalesTaxSchema = z.array(
  z.object({
    id: z.string(),
    region: z.string(),
    amount: z.number(),
    is_active: z.boolean(),
    tax_name: z.string(),
  })
)

export type SalesTax = z.infer<typeof SalesTaxSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.salesTax.findMany()
    if (data) {
      const salesTax = SalesTaxSchema.parse(data)
      console.log(salesTax)
      return salesTax
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
