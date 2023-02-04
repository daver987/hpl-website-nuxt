import { VehicleTypeRowSchema, vehicleTypeRowSchema } from '~/schema/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { ref } from 'vue'
// import { formatDate } from '~/utils/formatDate'
// import { formatTime } from '~/utils/formatTime'
import { z } from 'zod'

export const surchargeSchema = z.array(
  z.object({
    id: z.number(),
    created_at: z.string(),
    name: z.string(),
    is_percentage: z.boolean(),
    is_flat: z.boolean(),
    is_taxable: z.boolean(),
    amount: z.number(),
    is_active: z.boolean(),
    description: z.null(),
    is_tax: z.boolean(),
  })
)

export const vehicleTypeSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  max_passengers: z.number(),
  max_luggage: z.number(),
  per_km: z.number(),
  per_hour: z.number(),
  min_hours_hourly: z.number(),
  min_rate_distance: z.number(),
  min_distance: z.number(),
  min_rate_hourly: z.number(),
  is_active: z.boolean(),
  name: z.string(),
  value: z.number(),
  isDisabled: z.boolean(),
  label: z.string(),
  vehicle_image: z.string(),
})

export type VehicleType = z.infer<typeof vehicleTypeSchema>
export type Surcharges = z.infer<typeof surchargeSchema>

const zapierSecret = useRuntimeConfig().ZAPIER_WEBHOOK_SECRET
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  try {
    const body = await readBody(event)
    console.log('This is the body', body)
    const formData = { ...body }

    const vehicleRates = ref<VehicleTypeRowSchema>()

    try {
      const { data: vehicleTypeValues } = await supabase
        .from('vehicle_type')
        .select('*')
        .eq('value', formData.vehicleTypeValue)
      console.log('This is the Vehicle Type', vehicleTypeValues)

      if (vehicleTypeValues && vehicleTypeValues.length > 0) {
        const vehicleTypeValue = vehicleTypeValues[0]
        vehicleRates.value = vehicleTypeRowSchema.parse(vehicleTypeValue)
      }
    } catch (e) {
      console.log(e)
    }

    const {
      min_distance,
      min_rate_distance,
      per_km,
      min_hours_hourly,
      per_hour,
      vehicle_image,
    } = vehicleRates.value as VehicleType

    const baseAmount = (
      isHourly: boolean,
      calculatedDistance: number,
      selectedHours: number
    ) => {
      if (isHourly) {
        return Math.max(min_hours_hourly * per_hour, selectedHours * per_hour)
      }
      return Math.max(
        min_rate_distance,
        (calculatedDistance - min_distance) * per_km + min_rate_distance
      )
    }
    const calculatedDistance = formData.distanceValue / 1000
    const totalAmount = baseAmount(
      formData.isItHourly,
      calculatedDistance,
      formData.selectedHours
    )

    const { data: surchargesArray } = await supabase.from('surcharges').select()
    const surcharges = surchargeSchema.parse(surchargesArray)
    console.log('This is the Surcharge Data', surcharges)

    const setPearsonAirportFee = () => {
      if (formData.isRoundTrip) {
        if (
          formData.origin_name ||
          formData.destination_name === 'Toronto Pearson International Airport'
        ) {
          return 15
        }
      } else if (
        formData.origin_name === 'Toronto Pearson International Airport'
      ) {
        return 15
      }
      return 0
    }

    const pearsonFee = setPearsonAirportFee()
    const totalSurchargeAmount = surcharges
      .filter((surcharge) => surcharge.is_active)
      .reduce((acc, surcharge) => {
        let amount = 0
        if (surcharge.is_percentage) {
          amount = totalAmount * surcharge.amount
        } else if (surcharge.is_flat) {
          amount = surcharge.amount
        }

        if (surcharge.is_tax) {
          // @ts-ignore
          const taxableSurcharges = acc.filter((s) => s.is_taxable)
          taxableSurcharges.forEach((taxableSurcharge: { amount: number }) => {
            taxableSurcharge.amount +=
              taxableSurcharge.amount * surcharge.amount
          })
        } else {
          const key = surcharge.name.toLowerCase().replace(/ /g, '_')
          // @ts-ignore
          acc[key] = acc[key]
            ? // @ts-ignore
              { ...acc[key], amount: acc[key].amount + amount }
            : { name: surcharge.name, amount, is_taxable: surcharge.is_taxable }
        }
        return acc
      }, {})

    const airportFee = setPearsonAirportFee()
    // @ts-ignore
    totalSurchargeAmount.airport_fee = {
      name: 'Airport Fee',
      amount: airportFee,
      is_taxable: true,
    }

    const roundTripAmount = () => {
      return formData.isRoundTrip ? pearsonFee + totalAmount * 2 : totalAmount
    }

    // convert values to strings with 2 decimal places
    // for (const key in totalSurchargeAmount) {
    //   totalSurchargeAmount[key] = totalSurchargeAmount[key].toFixed(2)
    // }
    // totalAmount = totalAmount.toFixed(2)

    console.log(totalSurchargeAmount) // {surcharge1: "20.00", surcharge2: "10.00", tax: "10.00"}
    console.log(totalAmount) // "130.00"

    const hplUserId = ref('')
    // add a user to the database
    const addUser = async () => {
      const { data, error } = await supabase
        .from('user')
        .upsert(
          {
            firstName: body.firstName,
            lastName: body.lastName,
            emailAddress: body.emailAddress,
            phoneNumber: body.phoneNumber,
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
    const completeFormData = {
      ...formData,
      ...totalSurchargeAmount,
      totalFare: totalAmount,
      quote_number,
      hplUserId: hplUserId.value,
    }
    console.log('This is the complete form data', completeFormData)
    //add the quote to the database
    const addQuote = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .upsert(completeFormData)
        .select()
      if (error) {
        console.log('This is the returned error', error)
      }
      console.log('This is the returned quote data', data)
    }

    // const sendEmail = async () => {
    //   const data = await $fetch(zapierSecret, {
    //     method: 'POST',
    //     body: {
    //       firstName,
    //       lastName,
    //       emailAddress,
    //       roundTripTotal: roundTripAmount(),
    //       totalFare: totalAmount as number,
    //       vehicleTypeLabel: selectedVehicleType.label,
    //       serviceTypeLabel: selectedServiceType.label,
    //       isItRoundTrip: isRoundTrip,
    //       destinationName: placeDataDestination.name,
    //       originName: placeDataOrigin.name,
    //       pickupDate: formatDate(pickupDate),
    //       pickupTime: formatTime(pickupTime),
    //       returnDate: formatDate(returnDate),
    //       returnTime: formatTime(returnTime),
    //       quote_number,
    //       originFormattedAddress: placeDataOrigin.formatted_address,
    //       destinationFormattedAddress: placeDataDestination.formatted_address,
    //       vehicle_image,
    //       visibility: isRoundTrip
    //         ? 'visibility: visible;'
    //         : 'visibility: hidden;',
    //     },
    //   })
    //   console.log('This is the returned email data', data)
    // }
    // const createAircallContact = async () => {
    //   const data = await $fetch('https://api.aircall.io/v1/contacts', {
    //     method: 'POST',
    //     headers: {
    //       Authorization:
    //         'Basic N2U0MWNlYmVmYzljNjZkYjVjMzE2NDNiMjgzYzZiZGQ6MTc0YjMwYWE1OTBiMWQxMWYwMmI2NjFhMWMxZjViODA=',
    //     },
    //     body: {
    //       first_name: firstName,
    //       last_name: lastName,
    //       information: hplUserId.value,
    //       phone_numbers: [
    //         {
    //           label: 'Phone Number',
    //           value: phoneNumber,
    //         },
    //       ],
    //       emails: [
    //         {
    //           label: 'Email Address',
    //           value: emailAddress,
    //         },
    //       ],
    //     },
    //   })
    //   console.log('This is the returned aircall data', data)
    // }
    await addUser()
    await addQuote()
    // await sendEmail()
    // await createAircallContact()

    return {
      statusCode: 200,
      // pickupDate,
      // pickupTime,
      // returnDate,
      // returnTime,
      // originName,
      // originFormattedAddress,
      // originPlaceId,
      // startLat,
      // startLng,
      // destinationName,
      // destinationFormattedAddress,
      // destinationPlaceId,
      // endLat,
      // endLng,
      // serviceTypeLabel,
      // serviceTypeValue,
      // vehicleTypeLabel,
      // vehicleTypeValue,
      // passengersLabel,
      // passengersValue,
      // isItHourly,
      // hoursValue,
      // hoursLabel,
      // firstName,
      // lastName,
      // emailAddress,
      // phoneNumber,
      // isRoundTrip,
      // distanceValue,
      // distanceText,
      // durationText,
      // durationValue,
      // calculatedDistance,
      // hplUserId: hplUserId.value,
      // totalFare: totalAmount,
      // quote_number,
      // vehicle_image,
    }
  } catch (error) {
    console.log(error)
  }
})
