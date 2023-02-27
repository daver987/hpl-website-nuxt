<script lang="ts" setup>
import { Place } from '~/types/DirectionsResponse'
import { formSchema } from '~/schema/quoteFormValues'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { useQuoteStore } from '~/stores/useQuoteStore'
// import { useServiceTypesStore } from '~/stores/useServiceTypesStore'
// import { useVehicleTypeStore } from '~/stores/useVehicleTypeStore'
// import { useTripStore } from '~/stores/useTripStore'
import { storeToRefs } from 'pinia'
import { useGtm } from '@gtm-support/vue-gtm'
import Datepicker from '~/components/datepicker/Datepicker.vue'

// const tripStore = useTripStore()
// const { origin, destination, tripData } = storeToRefs(tripStore)

// const vehicleTypeStore = useVehicleTypeStore()
// await vehicleTypeStore.getVehicleTypes()
// const { vehicleTypes } = storeToRefs(vehicleTypeStore)
//
// const serviceTypesStore = useServiceTypesStore()
// await serviceTypesStore.getServiceTypes()
// const { serviceTypeOptions } = storeToRefs(serviceTypesStore)

const route = useRoute()
const gtmValues = route.query

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
  name: 'phone_number',
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

const originPlaceId = ref<string>('')
const destinationPlaceId = ref<string>('')
const pickupDate = ref(undefined)
const pickupTime = ref(undefined)
const returnDate = ref(new Date())
const returnTime = ref(new Date())
const isItHourly = ref<boolean>(false)
const isRoundTrip = ref<boolean>(false)
const first_name = ref<string>('')
const last_name = ref<string>('')
const email_address = ref<string>('')
const phone_number = ref<string>('')
const disabled = ref<boolean>(true)

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

const selectedServiceType = ref(serviceTypeOptions.value![0])

watch(selectedServiceType, () => {
  const value = selectedServiceType.value.value === 4
  isItHourly.value = value
  disabled.value = !value
  hoursRequiredClasses.value = value
    ? 'text-gray-400'
    : 'cursor-not-allowed opacity-50 text-gray-300'
  selectedNumberOfHours.value = hoursRequiredOptions.value[0]
})

const vehicleTypeOptions = ref(extractOptions(vehicleTypes.value))
const selectedVehicleType = ref(vehicleTypeOptions.value![0])

watch(selectedVehicleType, () => {
  let passengerLimit = 3
  if (selectedVehicleType.value?.value === 3) {
    passengerLimit = 7
  } else if (selectedVehicleType.value.value === 4) {
    passengerLimit = 6
  }
  passengerOptions.value = buildPassengerOptions(passengerLimit)
  selectedPassengers.value = passengerOptions.value[0]
})

const originType = ref<string[]>([])
const destinationType = ref<string[]>([])

const onPlaceChange = async (evt: Place, placeType: string) => {
  const place = evt
  const { place_id, types } = place
  console.log(`${placeType === 'origin' ? 'Origin' : 'Destination'}:`, place)
  placeType === 'origin' ? (origin.value = place) : (destination.value = place)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { data } = await useFetch('/api/get-distance', {
      method: 'GET',
      query: {
        origin: origin.value.place_id,
        destination: destination.value.place_id,
      },
    })

    tripData.value = {
      ...Object.entries(origin.value).reduce(
        (obj, [key, value]) => ({ ...obj, [`origin_${key}`]: value }),
        {}
      ),
      ...Object.entries(destination.value).reduce(
        (obj, [key, value]) => ({ ...obj, [`destination_${key}`]: value }),
        {}
      ),
      ...data.value,
      ...gtmValues,
    }
    console.log('Combined Data:', tripData.value)
  } else {
    console.log(
      `only ${placeType === 'origin' ? 'origin' : 'destination'} is set`
    )
    console.log(
      `${placeType === 'origin' ? 'origin' : 'destination'} place id is:`,
      place_id
    )
    if (placeType === 'origin') {
      originPlaceId.value = place_id
      originType.value = types
    } else {
      destinationPlaceId.value = place_id
      destinationType.value = types
    }
  }
}

watch([originType, destinationType], () => {
  let serviceTypeIndex = 0

  if (originType.value.includes('airport')) {
    serviceTypeIndex = 3
  }
  if (destinationType.value.includes('airport')) {
    serviceTypeIndex = 2
  }
  if (
    originType.value.includes('airport') &&
    destinationType.value.includes('airport')
  ) {
    serviceTypeIndex = 3
  }
  selectedServiceType.value = serviceTypeOptions.value![serviceTypeIndex]
})

const validationSchema = toFormValidator(formSchema)
const loading = ref(false)
const openAlert = ref(false)

const quoteStore = useQuoteStore()
const { quote: cartData } = storeToRefs(quoteStore)

async function onSubmit(values: any) {
  loading.value = true
  console.log('values are:', values)
  const { data: returnedQuoteValues } = await useFetch('/api/submission', {
    method: 'POST',
    body: values,
  })
  const { hplUserId, quote_number } = returnedQuoteValues?.value as any
  quoteStore.quote_number = quote_number.toString()
  localStorage.setItem('hplUserId', hplUserId)
  localStorage.setItem('quote_number', quote_number.toString())
  localStorage.setItem('quote_data', JSON.stringify(returnedQuoteValues.value))
  cartData.value = returnedQuoteValues.value!
  console.log('Returned data is:', returnedQuoteValues.value)

  if (returnedQuoteValues?.value?.statusCode === 200) {
    setTimeout(async () => {
      triggerEvent()
      loading.value = false
      await navigateTo('/quoted')
    }, 500)
    return
  } else {
    setTimeout(() => {
      loading.value = false
      openAlert.value = true
      console.log('error')
    }, 500)
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
          @change="onPlaceChange($event, 'origin')"
        />
        <ErrorMessage class="text-sm text-red-600" name="placeDataOrigin" />
      </div>
      <div class="grid w-full grid-cols-1 gap-3">
        <InputPlacesAutocomplete
          label="Drop Off Location:"
          name="destinationLocation"
          placeholder="Enter drop off location"
          @change="onPlaceChange($event, 'destination')"
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
            v-model="first_name"
            label="First Name:"
            name="first_name"
            placeholder="Enter first name"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="first_name" />
        </div>

        <div class="col-span-1">
          <InputText
            v-model="last_name"
            label="Last Name:"
            name="last_name"
            placeholder="Enter last name"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="last_name" />
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div class="col-span-1">
          <InputText
            v-model="email_address"
            label="Email Address:"
            name="email_address"
            placeholder="Enter Email Address"
            type="email"
          />
          <ErrorMessage class="text-sm text-red-600" name="email_address" />
        </div>
        <div class="col-span-1">
          <Field
            v-slot="{ field }"
            :validateOnBlur="true"
            :validateOnChange="false"
            :validateOnInput="false"
            :validateOnModelUpdate="false"
            name="phone_number"
          >
            <VueTelInput
              v-model="phone_number"
              :dropdown-options="dropdownOptions"
              :input-options="inputOptions"
              aria-label="phone input"
              style-classes="rounded border border-gray-300 pr-1 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
              v-bind="field"
            />
            <ErrorMessage class="text-sm text-red-600" name="phone_number" />
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
        <Field v-model="tripData" name="tripData" type="hidden" />
        <Field v-model="isItHourly" name="isItHourly" type="hidden" />
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
