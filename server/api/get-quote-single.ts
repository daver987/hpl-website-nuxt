import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const query = await getQuery(event)
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('quote_number', query.quote_number)
    console.log('Returned SS Quote:', data)
    return data
  } catch (e) {
    console.log(e)
  }
})
