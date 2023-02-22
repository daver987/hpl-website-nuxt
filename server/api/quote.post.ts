import { usePricingEngine } from '~/composables/usePricingEngine'
import { Quote } from '~/schema/quoteSchema'
import { Conversion } from '~/schema/conversionSchema'

export default defineEventHandler(async (event) => {
  try {
    const prisma = event.context.prisma
    const quoteData = await readBody<Quote>(event)
    const {
      userId,
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
      selected_passengers,
    } = quoteData

    const conversionData = conversion as Conversion

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

    const newQuote = await prisma.quote.create({
      data: {
        selected_hours: pricingEngine.selectedHours.value,
        selected_passengers: selected_passengers,
        pickup_date: pickup_date,
        pickup_time: pickup_time,
        return_date: return_date,
        return_time: return_time,
        is_round_trip: is_round_trip,
        base_rate: pricingEngine.baseRate.value,
        line_items_total: pricingEngine.lineItemsTotal.value,
        tax_amount: pricingEngine.taxAmount.value,
        total_price: pricingEngine.totalPrice.value,
        trips: {
          //@ts-ignore
          create: is_round_trip
            ? [
                {
                  // First trip
                  origin_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lat,
                  origin_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lng,
                  origin_name: origin.name,
                  origin_formatted_address: origin.formatted_address,
                  origin_place_id: origin.place_id,
                  origin_types: origin.types,
                  destination_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lat,
                  destination_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lng,
                  destination_name: origin.name,
                  destination_formatted_address: origin.formatted_address,
                  destination_place_id: origin.place_id,
                  destination_types: origin.types,
                  distance: pricingEngine.distance.value,
                  is_return: false,
                },
                {
                  // Second trip
                  origin_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lat,
                  origin_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lng,
                  origin_name: origin.name,
                  origin_formatted_address: origin.formatted_address,
                  origin_place_id: origin.place_id,
                  origin_types: origin.types,
                  destination_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lat,
                  destination_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lng,
                  destination_name: destination.name,
                  destination_formatted_address: destination.formatted_address,
                  destination_place_id: destination.place_id,
                  destination_types: destination.types,
                  distance: pricingEngine.distance.value,
                  is_return: true,
                },
              ]
            : [
                {
                  // First (and only) trip
                  origin_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lat,
                  origin_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .start_location.lng,
                  origin_name: origin.name,
                  origin_formatted_address: origin.formatted_address,
                  origin_place_id: origin.place_id,
                  origin_types: origin.types,
                  destination_lat:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lat,
                  destination_lng:
                    pricingEngine.routeData.value?.routes[0].legs[0]
                      .end_location.lng,
                  destination_name: destination.name,
                  destination_formatted_address: destination.formatted_address,
                  destination_place_id: destination.place_id,
                  destination_types: destination.types,
                  distance: pricingEngine.distance.value,
                  is_return: false,
                },
              ],
        },
        user: {
          connectOrCreate: {
            where: { email_address: email_address },
            create: {
              id: userId,
              first_name: first_name,
              last_name: last_name,
              phone_number: phone_number,
              email_address: email_address,
              conversion: {
                create: {
                  utm_term: conversionData.utm_term,
                  utm_medium: conversionData.utm_medium,
                  utm_source: conversionData.utm_source,
                  utm_campaign: conversionData.utm_campaign,
                  gclid: conversionData.gclid,
                },
              },
            },
          },
        },
        sales_tax: {
          connect: { id: pricingEngine.taxes[0].id },
        },
        vehicle: {
          connect: { value: pricingEngine.vehicleTypeId.value },
        },
        service: {
          connect: { value: pricingEngine.serviceTypeId.value },
        },
        line_items: {
          connect: [
            { id: pricingEngine.lineItems[0].id },
            { id: pricingEngine.lineItems[1].id },
          ],
        },
      },
      include: {
        sales_tax: true,
        vehicle: true,
        service: true,
        trips: true,
      },
    })

    console.log(newQuote)

    return {
      newQuote,
      lineItemsList: pricingEngine.lineItemsList.value,
    }
  } catch (e) {
    console.error(e)
    return e
  }
})
