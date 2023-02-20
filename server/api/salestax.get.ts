import { salesTaxSchema } from '~/schema/salexTaxSchema'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.salesTax.findMany()
    if (data) {
      const salesTax = salesTaxSchema.parse(data)
      console.log(salesTax)
      return salesTax
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Sales Tax Error:', error)
    return error
  }
})
