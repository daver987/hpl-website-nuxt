import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { data } = await supabase
      .from('vehicle_type')
      .select('*')
      .order('value', { ascending: true })
    const vehicleTypes = data
    console.log('Vehicle Types SSR:', vehicleTypes)
    return vehicleTypes
  } catch (e) {
    console.log('Vehicle Types Error:', e)
    return 'Error Getting Vehicle Types'
  }
})
