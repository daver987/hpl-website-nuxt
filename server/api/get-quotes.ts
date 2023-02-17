import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { data } = await supabase.from('new_quotes').select('*')
    console.log('Returned SS Quote:', data)
    return data
  } catch (e) {
    console.log(e)
  }
})
