import { Surcharges } from '~/schema/surcharges'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { ref } from 'vue'
import { formatDate } from '~/utils/formatDate'
import { formatTime } from '~/utils/formatTime'

const zapierSecret = useRuntimeConfig().ZAPIER_WEBHOOK_SECRET
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  try {
    const body = await readBody(event)
    console.log('This is the body', body)
    const bodyValues = { ...body }
    console.log('body values:', bodyValues)
    const {
      selectedVehicleType: { value: selectedVehicleValue },
    } = bodyValues
    const {
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
      selectedServiceType,
      selectedNumberOfHours,
      tripData,
      selectedPassengers,
    } = body

    const {
      origin_formatted_address,
      origin_name,
      origin_place_id,
      origin_types,
      destination_formatted_address,
      destination_name,
      destination_place_id,
      destination_types,
      distanceValue,
      distanceText,
      durationValue,
      durationText,
      startLat,
      startLng,
      endLat,
      endLng,
      utm_medium,
      utm_source,
      utm_campaign,
      utm_term,
      gclid,
    } = tripData

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

    let vehicleRates = {}
    console.log('Vehicle Type Value:', selectedVehicleValue)
    //get the vehicle type from the vehicle type value
    try {
      const { data: vehicleTypeValues } = await supabase
        .from('vehicle_type')
        .select('*')
        .eq('value', selectedVehicleValue)
      console.log('This is the Vehicle Type', vehicleTypeValues)
      //@ts-ignore
      vehicleRates = vehicleTypeValues[0]
    } catch (e) {
      console.log(e)
    }

    interface VehicleRate {
      min_distance: number
      min_rate_distance: number
      per_km: number
      min_hours_hourly: number
      min_rate_hourly: number
      per_hour: number
      vehicle_image: number
    }

    const {
      min_distance,
      min_rate_distance,
      per_km,
      min_hours_hourly,
      min_rate_hourly,
      per_hour,
      vehicle_image,
    } = vehicleRates as VehicleRate

    //calculate the base rate
    const calculatedDistance = distanceValue / 1000
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
    const surcharges = (await getSurcharges()) as unknown as Surcharges[]

    const baseAmount = () => {
      if (isItHourly) {
        return baseRateHourly()
      }
      return baseRateDistance()
    }

    const surchargeAmounts = {}
    let totalAmount = baseAmount()

    for (const surcharge of surcharges) {
      // @ts-ignore
      if (surcharge.is_active) {
        let amount = 0
        if (surcharge.is_percentage) {
          amount = baseAmount() * surcharge.amount
        } else if (surcharge.is_flat) {
          amount = surcharge.amount
        }
        // @ts-ignore
        if (surchargeAmounts[surcharge.name]) {
          // @ts-ignore
          surchargeAmounts[surcharge.name] += amount
        } else {
          // @ts-ignore
          surchargeAmounts[surcharge.name] = amount
        }
        totalAmount += amount
      }
    }
    let isPearsonAirportPickup = false
    let isPearsonAirportDropoff = false
    const setPearsonAirportFee = () => {
      if (isRoundTrip) {
        if (
          origin_types.includes('airport') ||
          destination_types.includes('airport')
        ) {
          isPearsonAirportPickup = true
          return 15
        }
      } else if (origin_types.includes('airport')) {
        isPearsonAirportPickup = true
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
      // @ts-ignore
      surchargeAmounts[key] = surchargeAmounts[key].toFixed(2)
    }
    const newTotalAmount = totalAmount.toFixed(2)

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
    const quote_number = await incrementedQuoteNumber()
    console.log('This is the incremented quote number', quote_number)

    //add the quote to the database
    const addQuote = async () => {
      // @ts-ignore
      // @ts-ignore
      const { data, error } = await supabase
        .from('quotes')
        .upsert({
          pickupDate,
          pickupTime,
          isRoundTrip,
          returnDate,
          returnTime,
          origin_formatted_address,
          origin_name,
          origin_place_id,
          startLat: tripData.startLat,
          startLng: tripData.startLng,
          destination_formatted_address,
          destination_name,
          destination_place_id,
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
          //@ts-ignore
          fuelSurcharge: surchargeAmounts['Fuel Surcharge'],
          //@ts-ignore
          gratuity: surchargeAmounts.Gratuity,
          //@ts-ignore
          HST: surchargeAmounts.HST,
          userEmail: emailAddress,
          //@ts-ignore
          totalFare: newTotalAmount,
          quote_number: quote_number,
          firstName,
          lastName,
          phone_number: phoneNumber,
          userId: hplUserId.value,
          roundTripTotal: roundTripAmount(),
          airportFee: setPearsonAirportFee(),
          isPearsonAirportPickup,
          isPearsonAirportDropoff,
          utm_medium,
          utm_source,
          utm_campaign,
          utm_term,
          gclid,
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
          totalFare: newTotalAmount,
          vehicleTypeLabel: selectedVehicleType.label,
          serviceTypeLabel: selectedServiceType.label,
          isItRoundTrip: isRoundTrip,
          destination_name,
          origin_name,
          pickupDate: formatDate(pickupDate),
          pickupTime: formatTime(pickupTime),
          returnDate: formatDate(returnDate),
          returnTime: formatTime(returnTime),
          quote_number: quote_number,
          origin_formatted_address,
          destination_formatted_address,
          vehicle_image,
          visibility: isRoundTrip
            ? 'visibility: visible;'
            : 'visibility: hidden;',
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
      origin_name,
      origin_formatted_address,
      origin_place_id,
      startLat,
      startLng,
      destination_name,
      destination_formatted_address,
      destination_place_id,
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
      quote_number,
      vehicle_image,
    }
  } catch (error) {
    console.log(error)
  }
})
