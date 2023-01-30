import { Surcharges } from '~/schema/surcharges'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { ref } from 'vue'

const zapierSecret = useRuntimeConfig().ZAPIER_WEBHOOK_SECRET
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  try {
    const body = await readBody(event)
    console.log('This is the body', body)
    const {
      calculatedDistance,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      selectedVehicleType,
      isItHourly,
      isRoundTrip,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      placeDataDestination,
      placeDataOrigin,
      selectedServiceType,
      selectedNumberOfHours,
      tripData,
      selectedPassengers,
      gtmValues,
    } = body

    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData

    const {
      formatted_address: originFormattedAddress,
      name: originName,
      place_id: originPlaceId,
      isPearsonAirportOrigin,
    } = placeDataOrigin

    const {
      formatted_address: destinationFormattedAddress,
      name: destinationName,
      place_id: destinationPlaceId,
      isPearsonAirportDestination,
    } = placeDataDestination

    const { value: hoursValue, label: hoursLabel } = selectedNumberOfHours || {
      value: 0,
      label: '0 hrs',
    }

    const { value: passengersValue, label: passengersLabel } =
      selectedPassengers || { value: 0, label: '1 Passenger' }

    const { value: vehicleTypeValue, label: vehicleTypeLabel } =
      selectedVehicleType || { value: 0, label: 'Standard Sedan' }

    const { value: serviceTypeValue, label: serviceTypeLabel } =
      selectedServiceType || { value: 0, label: 'Point To Point' }

    const { value: selectedHours, label: selectedHoursLabel } =
      selectedNumberOfHours || { value: 0, label: 'Hours Not Selected' }
    const vehicleRates = ref({} as any)
    //get the vehicle type from the vehicle type value
    try {
      const { data: vehicleTypeValues } = await supabase
        .from('vehicle_type')
        .select('*')
        .eq('value', vehicleTypeValue)
      console.log('This is the Vehicle Type', vehicleTypeValues)
      //@ts-ignore
      vehicleRates.value = vehicleTypeValues[0]
    } catch (e) {
      console.log(e)
    }

    const {
      min_distance,
      min_rate_distance,
      per_km,
      min_hours_hourly,
      min_rate_hourly,
      per_hour,
    } = vehicleRates.value

    //calculate the base rate
    const baseRateDistance = () => {
      if (calculatedDistance < min_distance) {
        return min_rate_distance
      }
      return (calculatedDistance - min_distance) * per_km + min_rate_distance
    }

    const baseRateHourly = () => {
      if (selectedHours < min_hours_hourly) {
        return min_rate_hourly
      }
      return selectedHours * per_hour
    }

    //get the surcharges
    const getSurcharges = async () => {
      const { data } = await supabase.from('surcharges').select()
      console.log('This is the Surcharge Data', data)
      return data
    }
    const surcharges = (await getSurcharges()) as Surcharges[]

    const baseAmount = () => {
      if (isItHourly) {
        return baseRateHourly()
      }
      return baseRateDistance()
    }
    const surchargeAmounts = {} as any
    let totalAmount = baseAmount()

    for (const surcharge of surcharges) {
      if (surcharge.is_active) {
        let amount = 0
        if (surcharge.is_percentage) {
          amount = baseAmount() * surcharge.amount
        } else if (surcharge.is_flat) {
          amount = surcharge.amount
        }
        if (surchargeAmounts[surcharge.name]) {
          surchargeAmounts[surcharge.name] += amount
        } else {
          surchargeAmounts[surcharge.name] = amount
        }
        totalAmount += amount
      }
    }

    const setPearsonAirportFee = () => {
      if (isRoundTrip) {
        if (
          placeDataOrigin.isPearsonAirportOrigin ||
          placeDataDestination.isPearsonAirportDestination
        ) {
          return 15
        }
      } else if (placeDataOrigin.isPearsonAirportOrigin) {
        return 15
      }
      return 0
    }

    const pearsonFee = ref(0)
    const roundTripAmount = () => {
      if (isRoundTrip) {
        pearsonFee.value = setPearsonAirportFee()
        // @ts-ignore
        return pearsonFee.value + totalAmount * 2
      } else {
        return totalAmount
      }
    }

    // convert values to strings with 2 decimal places
    for (const key in surchargeAmounts) {
      surchargeAmounts[key] = surchargeAmounts[key].toFixed(2)
    }
    totalAmount = totalAmount.toFixed(2)

    console.log(surchargeAmounts) // {surcharge1: "20.00", surcharge2: "10.00", tax: "10.00"}
    console.log(totalAmount) // "130.00"

    const hplUserId = ref('')
    // add a user to the database
    const addUser = async () => {
      const { data, error } = await supabase
        .from('user')
        .upsert(
          {
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
          },
          { onConflict: 'emailAddress' }
        )
        .select()
      if (error) {
        console.log('Error', error)
      }
      console.log('This is the User Data', data)
      //@ts-ignore
      hplUserId.value = data[0].id
      console.log('This is the hplUserId', hplUserId.value)
    }

    //increment the quote number
    interface QuoteNumber {
      latest_quote_number: number
    }

    //get the latest quote number
    const getQuoteNumber = async () => {
      const { data } = await supabase
        .from('quote_number')
        .select('latest_quote_number')
        .single()
      console.log('This is the latest quote number', data)
      return data as QuoteNumber
    }
    const { latest_quote_number } = await getQuoteNumber()

    //increment and update the latest quote number
    const incrementedQuoteNumber = async () => {
      const updatedQuoteNumber = latest_quote_number + 1
      const { data } = await supabase
        .from('quote_number')
        .update({ latest_quote_number: updatedQuoteNumber })
        .eq('id', '1')
      return updatedQuoteNumber
    }
    const quoteNumber = await incrementedQuoteNumber()
    console.log('This is the incremented quote number', quoteNumber)

    //add the quote to the database
    const addQuote = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .upsert({
          pickupDate,
          pickupTime,
          isRoundTrip,
          returnDate,
          returnTime,
          originFormattedAddress: placeDataOrigin.formatted_address,
          originName: placeDataOrigin.name,
          originPlaceId: placeDataOrigin.place_id,
          isPearsonAirportPickup: isPearsonAirportOrigin,
          startLat: tripData.startLat,
          startLng: tripData.startLng,
          destinationFormattedAddress: placeDataDestination.formatted_address,
          destinationName: placeDataDestination.name,
          destinationPlaceId: placeDataDestination.place_id,
          isPearsonAirportDropoff: isPearsonAirportDestination,
          endLat: tripData.endLat,
          endLng: tripData.endLng,
          vehicleTypeLabel: selectedVehicleType.label,
          vehicleTypeValue: selectedVehicleType.value,
          serviceTypeLabel: selectedServiceType.label,
          serviceTypeValue: selectedServiceType.value,
          passengersLabel: selectedPassengers.label,
          passengersValue: selectedPassengers.value,
          isItHourly,
          hoursLabel: selectedHoursLabel,
          hoursValue: selectedHours,
          distanceText: tripData.distanceText,
          distanceValue: tripData.distanceValue,
          durationText: tripData.durationText,
          durationValue: tripData.durationValue,
          calculatedDistance,
          baseRate: isItHourly ? baseRateHourly() : baseRateDistance(),
          fuelSurcharge: surchargeAmounts['Fuel Surcharge'],
          gratuity: surchargeAmounts.Gratuity,
          HST: surchargeAmounts.HST,
          userEmail: emailAddress,
          totalFare: totalAmount,
          quote_number: quoteNumber,
          firstName,
          lastName,
          phone_number: phoneNumber,
          userId: hplUserId.value,
          roundTripTotal: roundTripAmount(),
          airportFee: setPearsonAirportFee(),
          utm_medium: gtmValues.utm_medium,
          utm_source: gtmValues.utm_source,
          utm_campaign: gtmValues.utm_campaign,
          utm_term: gtmValues.utm_term,
          gclid: gtmValues.gclid,
        })
        .select()
      if (error) {
        console.log('This is the returned error', error)
      }
      console.log('This is the returned quote data', data)
    }

    const sendEmail = async () => {
      const data = await $fetch(zapierSecret, {
        method: 'POST',
        body: {
          firstName,
          lastName,
          emailAddress,
          roundTripTotal: roundTripAmount(),
          totalFare: totalAmount as number,
          vehicleTypeLabel: selectedVehicleType.label,
          serviceTypeLabel: selectedServiceType.label,
          isItRoundTrip: isRoundTrip,
          destinationName: placeDataDestination.name,
          originName: placeDataOrigin.name,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          quoteNumber,
          originFormattedAddress: placeDataOrigin.formatted_address,
          destinationFormattedAddress: placeDataDestination.formatted_address,
        },
      })
      console.log('This is the returned email data', data)
    }
    const createAircallContact = async () => {
      const data = await $fetch('https://api.aircall.io/v1/contacts', {
        method: 'POST',
        headers: {
          Authorization:
            'Basic N2U0MWNlYmVmYzljNjZkYjVjMzE2NDNiMjgzYzZiZGQ6MTc0YjMwYWE1OTBiMWQxMWYwMmI2NjFhMWMxZjViODA=',
        },
        body: {
          first_name: firstName,
          last_name: lastName,
          information: hplUserId.value,
          phone_numbers: [
            {
              label: 'Phone Number',
              value: phoneNumber,
            },
          ],
          emails: [
            {
              label: 'Email Address',
              value: emailAddress,
            },
          ],
        },
      })
      console.log('This is the returned aircall data', data)
    }
    await addUser()
    await addQuote()
    await sendEmail()
    await createAircallContact()

    return {
      statusCode: 200,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      originName,
      originFormattedAddress,
      originPlaceId,
      startLat,
      startLng,
      destinationName,
      destinationFormattedAddress,
      destinationPlaceId,
      endLat,
      endLng,
      serviceTypeLabel,
      serviceTypeValue,
      vehicleTypeLabel,
      vehicleTypeValue,
      passengersLabel,
      passengersValue,
      isItHourly,
      hoursValue,
      hoursLabel,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      isRoundTrip,
      distanceValue,
      distanceText,
      durationText,
      durationValue,
      calculatedDistance,
      hplUserId: hplUserId.value,
      totalFare: totalAmount,
    }
  } catch (error) {
    console.log(error)
  }
})
