import { z } from 'zod'

export const schema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  is_percentage: z.boolean(),
  is_flat: z.boolean(),
  is_taxable: z.boolean(),
  amount: z.number(),
  is_active: z.boolean(),
  description: z.null(),
  is_tax: z.boolean(),
})

export type Surcharges = z.infer<typeof schema>
