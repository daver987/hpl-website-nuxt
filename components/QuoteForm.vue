<script lang="ts" setup>
import { Place } from '~/types/DirectionsResponse'
import { formSchema } from '~/schema/quoteFormValues'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { useForm, Field } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { Database } from '~/types/supabase'
import { ReturnedQuote } from '~/schema/returnedFormData'
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { z } from 'zod'
import { TripData } from '~~/types/data'
import { useGtm } from '@gtm-support/vue-gtm'

const gtm = useGtm()

const route = useRoute()
const routeUrl = route.query
console.log('Route Url', routeUrl)
const { utm_medium, utm_source, utm_campaign, utm_term, gclid } = routeUrl
const gtmValues = ref({
  utm_medium,
  utm_source,
  utm_campaign,
  utm_term,
  gclid,
})

function triggerEvent() {
  //@ts-ignore
  gtm.trackEvent({
    event: 'submitQuote',
    category: 'Request quote',
    action: 'click',
    label: 'Request Quote',
    value: 1,
    noninteraction: false,
  })
}

const selectFormData = z.object({
  label: z.string(),
  value: z.number(),
  isDisabled: z.boolean().optional(),
})

type SelectFormData = z.infer<typeof selectFormData>

const userStore = useUserStore()
const { hplUserId } = storeToRefs(userStore)

const supabase = useSupabaseClient<Database>()

const passengerClasses = ref('text-gray-400')
const passengerOptions = ref<SelectFormData[]>([
  {
    label: 'Select Passengers',
    value: 0,
    isDisabled: true,
  },
  {
    label: '1 passenger',
    value: 1,
    isDisabled: false,
  },
  {
    label: '2 passengers',
    value: 2,
    isDisabled: false,
  },
  {
    label: '3 passengers',
    value: 3,
    isDisabled: false,
  },
  {
    label: '4 passengers',
    value: 4,
    isDisabled: false,
  },
  {
    label: '5 passengers',
    value: 5,
    isDisabled: false,
  },
  {
    label: '6 passengers',
    value: 6,
    isDisabled: false,
  },
  {
    label: '7 passengers',
    value: 7,
    isDisabled: false,
  },
])
const selectedPassengers = ref<SelectFormData>(passengerOptions.value[0])

// get the service types to populate the select
const { data: serviceTypes } = await useAsyncData('service_type', async () => {
  const { data } = await supabase
    .from('service_type')
    .select('label,value,isDisabled')
  return data
})
const serviceTypeClasses = ref('text-gray-400')
const serviceTypeOptions = ref<SelectFormData[]>(
  // @ts-ignore
  serviceTypes.value.sort((a, b) => (a.value > b.value ? 1 : -1))
)
const selectedServiceType = ref<SelectFormData>(serviceTypeOptions.value[0])

// get the vehicle types to populate the select
const { data: vehicleTypes } = await useAsyncData('vehicle_type', async () => {
  const { data } = await supabase
    .from('vehicle_type')
    .select('label,value,isDisabled')
  return data
})
const vehicleTypeClasses = ref('text-gray-400')
const vehicleTypeOptions = ref<SelectFormData[]>(
  // @ts-ignore
  vehicleTypes.value.sort((a, b) => (a.value > b.value ? 1 : -1))
)
const selectedVehicleType = ref<SelectFormData>(vehicleTypeOptions.value[0])

const hoursRequiredClasses = ref('cursor-not-allowed opacity-50 text-gray-300')
const hoursRequiredOptions = ref<SelectFormData[]>([
  {
    label: 'For Hourly Service Only',
    value: 0,
    isDisabled: true,
  },
])
const selectedNumberOfHours = ref<SelectFormData>(hoursRequiredOptions.value[0])

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
})
const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showSearchBox: true,
  showDialCodeInList: true,
})

const origin = ref<Place | null>(null)
const originPlaceId = ref<string>('')
const destination = ref<Place | null>(null)
const destinationPlaceId = ref<string>('')
const calculatedDistance = ref<number>(0)
const pickupDate = ref<string>('')
const pickupTime = ref<string>('')
const returnDate = ref<string>('')
const returnTime = ref<string>('')
const isItHourly = ref<boolean>(false)
const tripData = ref<TripData | null>(null)
const placeDataOrigin = ref<Place | null>(null)
const placeDataDestination = ref<Place | null>(null)
const isRoundTrip = ref<boolean>(false)
const firstName = ref<string>('')
const lastName = ref<string>('')
const emailAddress = ref<string>('')
const phoneNumber = ref<string>('')
const disabled = ref<boolean>(true)

watch(selectedServiceType, () => {
  if (selectedServiceType.value.value === 4) {
    isItHourly.value = true
    disabled.value = false
    hoursRequiredClasses.value = <string>'text-gray-400'
    hoursRequiredOptions.value = <SelectFormData[]>[
      {
        label: 'Select Hours',
        value: 0,
        isDisabled: true,
      },
      {
        label: '2 hrs',
        value: 2,
        isDisabled: false,
      },
      {
        label: '3 hrs',
        value: 3,
        isDisabled: false,
      },
      {
        label: '4 hrs',
        value: 4,
        isDisabled: false,
      },
      {
        label: '5 hrs',
        value: 5,
        isDisabled: false,
      },
      {
        label: '6 hrs',
        value: 6,
        isDisabled: false,
      },
      {
        label: '7 hrs',
        value: 7,
        isDisabled: false,
      },
      {
        label: '8 hrs',
        value: 8,
        isDisabled: false,
      },
      {
        label: '9 hrs',
        value: 9,
        isDisabled: false,
      },
      {
        label: '10 hrs',
        value: 10,
        isDisabled: false,
      },
      {
        label: '11 hrs',
        value: 11,
        isDisabled: false,
      },
      {
        label: '12 hrs',
        value: 12,
        isDisabled: false,
      },
    ]
    selectedNumberOfHours.value = hoursRequiredOptions
      .value[0] as SelectFormData
  } else {
    isItHourly.value = false
    disabled.value = true
    hoursRequiredClasses.value = <string>(
      'cursor-not-allowed opacity-50 text-gray-300'
    )
    hoursRequiredOptions.value = <SelectFormData[]>[
      {
        label: 'For Hourly Service',
        value: 0,
        isDisabled: true,
      },
    ]
    selectedNumberOfHours.value = hoursRequiredOptions
      .value[0] as SelectFormData
  }
  console.log(
    selectedServiceType.value.label as string,
    selectedServiceType.value.value,
    selectedNumberOfHours.value.label,
    isItHourly.value
  )
})
watch(selectedServiceType, () => {
  if (selectedServiceType.value.value === 0) {
    serviceTypeClasses.value = 'text-gray-400' as string
  } else {
    serviceTypeClasses.value = 'text-gray-900' as string
  }
})
watch(selectedVehicleType, () => {
  if (selectedVehicleType.value.value === 1 || 2) {
    passengerOptions.value = <SelectFormData[]>[
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
      {
        label: '2 Passengers',
        value: 2,
        isDisabled: false,
      },
      {
        label: '3 Passengers',
        value: 3,
        isDisabled: false,
      },
    ]
    selectedPassengers.value = passengerOptions.value[0] as SelectFormData
  }
  if (selectedVehicleType.value.value === 3) {
    passengerOptions.value = <SelectFormData[]>[
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
      {
        label: '2 Passengers',
        value: 2,
        isDisabled: false,
      },
      {
        label: '3 Passengers',
        value: 3,
        isDisabled: false,
      },
      {
        label: '4 Passengers',
        value: 4,
        isDisabled: false,
      },
      {
        label: '5 Passengers',
        value: 5,
        isDisabled: false,
      },
      {
        label: '6 Passengers',
        value: 6,
        isDisabled: false,
      },
      {
        label: '7 Passengers',
        value: 7,
        isDisabled: false,
      },
    ]
    selectedPassengers.value = passengerOptions.value[0] as SelectFormData
  }
  if (selectedVehicleType.value.value === 4) {
    passengerOptions.value = <SelectFormData[]>[
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
      {
        label: '2 Passengers',
        value: 2,
        isDisabled: false,
      },
      {
        label: '3 Passengers',
        value: 3,
        isDisabled: false,
      },
      {
        label: '4 Passengers',
        value: 4,
        isDisabled: false,
      },
      {
        label: '5 Passengers',
        value: 5,
        isDisabled: false,
      },
      {
        label: '6 Passengers',
        value: 6,
        isDisabled: false,
      },
    ]
    selectedPassengers.value = passengerOptions.value[0] as SelectFormData
  }
  console.log(
    selectedVehicleType.value.label as string,
    selectedVehicleType.value.value as number
  )
})
watch(selectedVehicleType, () => {
  if (selectedVehicleType.value.value === 0) {
    vehicleTypeClasses.value = 'text-gray-400' as string
  } else {
    vehicleTypeClasses.value = 'text-gray-900' as string
  }
})
watch(selectedPassengers, () => {
  if (selectedPassengers.value.value === 0) {
    passengerClasses.value = 'text-gray-400' as string
  } else {
    passengerClasses.value = 'text-gray-900' as string
  }
})
watch(selectedNumberOfHours, () => {
  if (selectedNumberOfHours.value.value !== 0) {
    hoursRequiredClasses.value = 'text-gray-900' as string
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
    const { data } = await useFetch<TripData>('/api/get-distance', {
      //@ts-ignore
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    console.log('query', {
      origin: originPlaceId.value,
      destination: place_id,
    })
    console.log('data is', data.value)
    //@ts-ignore
    tripData.value = data.value
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value

    console.log('Trip data:', tripData)
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
const isPearsonAirportDestination = ref<boolean>(false)
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
      //@ts-ignore
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })

    tripData.value = data.value
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
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
const { handleSubmit, errors } = useForm({
  validationSchema,
})

const loading = ref<boolean>(false)
const returnedQuote = ref<ReturnedQuote | unknown>(null)
const openAlert = ref<boolean>(false)

const onSubmit = handleSubmit(async (formValues) => {
  loading.value = true
  const values = formSchema.safeParse(formValues)
  console.log('values are:', values)
  const { data } = await useFetch('/api/submission', {
    //@ts-ignore
    method: 'POST',
    body: values,
  })
  returnedQuote.value = data.value as unknown as ReturnedQuote
  // @ts-ignore
  hplUserId.value = returnedQuote.value.hplUserId as unknown as string
  localStorage.setItem('hplUserId', hplUserId.value)
  //@ts-ignore
  localStorage.setItem('quote_data', JSON.stringify(returnedQuote.value))
  console.log('Returned data is:', returnedQuote.value)

  //@ts-ignore
  if (returnedQuote.value.statusCode === 200) {
    setTimeout(async () => {
      triggerEvent()
      loading.value = false
      await navigateTo('/quoted')
    }, 1500)
    return
  } else {
    setTimeout(() => {
      loading.value = false
      openAlert.value = true
    }, 1500)
    return
  }
})
</script>

<template>
  <div
    class="bg-black border border-white rounded sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden sm:rounded-lg border-1"
  >
    <h2 class="pt-5 text-3xl text-center text-white uppercase">
      Instant Quote
    </h2>
    <label aria-hidden="true" for="lead_form">Lead Form</label>
    <form
      id="lead_form"
      name="lead_form"
      class="p-5 space-y-3"
      @submit.prevent="onSubmit"
    >
      <div class="grid w-full grid-cols-1 gap-3">
        <InputPlacesAutocomplete
          label="Pick Up Location:"
          name="originLocation"
          placeholder="Enter pick up location"
          @change="onOriginChange"
        />
      </div>
      <div class="grid w-full grid-cols-1 gap-3">
        <InputPlacesAutocomplete
          label="Drop Off Location:"
          name="destinationLocation"
          placeholder="Enter drop off location"
          @change="onDestinationChange"
        />
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <InputDate
            v-model="pickupDate"
            name="pickupDate"
            placeholder="Enter A Pickup Date"
          />
        </div>
        <div class="md:col-span-1">
          <InputTime
            v-model="pickupTime"
            name="pickupTime"
            placeholder="Enter A Pickup Time"
          />
        </div>
      </div>
      <div
        :class="[isRoundTrip ? 'visible' : 'hidden']"
        class="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        <div class="col-span-1">
          <InputDate
            v-model="returnDate"
            name="returnDate"
            placeholder="Enter A Return Date"
          />
        </div>
        <div class="col-span-1">
          <InputTime
            v-model="returnTime"
            name="returnTime"
            placeholder="Enter A Return Time"
          />
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <Field
            v-slot="{ field, errors, errorMessage }"
            v-model="selectedServiceType"
            name="selectedServiceType"
          >
            <InputListbox
              v-model="selectedServiceType"
              :classes="serviceTypeClasses"
              :options="serviceTypeOptions"
              key-prop="selectedServiceType"
              label-prop="name"
              v-bind="field"
            />
            <span class="text-red-500">{{ errorMessage }}</span>
          </Field>
        </div>

        <div class="col-span-1">
          <Field
            v-slot="{ field, errorMessage }"
            v-model="selectedVehicleType"
            name="selectedVehicleType"
          >
            <InputListbox
              v-model="selectedVehicleType"
              :classes="vehicleTypeClasses"
              :options="vehicleTypeOptions"
              key-prop="selectedVehicleType"
              label="Vehicle Type"
              v-bind="field"
            />
            <span class="text-red-500">{{ errorMessage }}</span>
          </Field>
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <Field
            v-slot="{ field, errorMessage }"
            v-model="selectedPassengers"
            name="selectedPassengers"
          >
            <InputListbox
              v-model="selectedPassengers"
              :classes="passengerClasses"
              :options="passengerOptions"
              key-prop="selectedPassengers"
              label="Number of Passengers"
              v-bind="field"
            />
            <span class="text-red-500">{{ errorMessage }}</span>
          </Field>
        </div>

        <div class="col-span-1">
          <Field
            v-slot="{ field, errorMessage }"
            v-model="selectedNumberOfHours"
            name="selectedNumberOfHours"
          >
            <InputListbox
              v-model="selectedNumberOfHours"
              :classes="hoursRequiredClasses"
              :is-disabled="disabled"
              :options="hoursRequiredOptions"
              key-prop="selectedNumberOfHours"
              label="Number of Hours"
              v-bind="field"
            />
            <span class="text-red-500">{{ errorMessage }}</span>
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
        </div>

        <div class="col-span-1">
          <InputText
            v-model="lastName"
            label="Last Name:"
            name="lastName"
            placeholder="Enter last name"
            type="text"
          />
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
        </div>
        <div class="col-span-1">
          <Field
            v-slot="{ field, errorMessage }"
            v-model="phoneNumber"
            name="phoneNumber"
          >
            <VueTelInput
              aria-label="phone input"
              v-bind="field"
              v-model="phoneNumber"
              :dropdown-options="dropdownOptions"
              :input-options="inputOptions"
              :invalidMsg="errorMessage"
              style-classes="rounded border border-gray-300 pr-1 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
            ></VueTelInput>
          </Field>
        </div>
      </div>
      <div class="flex flex-row">
        <Field
          v-slot="{ field, errorMessage }"
          v-model="isRoundTrip"
          name="isRoundTrip"
        >
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                aria-describedby="comments-description"
                v-bind="field"
                id="round_trip"
                name="round_trip"
                v-model="isRoundTrip"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="round_trip" class="font-medium text-gray-100"
                >Round Trip</label
              >
            </div>
          </div>
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="placeDataOrigin"
          name="placeDataOrigin"
        >
          <input type="hidden" v-bind="field" v-model="placeDataOrigin" />
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="placeDataDestination"
          name="placeDataDestination"
        >
          <input type="hidden" v-bind="field" v-model="placeDataDestination" />
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="tripData"
          name="tripData"
        >
          <input type="hidden" v-bind="field" v-model="tripData" />
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="calculatedDistance"
          name="calculatedDistance"
        >
          <input type="hidden" v-bind="field" v-model="calculatedDistance" />
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="isItHourly"
          name="isItHourly"
        >
          <input type="hidden" v-bind="field" v-model="isItHourly" />
        </Field>
        <Field
          v-slot="{ field, errorMessage }"
          v-model="gtmValues"
          name="gtmValues"
        >
          <input type="hidden" v-bind="field" v-model="gtmValues" />
        </Field>
      </div>
      <div class="flex flex-row">
        <button
          id="submit_button"
          type="submit"
          class="inline-flex items-center w-full px-4 py-2 text-sm font-medium text-white uppercase bg-red-600 border border-transparent rounded shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <span class="self-center mx-auto">{{
            loading ? 'Processing.....' : 'Get Prices & Availability'
          }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
