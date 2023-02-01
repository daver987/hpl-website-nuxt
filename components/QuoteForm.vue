<script lang="ts" setup>
import { Place } from '~/types/DirectionsResponse'
import { formSchema } from '~/schema/quoteFormValues'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { TripData } from '~~/types/data'
import { useGtm } from '@gtm-support/vue-gtm'
import Datepicker from '~/components/datepicker/Datepicker.vue'
import { useQuoteStore } from '~/stores/useQuoteStore'
const quoteStore = useQuoteStore()

const route = useRoute()
const routeUrl = route.query
const { utm_medium, utm_source, utm_campaign, utm_term, gclid } = routeUrl
const gtmValues = ref({
  utm_medium,
  utm_source,
  utm_campaign,
  utm_term,
  gclid,
})

const gtm = useGtm()
function triggerEvent() {
  gtm?.trackEvent({
    event: 'submitQuote',
    category: 'Request quote',
    action: 'click',
    label: 'Request Quote',
    value: 1,
    noninteraction: false,
  })
}

// Options for the phone number input
const inputOptions = ref({
  id: 'phone-number',
  required: true,
  styleClasses:
    'block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm pl-1',
  showDialCode: true,
  name: 'phoneNumber',
  type: 'tel',
  ariaDescribedby: 'name',
  ariaLabeledBy: 'placeholder',
  placeholder: 'Enter Phone',
  autoFocus: true,
})
const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showSearchBox: true,
  showDialCodeInList: true,
})

const userStore = useUserStore()
const { hplUserId } = storeToRefs(userStore)

const extractOptions = (originalArray: {
  label: string
  value: number
  isDisabled: boolean
}) => {
  //@ts-ignore
  return originalArray.map(
    (obj: { label: any; value: any; isDisabled: any }) => ({
      label: obj.label,
      value: obj.value,
      isDisabled: obj.isDisabled,
    })
  )
}

const origin = ref<Place | null>(null)
const originPlaceId = ref<string>('')
const destination = ref<Place | null>(null)
const destinationPlaceId = ref<string>('')
const calculatedDistance = ref<number | null>(null)
const pickupDate = ref(undefined)
const pickupTime = ref(undefined)
const returnDate = ref(new Date())
const returnTime = ref(new Date())
const isItHourly = ref<boolean>(false)
const placeDataOrigin = ref<Place | null>(null)
const placeDataDestination = ref<Place | null>(null)
const isRoundTrip = ref<boolean>(false)
const firstName = ref<string>('')
const lastName = ref<string>('')
const emailAddress = ref<string>('')
const phoneNumber = ref<string>('')
const disabled = ref<boolean>(true)
const tripData = ref<TripData | null>(null)

const buildPassengerOptions = (numPassengers: number) => {
  let options = [
    {
      label: 'Select Passengers',
      value: 0,
      isDisabled: true,
    },
    {
      label: '1 Passenger',
      value: 1,
      isDisabled: false,
    },
  ]
  for (let i = 2; i <= numPassengers; i++) {
    options.push({
      label: i + ' Passengers',
      value: i,
      isDisabled: false,
    })
  }
  return options
}
const passengerOptions = ref(buildPassengerOptions(7))
const selectedPassengers = ref(passengerOptions.value[0])

const buildHoursRequiredOptions = () => {
  let options = [
    {
      label: 'For Hourly Service',
      value: 0,
      isDisabled: true,
    },
  ]
  for (let i = 2; i <= 12; i++) {
    options.push({
      label: i + ' hrs',
      value: i,
      isDisabled: false,
    })
  }
  return options
}
const hoursRequiredClasses = ref('cursor-not-allowed opacity-50 text-gray-300')
const hoursRequiredOptions = ref(buildHoursRequiredOptions())
const selectedNumberOfHours = ref(hoursRequiredOptions.value[0])

const { data: serviceTypes } = await useFetch('/api/get-service-type')
//@ts-ignore
const serviceTypeOptions = ref(extractOptions(serviceTypes.value))
console.log(serviceTypeOptions.value)
const selectedServiceType = ref(serviceTypeOptions.value[0])

watch(selectedServiceType, () => {
  if (selectedServiceType.value.value === 4) {
    isItHourly.value = true
    disabled.value = false
    hoursRequiredClasses.value = 'text-gray-400'
    selectedNumberOfHours.value = hoursRequiredOptions.value[0]
  } else {
    isItHourly.value = false
    disabled.value = true
    hoursRequiredClasses.value = 'cursor-not-allowed opacity-50 text-gray-300'
    selectedNumberOfHours.value = hoursRequiredOptions.value[0]
  }
})

const { data: vehicleTypes } = await useFetch('/api/get-vehicle-type')
//@ts-ignore
const vehicleTypeOptions = ref(extractOptions(vehicleTypes.value))
console.log(vehicleTypeOptions.value)
const selectedVehicleType = ref(vehicleTypeOptions.value[0])

watch(selectedVehicleType, () => {
  if (selectedVehicleType.value?.value === 1 || 2) {
    passengerOptions.value = buildPassengerOptions(3)
    selectedPassengers.value = passengerOptions.value[0]
  }
  if (selectedVehicleType.value?.value === 3) {
    passengerOptions.value = buildPassengerOptions(7)
    selectedPassengers.value = passengerOptions.value[0]
  }
  if (selectedVehicleType.value.value === 4) {
    passengerOptions.value = buildPassengerOptions(6)
    selectedPassengers.value = passengerOptions.value[0]
  }
})

const originType = ref<string[]>([])
const isPearsonAirportOrigin = ref<boolean>(false)
const onOriginChange = async (evt: Place) => {
  origin.value = evt
  console.log('Origin:', origin.value)
  const { place_id, types, name } = origin.value
  originType.value = types
  name === 'Toronto Pearson International Airport'
    ? (isPearsonAirportOrigin.value = true)
    : (isPearsonAirportOrigin.value = false)
  console.log('Is it PearsonAirport:', isPearsonAirportOrigin.value)
  console.log('Origin Type:', originType.value)
  origin.value.isPearsonAirportOrigin = isPearsonAirportOrigin.value
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { data } = await useFetch('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    console.log('query', {
      origin: originPlaceId.value,
      destination: place_id,
    })
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
    tripData.value = data.value
    console.log('Trip data:', data)
    console.log('Origin data:', placeDataOrigin.value)
    console.log('Destination data:', placeDataDestination.value)
    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData.value as TripData
    const {
      place_id: originPlaceIdValue,
      formatted_address: originFormattedAddress,
      name: originName,
    } = placeDataOrigin.value as Place
    const {
      place_id: destinationPlaceId,
      formatted_address: destinationFormattedAddress,
      name: destinationName,
    } = placeDataDestination.value as Place
    calculatedDistance.value = distanceValue / 1000
    console.log('calculated distance is:', calculatedDistance.value)
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      originPlaceIdValue,
      originFormattedAddress,
      originName,
      destinationPlaceId,
      destinationFormattedAddress,
      destinationName,
      calculatedDistance,
    }
  } else {
    const { place_id } = origin.value
    console.log('only origin is set')
    console.log('place id is:', place_id)
    return (originPlaceId.value = place_id)
  }
}

const destinationType = ref<string[]>([])
const isPearsonAirportDestination = ref(false)
const onDestinationChange = async (evt: Place) => {
  destination.value = evt
  const { place_id, types, name } = destination.value
  destinationType.value = types
  name === 'Toronto Pearson International Airport'
    ? (isPearsonAirportDestination.value = true)
    : (isPearsonAirportDestination.value = false)
  console.log('Is it PearsonAirport:', isPearsonAirportDestination.value)
  destination.value.isPearsonAirportDestination =
    isPearsonAirportDestination.value
  console.log('Destination Type:', destinationType.value)
  console.log('Destination:', destination.value)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { data } = await useFetch('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })

    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
    tripData.value = data.value
    console.log('Trip data:', tripData.value)
    console.log('Origin data:', placeDataOrigin.value)
    console.log('Destination data:', placeDataDestination.value)
    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData.value as TripData
    const {
      place_id: originPlaceIdValue,
      formatted_address: originFormattedAddress,
      name: originName,
    } = placeDataOrigin.value
    const {
      place_id: destinationPlaceId,
      formatted_address: destinationFormattedAddress,
      name: destinationName,
    } = placeDataDestination.value
    calculatedDistance.value = distanceValue / 1000
    console.log('calculated distance is:', calculatedDistance.value)
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      originPlaceIdValue,
      originFormattedAddress,
      originName,
      destinationPlaceId,
      destinationFormattedAddress,
      destinationName,
      tripData,
      calculatedDistance,
    }
  } else {
    console.log('only destination is set')
    const { place_id } = destination.value
    console.log('destination place id is:', place_id)
    return (destinationPlaceId.value = place_id)
  }
}

watch(originType, () => {
  if (originType.value.includes('airport')) {
    selectedServiceType.value = serviceTypeOptions.value[3]
  }
  if (destinationType.value.includes('airport')) {
    selectedServiceType.value = serviceTypeOptions.value[2]
  }
  if (
    originType.value.includes('airport') &&
    destinationType.value.includes('airport')
  ) {
    selectedServiceType.value = serviceTypeOptions.value[3]
  }
})

watch(destinationType, () => {
  if (originType.value.includes('airport')) {
    selectedServiceType.value = serviceTypeOptions.value[3]
  }
  if (destinationType.value.includes('airport')) {
    selectedServiceType.value = serviceTypeOptions.value[2]
  }
  if (
    originType.value.includes('airport') &&
    destinationType.value.includes('airport')
  ) {
    selectedServiceType.value = serviceTypeOptions.value[3]
  }
})

const validationSchema = toFormValidator(formSchema)

const loading = ref(false)
const openAlert = ref(false)
const returnedQuoteValues = ref()

async function onSubmit(values: any) {
  loading.value = true
  console.log('values are:', values)
  const { data } = await useFetch('/api/submission', {
    method: 'POST',
    body: values,
  })
  returnedQuoteValues.value = data?.value
  const { hplUserId, quote_number } = returnedQuoteValues.value
  quoteStore.quote_number = quote_number.toString()
  localStorage.setItem('quote_number', quote_number.toString())
  localStorage.setItem('hplUserId', hplUserId)
  localStorage.setItem('quote_data', JSON.stringify(returnedQuoteValues.value))
  console.log('Returned data is:', returnedQuoteValues.value)

  if (returnedQuoteValues?.value.statusCode === 200) {
    setTimeout(async () => {
      triggerEvent()
      loading.value = false
      await navigateTo('/quoted')
      console.log('navigated to /quoted')
    }, 1500)
    return
  } else {
    setTimeout(() => {
      loading.value = false
      openAlert.value = true
      console.log('error')
    }, 1500)
    return
  }
}
</script>

<template>
  <div
    class="border-1 rounded border border-white bg-black sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden sm:rounded-lg"
  >
    <h2 class="pt-5 text-center text-3xl uppercase text-white">
      Instant Quote
    </h2>
    <Form
      id="lead_form"
      :validation-schema="validationSchema"
      class="space-y-3 p-5"
      name="lead_form"
      @submit="onSubmit"
    >
      <div class="grid w-full grid-cols-1 gap-3">
        <InputPlacesAutocomplete
          label="Pick Up Location:"
          name="originLocation"
          placeholder="Enter pick up location"
          @change="onOriginChange"
        />
        <ErrorMessage class="text-sm text-red-600" name="placeDataOrigin" />
      </div>
      <div class="grid w-full grid-cols-1 gap-3">
        <InputPlacesAutocomplete
          label="Drop Off Location:"
          name="destinationLocation"
          placeholder="Enter drop off location"
          @change="onDestinationChange"
        />
        <ErrorMessage
          class="text-sm text-red-600"
          name="placeDataDestination"
        />
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <Datepicker
            v-model="pickupDate"
            :lower-limit="new Date()"
            class="mt-1 w-full cursor-pointer rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-gray-900 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
            input-format="MMM dd, yyyy"
            name="pickupDate"
            placeholder="Enter A Pickup Date"
          />
          <ErrorMessage class="text-sm text-red-600" name="pickupDate" />
        </div>
        <div class="md:col-span-1">
          <Datepicker
            v-model="pickupTime"
            class="mt-1 w-full cursor-pointer rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-gray-900 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
            inputFormat="hh:mm a"
            minimum-view="time"
            name="pickupTime"
            placeholder="Enter A Pickup Time"
            starting-view="time"
            dayPickerHeadingFormat="hh:mm a"
          />
          <ErrorMessage class="text-sm text-red-600" name="pickupTime" />
        </div>
      </div>
      <div
        :class="[isRoundTrip ? 'visible' : 'hidden']"
        class="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        <div class="col-span-1">
          <Datepicker
            v-model="returnDate"
            :lower-limit="new Date()"
            allow-outside-interval
            class="mt-1 w-full cursor-pointer rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-gray-900 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
            input-format="MMM dd, yyyy"
            name="returnDate"
            placeholder="Enter A Return Date"
          />
        </div>
        <ErrorMessage class="text-sm text-red-600" name="returnDate" />
        <div class="col-span-1">
          <Datepicker
            v-model="returnTime"
            class="mt-1 w-full cursor-pointer rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-gray-900 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
            input-format="hh:mm a"
            minimum-view="time"
            name="returnTime"
            placeholder="Enter A Return Time"
            starting-view="time"
            dayPickerHeadingFormat="hh:mm a"
          />
          <ErrorMessage class="text-sm text-red-600" name="returnTime" />
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <Field v-model="selectedServiceType" name="selectedServiceType">
            <InputListbox
              v-model="selectedServiceType"
              :options="serviceTypeOptions"
              key-prop="selectedServiceType"
              label-prop="name"
            />
            <ErrorMessage
              class="text-sm text-red-600"
              name="selectedServiceType"
            />
          </Field>
        </div>

        <div class="col-span-1">
          <Field v-model="selectedVehicleType" name="selectedVehicleType">
            <InputListbox
              v-model="selectedVehicleType"
              :options="vehicleTypeOptions"
              key-prop="selectedVehicleType"
              label="Vehicle Type"
            />
            <ErrorMessage
              class="text-sm text-red-600"
              name="selectedVehicleType"
            />
          </Field>
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <Field v-model="selectedPassengers" name="selectedPassengers">
            <InputListbox
              v-model="selectedPassengers"
              :options="passengerOptions"
              key-prop="selectedPassengers"
              label="Number of Passengers"
            />
            <ErrorMessage
              class="text-sm text-red-600"
              name="selectedPassengers"
            />
          </Field>
        </div>

        <div class="col-span-1">
          <Field v-model="selectedNumberOfHours" name="selectedNumberOfHours">
            <InputListbox
              v-model="selectedNumberOfHours"
              :classes="hoursRequiredClasses"
              :is-disabled="disabled"
              :options="hoursRequiredOptions"
              key-prop="selectedNumberOfHours"
              label="Number of Hours"
            />
            <ErrorMessage
              class="text-sm text-red-600"
              name="selectedNumberOfHours"
            />
          </Field>
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <InputText
            v-model="firstName"
            label="First Name:"
            name="firstName"
            placeholder="Enter first name"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="firstName" />
        </div>

        <div class="col-span-1">
          <InputText
            v-model="lastName"
            label="Last Name:"
            name="lastName"
            placeholder="Enter last name"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="lastName" />
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <InputText
            v-model="emailAddress"
            label="Email Address:"
            name="emailAddress"
            placeholder="Enter Email Address"
            type="email"
          />
          <ErrorMessage class="text-sm text-red-600" name="emailAddress" />
        </div>
        <div class="col-span-1">
          <Field
            v-slot="{ field }"
            :validateOnBlur="true"
            :validateOnChange="false"
            :validateOnInput="false"
            :validateOnModelUpdate="false"
            name="phoneNumber"
          >
            <VueTelInput
              v-model="phoneNumber"
              :dropdown-options="dropdownOptions"
              :input-options="inputOptions"
              aria-label="phone input"
              style-classes="rounded border border-gray-300 pr-1 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
              v-bind="field"
            />
            <ErrorMessage class="text-sm text-red-600" name="phoneNumber" />
          </Field>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="relative flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="round_trip"
              v-model="isRoundTrip"
              aria-describedby="comments-description"
              class="focus:ring-brand-500 h-4 w-4 rounded border-gray-300 text-brand-600"
              name="round_trip"
              type="checkbox"
            />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-gray-100" for="round_trip"
              >Round Trip</label
            >
          </div>
        </div>
        <Field v-model="placeDataOrigin" name="placeDataOrigin" type="hidden" />
        <Field
          v-model="placeDataDestination"
          name="placeDataDestination"
          type="hidden"
        />
        <Field v-model="tripData" name="tripData" type="hidden" />
        <Field
          v-model="calculatedDistance"
          name="calculatedDistance"
          type="hidden"
        />
        <Field v-model="isItHourly" name="isItHourly" type="hidden" />
        <Field v-model="gtmValues" name="gtmValues" type="hidden" />
        <Field v-model="pickupDate" name="pickupDate" type="hidden" />
        <Field v-model="pickupTime" name="pickupTime" type="hidden" />
        <Field v-model="isRoundTrip" name="isRoundTrip" type="hidden" />
        <Field v-model="returnDate" name="returnDate" type="hidden" />
        <Field v-model="returnTime" name="returnTime" type="hidden" />
      </div>
      <div class="flex flex-row">
        <button
          id="submit_button"
          class="inline-flex w-full items-center rounded border border-transparent bg-red-600 px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          type="submit"
        >
          <span class="mx-auto self-center">{{
            loading ? 'Processing.....' : 'Get Prices & Availability'
          }}</span>
        </button>
      </div>
    </Form>
  </div>
</template>
