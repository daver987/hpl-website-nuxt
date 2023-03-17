import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const quoteRouter = router({
  get: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.quote.findUnique({
        where: { quote_number: input.quote_number },
        include: {
          service: true,
          vehicle: true,
          user: true,
          sales_tax: true,
          trips: {
            include: {
              locations: {
                orderBy: {
                  route_order: 'desc',
                },
              },
            },
          },
        },
      })
    }),

  postShortLink: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        short_link: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.quote.update({
        where: { quote_number: input.quote_number },
        data: {
          short_link: input.short_link,
        },
      })
    }),
})
