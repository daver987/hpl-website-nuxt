import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~~/types/supabase'
import { quotesRowSchema } from '~/schema/supabase'

export default eventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  try {
    const query = await getQuery(event)
    const { quote_number } = query
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('quote_number', quote_number)
      .single()
    const quote = quotesRowSchema.parse(data)
    console.log('Returned SS Quote:', quote)
    return quote
  } catch (err) {
    console.log(err)
    return err
  }
})
