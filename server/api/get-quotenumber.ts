import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { quoteNumberRowSchema } from '~/schema/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const { data } = await supabase.from('quote_number').select('*').single()
  const latestQuoteNumber = quoteNumberRowSchema.parse(data)
  console.log('Latest Quote Number ssr:', latestQuoteNumber)
  return latestQuoteNumber.latest_quote_number
})
