<script setup lang="ts">
import { FormInst, useMessage, FormRules } from 'naive-ui'
import { WatchCallback } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import { VehicleType } from '~/server/api/vehicles.get'
import { ServiceType } from '~/server/api/services.get'
import { LineItem } from '~/server/api/items.get'
import { SalesTax } from '~/server/api/salestax.get'
import { useGtm } from '@gtm-support/vue-gtm'
import { z } from 'zod'
import { useStorage } from '@vueuse/core'
import { useDataStore } from '~/stores/useDataStore'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const { vehicleTypes, serviceTypes, lineItems, salesTaxes } =
  storeToRefs(dataStore)

const [vehicleTypesRes, serviceTypesRes, lineItemsRes, salesTaxesRes] =
  await Promise.all([
    useFetch<VehicleType | undefined>('/api/vehicles'),
    useFetch<ServiceType | undefined>('/api/services'),
    useFetch<LineItem | undefined>('/api/items'),
    useFetch<SalesTax | undefined>('/api/salestax'),
  ])

vehicleTypes.value = vehicleTypesRes?.data || []
serviceTypes.value = serviceTypesRes?.data || []
lineItems.value = lineItemsRes?.data || []
salesTaxes.value = salesTaxesRes?.data || []

dataStore.setVehicleTypes(vehicleTypes.value)
dataStore.setServiceTypes(serviceTypes.value)
dataStore.setLineItems(lineItems.value)
dataStore.setSalesTaxes(salesTaxes.value)

const { userId, checkUser } = useUserData()
onMounted(() => checkUser())
console.log(userId)

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

const inputOptions = ref({
  id: 'phone-number',
  required: true,
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

type HoursRequiredOption = {
  label: string
  value: number
}

const buildHoursRequiredOptions = (): HoursRequiredOption[] => {
  const options: HoursRequiredOption[] = []
  for (let i = 2; i <= 12; i++) {
    options.push({
      label: `${i} hours`,
      value: i,
    })
  }
  return options
}

const hourlyOptions: HoursRequiredOption[] = buildHoursRequiredOptions()

const message = useMessage()

interface FormValue {
  first_name: string | null
  last_name: string | null
  email_address: string | null
  phone_number: string | null
  conversion: any
  origin: Place
  destination: Place
  pickup_date: number | null
  pickup_time: number | null
  return_date: number | null
  return_time: number | null
  selected_hours: number | null
  selected_passengers: number | null
  is_hourly: boolean
  vehicle_id: number | null
  service_id: number | null
  is_round_trip: boolean
  vehicleTypes: VehicleType[]
  serviceTypes: ServiceType[]
  lineItems: LineItem[]
  salesTaxes: SalesTax[]
}

const formValue: Ref<FormValue> = ref({
  first_name: null,
  last_name: null,
  email_address: null,
  phone_number: null,
  conversion: {
    ...gtmValues,
  },
  origin: {} as Place,
  destination: {} as Place,
  pickup_date: null,
  pickup_time: null,
  return_date: null,
  return_time: null,
  selected_hours: null,
  selected_passengers: null,
  is_hourly: computed(() => {
    return formValue.value.service_id === 4
  }),
  vehicle_id: null,
  service_id: null,
  is_round_trip: false,
  vehicleTypes: vehicleTypes.value,
  serviceTypes: serviceTypes.value,
  lineItems: lineItems.value,
  salesTaxes: salesTaxes.value,
})

const rules: FormRules = {
  pickup_date: {
    type: 'number',
    required: true,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },
  pickup_time: {
    type: 'number',
    required: true,
    message: 'Please enter a pickup time',
    trigger: 'blur',
  },
  return_date: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off date',
    trigger: 'blur',
  },
  return_time: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off time',
    trigger: 'blur',
  },
  selected_hours: {
    type: 'number',
    required: false,
    message: 'Please enter in the amount of hours',
    trigger: ['blur', 'change'],
  },
  selected_passengers: {
    type: 'number',
    message: 'Passengers is required',
    trigger: ['blur', 'change'],
    required: true,
  },
  vehicle_id: {
    type: 'number',
    trigger: ['blur', 'change'],
    required: true,
    message: 'Please select a vehicle type',
  },
  service_id: {
    type: 'number',
    message: 'Please select a service type',
    trigger: ['blur', 'change'],
    required: true,
  },
  first_name: {
    required: true,
    message: 'First name is required',
    trigger: 'blur',
  },
  last_name: {
    required: true,
    message: 'Last name is required',
    trigger: 'blur',
  },
  email_address: {
    required: true,
    message: 'Email is required',
    trigger: 'blur',
  },
  phone_number: {
    required: true,
    message: 'Phone number is required',
    trigger: 'blur',
  },
}

const serviceTypeOptions = serviceTypes
const vehicleTypeOptions = vehicleTypes

interface VehicleTypeOption {
  label: string
  value: number
  max_passengers: number
}

const maxPassengers = computed<number>(() => {
  const vehicleType = vehicleTypeOptions.value!.find(
    (type: VehicleTypeOption) => type.value === formValue.value.vehicle_id
  )
  formValue.value.selected_passengers = null
  return vehicleType ? vehicleType.max_passengers : 3
})

const passengerOptions = computed(() =>
  buildPassengerOptions(maxPassengers.value)
)

function buildPassengerOptions(numPassengers: number) {
  const options = [
    {
      label: '1 Passenger',
      value: 1,
      isDisabled: false,
    },
  ]
  for (let i = 2; i <= numPassengers; i++) {
    options.push({
      label: `${i} Passengers`,
      value: i,
      isDisabled: false,
    })
  }
  return options
}

const placeSchema = z
  .object({
    place_id: z.string(),
    formatted_address: z.string(),
    name: z.string(),
    types: z.array(z.string()),
  })
  .strip()

type Place = z.infer<typeof placeSchema>

function isAirport(place?: Place): boolean {
  if (!place) {
    return false
  }
  try {
    return placeSchema.parse(place).types.includes('airport')
  } catch (error) {
    return false
  }
}

const handleFormValueChange: WatchCallback<
  [typeof formValue.value.origin, typeof formValue.value.destination]
> = ([origin, destination]) => {
  if (!origin || !destination) {
    return
  }

  const isOriginAirport = isAirport(origin)
  const isDestinationAirport = isAirport(destination)
  const fromAirportServiceType = 3
  const toAirportServiceType = 2

  if (isOriginAirport) {
    formValue.value.service_id = fromAirportServiceType
  } else if (isDestinationAirport) {
    formValue.value.service_id = toAirportServiceType
  } else {
    formValue.value.service_id = 0
  }
}

watch(
  [() => formValue.value.origin, () => formValue.value.destination],
  handleFormValueChange,
  {
    deep: true,
  }
)

const handleChangeOrigin = (evt: Place) => {
  formValue.value.origin = evt
}

const handleChangeDestination = (evt: Place) => {
  formValue.value.destination = evt
}

const formRef = ref<FormInst | null>(null)
const loading = ref(false)
const qData = ref<any>('')

async function onSubmit() {
  try {
    loading.value = true
    const { data: quoteData } = await useFetch('/api/quote', {
      method: 'POST',
      body: formValue.value,
    })
    qData.value = await quoteData.value
    console.log('Quote data is:', qData.value)

    // Save quote data in local storage
    const quoteDataStorage = useStorage('quote_data', quoteData)
    quoteDataStorage.value = quoteData.value

    setTimeout(async () => {
      // Navigate to checkout page
      // await navigateTo('/checkout')
      loading.value = false
    }, 500)
  } catch (e) {
    setTimeout(() => {
      loading.value = false
      console.log('error')
    }, 500)
  }
}

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (errors) {
      console.log(errors)
      message.error('Invalid')
    } else {
      message.success('Valid')
    }
  })
}
</script>

<template>
  <n-grid :cols="2">
    <n-grid-item :span="1">
      <n-card>
        <pre
          >{{ JSON.stringify(formValue, null, 2) }}
</pre
        >
        <pre
          >{{ JSON.stringify(qData, null, 2) }}
</pre
        >
      </n-card>
    </n-grid-item>
    <n-grid-item :span="1">
      <div
        class="border-1 rounded border border-white bg-black p-4 sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden sm:rounded-lg"
      >
        <h2 class="mt-2 mb-4 text-center text-3xl uppercase text-white">
          Instant Quote
        </h2>
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
        >
          <n-grid :cols="24" :x-gap="12">
            <n-form-item-gi
              :show-label="false"
              label="Pickup Location"
              :span="24"
              path="origin"
            >
              <InputPlacesAutocompleteDark
                @change="handleChangeOrigin"
                name="origin"
                placeholder="Enter Pickup Location...."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :show-label="false"
              :span="24"
              label="Dropoff Location"
              path="destination"
            >
              <InputPlacesAutocompleteDark
                name="destination"
                @change="handleChangeDestination"
                placeholder="Enter Dropoff Location...."
              />
            </n-form-item-gi>
            <n-form-item-gi
              path="pickup_date"
              :span="12"
              :show-label="false"
              label="Pickup Date"
            >
              <n-date-picker
                v-model:value="formValue.pickup_date"
                type="date"
                placeholder="Select Pickup Date..."
                :default-value="Date.now()"
              />
            </n-form-item-gi>
            <n-form-item-gi
              path="pickup_time"
              :span="12"
              :show-label="false"
              label="Pickup Date and Time"
            >
              <n-time-picker
                v-model:value="formValue.pickup_time"
                format="h:mm a"
                :clearable="true"
              />
              <n-switch v-model:value="formValue.is_round_trip">
                <template #checked> Round</template>
                <template #unchecked> One Way</template>
              </n-switch>
            </n-form-item-gi>
          </n-grid>
          <n-collapse-transition :show="formValue.is_round_trip">
            <n-grid :cols="24" :x-gap="12">
              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Return Date"
                path="dateTime.return_date"
              >
                <n-date-picker
                  v-model:value="formValue.return_date"
                  type="date"
                  placeholder="Select Return Date"
                  :default-value="Date.now()"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Return Time"
                path="dateTime.return_time"
              >
                <n-time-picker
                  v-model:value="formValue.return_time"
                  format="h:mm a"
                  :clearable="true"
                />
              </n-form-item-gi>
            </n-grid>
          </n-collapse-transition>
          <n-grid :cols="24" :x-gap="12">
            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Service Type"
              path="selected_service_type_value"
            >
              <n-select
                v-model:value="formValue.service_id"
                :options="serviceTypeOptions"
                placeholder="Select Service Type..."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Vehicle Type"
              path="selected_vehicle_type_value"
            >
              <n-select
                v-model:value="formValue.vehicle_id"
                :options="vehicleTypeOptions"
                placeholder="Select Vehicle Type..."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Passengers"
              path="selected_passengers"
            >
              <n-select
                v-model:value="formValue.selected_passengers"
                :options="passengerOptions"
                placeholder="Select Passengers..."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Hours"
              path="selected_hours"
            >
              <n-select
                v-model:value="formValue.selected_hours"
                :options="hourlyOptions"
                placeholder="For Hourly Service..."
                :disabled="!formValue.is_hourly"
              />
            </n-form-item-gi>

            <n-form-item-gi
              :show-label="false"
              label="First Name"
              path="first_name"
              :span="12"
            >
              <n-input
                v-model:value="formValue.first_name"
                placeholder="Enter First Name..."
                :show-label="false"
                label="Phone Number"
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Last Name"
              path="last_name"
            >
              <n-input
                v-model:value="formValue.last_name"
                placeholder="Enter Last Name..."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              :show-label="false"
              label="Email Address"
              path="email_address"
            >
              <n-input
                v-model:value="formValue.email_address"
                placeholder="Enter Email Address..."
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              path="phone_number"
              :show-label="false"
              label="Phone Number"
            >
              <VueTelInput
                v-model="formValue.phone_number"
                :dropdown-options="dropdownOptions"
                :input-options="inputOptions"
                aria-label="phone input"
                style-classes="rounded border border-gray-300 pr-1 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
              />
            </n-form-item-gi>
          </n-grid>
          <n-space justify="space-between">
            <n-button @click="onSubmit"> Get Prices and Availability</n-button>
            <n-button @click="handleValidateClick"> Reset</n-button>
          </n-space>
        </n-form>
      </div>
    </n-grid-item>
  </n-grid>
</template>
