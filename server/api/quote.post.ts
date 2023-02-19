import { usePricingEngine } from '~/composables/usePricingEngine'
import { z } from 'zod'

const quoteSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  origin: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  destination: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  pickup_date: z.number(),
  pickup_time: z.number(),
  return_date: z.number().optional(),
  return_time: z.number().optional(),
  service_id: z.number(),
  vehicle_id: z.number(),
  selected_hours: z.number().optional(),
  selected_passengers: z.number(),
  is_hourly: z.boolean(),
  is_round_trip: z.boolean(),
  conversion: z.object({}),
  vehicleTypes: z.any(),
  serviceTypes: z.any(),
  lineItems: z.any(),
  salesTaxes: z.any(),
})

type QuoteRequest = z.infer<typeof quoteSchema>

export default defineEventHandler(async (event) => {
  try {
    const quoteData = await readBody<QuoteRequest>(event)
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      origin,
      destination,
      service_id,
      vehicle_id,
      selected_hours,
      pickup_date,
      pickup_time,
      is_round_trip,
      return_date,
      return_time,
      conversion,
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes,
    } = quoteData

    const pricingEngine = usePricingEngine(
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes
    )

    const { place_id: originPlaceId } = origin
    const { place_id: destinationPlaceId } = destination

    // Set pricing engine state
    pricingEngine.origin.value = originPlaceId
    pricingEngine.destination.value = destinationPlaceId
    pricingEngine.vehicleTypeId.value = vehicle_id
    pricingEngine.serviceTypeId.value = service_id
    pricingEngine.selectedHours.value = selected_hours!

    // Wait for the distance to be set before updating other values
    await pricingEngine.updateDistance()
    pricingEngine.updateBaseRate()
    pricingEngine.updateLineItemsTotal()
    pricingEngine.updateTaxAmount()

    const quote = {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email_address: email_address,
      origin: origin,
      destination: destination,
      service_type_id: service_id,
      vehicle_type_id: vehicle_id,
      selected_hours: selected_hours,
      pickup_date: pickup_date,
      pickup_time: pickup_time,
      is_round_trip: is_round_trip,
      return_date: quoteData.return_date,
      return_time: quoteData.return_time,
      base_rate: pricingEngine.baseRate.value,
      line_items_total: pricingEngine.lineItemsTotal.value,
      tax_amount: pricingEngine.taxAmount.value,
      total_price: pricingEngine.totalPrice.value,
    }

    return {
      first_name,
      last_name,
      email_address,
      phone_number,
      origin,
      destination,
      service_id,
      vehicle_id,
      selected_hours,
      pickup_date,
      pickup_time,
      is_round_trip,
      return_date,
      return_time,
      conversion,
      quote,
    }
  } catch (e) {
    console.error(e)
    return e
  }
})
