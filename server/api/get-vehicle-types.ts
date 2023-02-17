import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { data, error } = await supabase
      .from('vehicle_type')
      .select('*')
      .order('value', { ascending: true })
    // console.log('Vehicle Types SSR:', vehicleTypes)
    return data
  } catch (error) {
    console.log('Vehicle Types Error:', error)
    return 'Error Getting Vehicle Types'
  }
})
