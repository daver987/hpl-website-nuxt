import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const body = await readBody(event)
    const { quote_number } = body
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('quote_number', quote_number)
    console.log('Returned SS Quote:', data)
    return data
  } catch (e) {
    console.log(e)
  }
})
