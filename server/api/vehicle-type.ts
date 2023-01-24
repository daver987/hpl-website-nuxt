import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { vehicleTypeRowSchema } from '~/schema/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const { data } = await supabase.from('vehicle_type').select('*')
  const vehicleTypes = vehicleTypeRowSchema.parse(data)
  console.log('Vehicle Types SSR:', vehicleTypes)
  return vehicleTypes
})
