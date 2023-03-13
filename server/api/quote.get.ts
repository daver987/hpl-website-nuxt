import _ from 'lodash'
import { SummarySchema } from '~/schema/summarySchema'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const numberSchema = z.number()
  const prisma = event.context.prisma
  try {
    const query = getQuery(event)
    const quote_number = numberSchema.parse(_.toNumber(query.quote_number))
    const data = await prisma.quote.findUnique({
      where: { quote_number: quote_number },
      include: {
        service: true,
        vehicle: true,
        user: true,
        trips: {
          include: {
            locations: true,
          },
        },
        sales_tax: true,
      },
    })
    if (data) {
      console.log('Get Quote SS Data:', data)
      return SummarySchema.strip().parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Quote Error:', error)
    return error
  }
})
