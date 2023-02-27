import { useToNumber } from '@vueuse/core'
import { z } from 'zod'

export const quoteSchema = z
  .object({
    quote_number: z.number(),
    pickup_date: z.number(),
    pickup_time: z.number(),
    return_date: z.number().nullable(),
    return_time: z.number().nullable(),
    base_rate: z.number(),
    tax_amount: z.number(),
    total_price: z.number(),
    is_round_trip: z.boolean(),
    selected_passengers: z.number(),
    selected_hours: z.number().nullable(),
    line_items_list: z.array(
      z
        .object({
          id: z.string(),
          label: z.string(),
          total: z.number(),
        })
        .strip()
    ),
    service: z
      .object({
        label: z.string(),
      })
      .strip(),
    vehicle: z
      .object({
        label: z.string(),
        vehicle_image: z.string(),
      })
      .strip(),
    trips: z.array(
      z
        .object({
          origin_full_name: z.string(),
          destination_full_name: z.string(),
        })
        .strip()
    ),
    sales_tax: z
      .object({
        tax_name: z.string(),
      })
      .strip(),
    user: z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        phone_number: z.string(),
        email_address: z.string().email(),
      })
      .strip(),
  })
  .strip()

export type Quote = z.infer<typeof quoteSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const query = getQuery(event)
    const quote_number = useToNumber(query.quote_number as string)
    console.log('Server Quote Number:', quote_number)
    const data = await prisma.quote.findUnique({
      where: { quote_number: quote_number.value },
      select: {
        pickup_date: true,
        pickup_time: true,
        return_date: true,
        return_time: true,
        base_rate: true,
        tax_amount: true,
        total_price: true,
        is_round_trip: true,
        selected_passengers: true,
        line_items_list: true,
        service: {
          select: {
            label: true,
          },
        },
        vehicle: {
          select: {
            label: true,
            vehicle_image: true,
          },
        },
        user: {
          select: {
            first_name: true,
            last_name: true,
            phone_number: true,
            email_address: true,
          },
        },
        trips: {
          select: {
            origin_full_name: true,
            destination_full_name: true,
          },
        },
        sales_tax: {
          select: {
            tax_name: true,
          },
        },
      },
    })
    console.log('Quote Data ss:', data)
    if (data) {
      const quote = quoteSchema.safeParse(data)
      console.log('Returned Quote:', quote)
      return quote
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Quote Error:', error)
    return error
  }
})
