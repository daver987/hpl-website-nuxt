import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { data } = await supabase
      .from('service_type')
      .select('*')
      .order('value', { ascending: true })
    // console.log('Service Types SSR:', serviceTypes)
    return data
  } catch (e) {
    console.log('Service Types Error:', e)
    return 'Error Getting Service Types'
  }
})
