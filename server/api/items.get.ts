import { lineItemSchema } from '~/schema/lineItemSchema'
import { z } from 'zod'

const items = z.array(lineItemSchema)

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.lineItem.findMany()
    if (data) {
      return items.parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
