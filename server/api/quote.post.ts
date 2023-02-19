import {
  usePricingEngine,
  calculateDistance,
} from '~/composables/usePricingEngine'
import { z } from 'zod'

const quoteSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  origin: z
    .object({
      ormatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  destination: z
    .object({
      ormatted_address: z.string(),
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
})

type QuoteRequest = z.infer<typeof quoteSchema>

export default defineEventHandler(async (event) => {
  try {
    const prisma = event.context.prisma
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
    } = quoteData

    const { place_id: originPlaceId } = origin
    const { place_id: destinationPlaceId } = destination
    const { distance, data: tripData } = await calculateDistance(
      originPlaceId,
      destinationPlaceId
    )

    const vehicleTypes = await prisma.vehicle.findMany()
    const serviceTypes = await prisma.service.findMany()
    const lineItems = await prisma.lineItem.findMany()
    const salesTaxes = await prisma.salesTax.findMany()

    const pricingEngine = usePricingEngine(
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes
    )

    // Set pricing engine state
    pricingEngine.origin.value = quoteData.origin.place_id
    pricingEngine.destination.value = quoteData.destination.place_id
    pricingEngine.vehicleTypeId.value = quoteData.vehicle_id
    pricingEngine.serviceTypeId.value = quoteData.service_id
    pricingEngine.selectedHours.value = quoteData.selected_hours!
    pricingEngine.distance.value = distance

    // Wait for the distance to be set before updating other values
    await pricingEngine.updateDistance()
    pricingEngine.updateBaseRate()
    pricingEngine.updateLineItemsTotal()
    pricingEngine.updateTaxAmount()

    const quote = {
      first_name: quoteData.first_name,
      last_name: quoteData.last_name,
      phone_number: quoteData.phone_number,
      email_address: quoteData.email_address,
      origin: quoteData.origin,
      destination: quoteData.destination,
      service_type_id: quoteData.service_id,
      vehicle_type_id: quoteData.vehicle_id,
      selected_hours: quoteData.selected_hours,
      pickup_date: quoteData.pickup_date,
      pickup_time: quoteData.pickup_time,
      is_round_trip: quoteData.is_round_trip,
      return_date: quoteData.return_date,
      return_time: quoteData.return_time,
      distance,
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
      tripData,
    }
  } catch (e) {
    console.error(e)
    return e
  }
})
