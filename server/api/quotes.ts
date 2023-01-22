import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~~/types/supabase'

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

    return data
  } catch (err) {
    console.log(err)
    return err
  }
})
