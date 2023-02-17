import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const query = await getQuery(event)
    console.log('Get quote single query', query)
    const { data, error } = await supabase
      .from('new_quotes')
      .select('*')
      .eq('quote_number', query.quote_number)
    console.log('Returned SS Quote:', data)
    console.error('Get Quote Single Error:', error)
    return data
  } catch (error) {
    console.log('Get Quote Single Error:', error)
    return error
  }
})
