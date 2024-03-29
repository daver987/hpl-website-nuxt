<script lang="ts" setup>
import { useMessage, useLoadingBar } from 'naive-ui'
import { VueTelInput } from 'vue-tel-input'
import { useUserStore } from '~/stores/useUserStore'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'
import { useGtm } from '@gtm-support/vue-gtm'
import { ref } from '#imports'
import type { FormValue } from '~/utils/formUtils'
import type { Place } from '~/schema/placeSchema'
import type { ComputedRef, Ref, WatchCallback } from 'vue'
import type { FormInst, FormRules, SelectOption } from 'naive-ui'
import type { Service, Vehicle } from '~/schema/prismaSchemas'

const formRef = ref<FormInst | null>(null)
const loading: Ref<boolean> = ref(false)
const quoteStore = useQuoteStore()
const userStore = useUserStore()
const { user_id } = storeToRefs(userStore)

const message = useMessage()
const loadingBar = useLoadingBar()

const { data: vehicle } = await useTrpc().vehicle.get.useQuery()
const { data: service } = await useTrpc().service.get.useQuery()
const { data: lineItem } = await useTrpc().lineItem.get.useQuery()
const { data: salesTax } = await useTrpc().salesTax.get.useQuery()

const vehicleOptions: ComputedRef<SelectOption[] | null> = computed(() => {
  return computeVehicleOptions(vehicle.value as Vehicle[])
})
const serviceOptions = computed(() => {
  return computeServiceOptions(service.value as Service[])
})
const hoursOptions = computed(() => {
  return computeHoursOptions()
})

const route = useRoute()
const gtmValues = route.query

const formValue: Ref<FormValue> = ref({
  id: user_id.value,
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
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
  vehicle_number: null,
  service_number: null,
  is_round_trip: false,
  is_hourly: false,
  vehicle: null,
  service: null,
  line_items: lineItem,
  sales_tax: salesTax,
})
formValue.value.service = computed(() => {
  return getServiceTypeByNumber(service.value, formValue.value.service_number!)
})
formValue.value.vehicle = computed(() => {
  return getVehicleTypeByNumber(vehicle.value, formValue.value.vehicle_number!)
})

const maxPassengers = computed(() => {
  const vehicleType = vehicleOptions.value?.find(
    (type: SelectOption) =>
      type.value === (formValue.value.vehicle_number as number)
  )
  return vehicleType ? vehicleType.max_passengers : 3
})

const passengerOptions = computed(() => {
  return computePassengerOptions(maxPassengers?.value as number)
})

watch(
  () => formValue.value.vehicle_number,
  () => {
    formValue.value.selected_passengers = null
  }
)
const isDisabled = ref(true)
watch(
  () => formValue.value.service,
  () => {
    //@ts-ignore
    if (formValue.value.service?.is_hourly) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
      formValue.value.selected_hours = null
    }
  }
)

const rules: FormRules = {
  pickup_date: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },
  pickup_time: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup time',
    trigger: ['blur'],
  },
  return_date: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off date',
    trigger: ['blur'],
  },
  return_time: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off time',
    trigger: ['blur'],
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
  vehicle_number: {
    type: 'number',
    trigger: ['blur', 'change'],
    required: true,
    message: 'Please select a vehicle type',
  },
  service_number: {
    type: 'number',
    message: 'Please select a service type',
    trigger: ['blur', 'change'],
    required: true,
  },
  first_name: {
    required: true,
    message: 'First name is required',
    trigger: ['blur'],
  },
  last_name: {
    required: true,
    message: 'Last name is required',
    trigger: ['blur'],
  },
  email_address: {
    required: true,
    message: 'Please enter a valid email',
    trigger: ['blur'],
  },
  phone_number: {
    required: true,
    message: 'Phone number is required',
    trigger: ['blur'],
  },
}

const inputOptions = ref({
  id: 'phone_number',
  showDialCode: false,
  name: 'phone_number',
  type: 'tel',
  ariaDescribedby: 'name',
  ariaLabeledBy: 'placeholder',
  placeholder: 'Enter Phone Number...',
})
const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showSearchBox: false,
  showDialCodeInList: true,
})

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
    formValue.value.service_number = fromAirportServiceType
  } else if (isDestinationAirport) {
    formValue.value.service_number = toAirportServiceType
  } else {
    formValue.value.service_number = null
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

const gtm = useGtm()
const gclidCookie = useCookie('gclid')
const tags = useRuntimeConfig().public

function triggerEvent(quoteTotal: number) {
  gtm?.trackEvent({
    event: 'submitQuote',
    event_category: 'Quote',
    event_label: 'Request Quote',
    value: quoteTotal,
    send_to: 'G-518WJRZ7J3',
    conversion: 11019465988,
    conversion_label: 'ljvLCNTmiIMYEITqvoYp',
    gclid: gclidCookie.value,
    non_interaction: false,
  })
}

function setEnhancedTracking(
  email: string,
  phone: string,
  quoteNumber: number,
  userId: string
) {
  const formattedPhoneNumber: string = phone.replace(/\s+/g, '')

  gtm?.trackEvent({
    set: 'user_data',
    email: email,
    phone_number: formattedPhoneNumber,
  })

  gtm?.trackEvent({
    set: 'quote_number',
    quote_number: quoteNumber,
  })

  gtm?.trackEvent({
    set: 'user_id',
    user_id: userId,
  })
}

async function onSubmit() {
  try {
    loading.value = true
    const quoteData = await useTrpc().quote.postQuote.mutate(formValue.value)
    quoteStore.setQuote(quoteData)
    setTimeout(async () => {
      setEnhancedTracking(
        formValue.value.email_address,
        formValue.value.phone_number,
        quoteData.quote_number,
        user_id.value
      )
      triggerEvent(quoteData.quote_total)
      await navigateTo({
        path: '/cart',
        query: { quote_number: quoteData.quote_number },
      })
    }, 500)
  } catch (e) {
    setTimeout(() => {
      console.log('error', e)
    }, 500)
  } finally {
    loading.value = false
    loadingBar.finish()
  }
}

async function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  try {
    const errors = await formRef.value?.validate()
    if (errors) {
      console.log(errors)
      message.error('Please correct the errors on the form')
    } else {
      loadingBar.start()
      await onSubmit()
      message.success(
        'You will receive a copy of the quote to the email address provided'
      )
    }
  } catch (error) {
    console.error('Error during form validation:', error)
    message.error('An error occurred. Please try again.')
  } finally {
    loadingBar.finish()
  }
}

function disablePreviousDate(ts: number) {
  return ts < new Date().getTime() - 24 * 60 * 60 * 1000
}

//todo: add cheaper pricing for airport pickups
</script>

<template>
  <n-config-provider>
    <n-grid :cols="1" responsive="self">
      <n-grid-item :span="1">
        <div
          class="border-1 rounded border border-white bg-black p-4 sm:mx-auto sm:w-full sm:max-w-2xl sm:overflow-hidden sm:rounded-lg"
        >
          <h2 class="mb-4 mt-2 text-center text-3xl uppercase text-white">
            Instant Quote
          </h2>
          <n-form
            id="quote_form"
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
          >
            <n-grid :cols="4" :x-gap="12" item-responsive>
              <n-form-item-gi
                :show-label="false"
                :span="4"
                label="Pickup Location"
                path="origin"
              >
                <InputPlacesAutocompleteDark
                  name="origin"
                  placeholder="Enter Pickup Location...."
                  @change="handleChangeOrigin"
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                :span="4"
                label="Drop-off Location"
                path="destination"
              >
                <InputPlacesAutocompleteDark
                  name="destination"
                  placeholder="Enter Drop-off Location...."
                  @change="handleChangeDestination"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :show-label="false"
                :span="2"
                label="Pickup Date"
                path="pickup_date"
              >
                <n-date-picker
                  v-model:formatted-value="formValue.pickup_date as string"
                  :default-value="Date.now()"
                  :is-date-disabled="disablePreviousDate"
                  input-readonly
                  placeholder="Select Pickup Date..."
                  type="date"
                  value-format="PPP"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :show-label="false"
                :span="2"
                label="Pickup Date and Time"
                path="pickup_time"
              >
                <n-space justify="space-between">
                  <n-time-picker
                    v-model:formatted-value="formValue.pickup_time as string"
                    :clearable="true"
                    format="h:mm a"
                    input-readonly
                    use12-hours
                    value-format="p"
                  />
                  <n-switch
                    v-if="false"
                    v-model:value="formValue.is_round_trip"
                  >
                    <template #checked> Round</template>
                    <template #unchecked> One Way</template>
                  </n-switch>
                </n-space>
              </n-form-item-gi>
            </n-grid>
            <n-collapse-transition v-if="false" :show="formValue.is_round_trip">
              <n-grid :cols="2" :x-gap="12" item-responsive>
                <n-form-item-gi
                  :show-label="false"
                  :span="1"
                  label="Return Date"
                  path="dateTime.return_date"
                >
                  <n-date-picker
                    v-model:value="formValue.return_date as any"
                    :default-value="Date.now()"
                    :is-date-disabled="disablePreviousDate"
                    input-readonly
                    placeholder="Select Return Date"
                    type="date"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :show-label="false"
                  :span="1"
                  label="Return Time"
                  path="dateTime.return_time"
                >
                  <n-time-picker
                    v-model:value="formValue.return_time as any"
                    :clearable="true"
                    format="h:mm a"
                    input-readonly
                    use12-hours
                  />
                </n-form-item-gi>
              </n-grid>
            </n-collapse-transition>
            <n-grid :cols="2" :x-gap="12" item-responsive>
              <n-form-item-gi
                :show-label="false"
                label="Service Type"
                path="service_number"
                span="0:2 500:1"
              >
                <n-select
                  v-model:value="formValue.service_number"
                  :input-props="{
                    id: 'service_type',
                  }"
                  :options="serviceOptions as SelectOption[]"
                  placeholder="Select Service Type..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Vehicle Type"
                path="vehicle_number"
                span="0:2 500:1"
              >
                <n-select
                  v-model:value="formValue.vehicle_number"
                  :input-props="{
                    id: 'vehicle_type',
                  }"
                  :options="vehicleOptions as SelectOption[]"
                  placeholder="Select Vehicle Type..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Passengers"
                path="selected_passengers"
                span="0:2 500:1"
              >
                <n-select
                  v-model:value="formValue.selected_passengers"
                  :input-props="{
                    id: 'passengers',
                  }"
                  :options="passengerOptions as SelectOption[]"
                  placeholder="Select Passengers..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Hours"
                path="selected_hours"
                span="0:2 500:1"
              >
                <n-select
                  v-model:value="formValue.selected_hours"
                  :disabled="isDisabled"
                  :input-props="{
                    id: 'hours',
                  }"
                  :options="hoursOptions"
                  placeholder="For Hourly Service..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="First Name"
                path="first_name"
                span="0:2 500:1"
              >
                <n-input
                  v-model:value="formValue.first_name"
                  :input-props="{
                    id: 'first_name',
                    type: 'text',
                  }"
                  placeholder="Enter First Name..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Last Name"
                path="last_name"
                span="0:2 500:1"
              >
                <n-input
                  v-model:value="formValue.last_name"
                  :input-props="{
                    id: 'last_name',
                    type: 'text',
                  }"
                  placeholder="Enter Last Name..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Email Address"
                path="email_address"
                span="0:2 500:1"
              >
                <n-input
                  v-model:value="formValue.email_address"
                  :input-props="{
                    id: 'email_address',
                    type: 'email',
                  }"
                  placeholder="Enter Email Address..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="Phone Number"
                path="phone_number"
                required
                span="0:2 500:1"
              >
                <VueTelInput
                  id="phone_number"
                  v-model="formValue.phone_number"
                  :dropdown-options="dropdownOptions"
                  :input-options="inputOptions"
                  aria-label="phone input"
                  invalidMsg="Please Enter In A Phone Number"
                />
              </n-form-item-gi>
            </n-grid>
            <n-button
              :loading="loading"
              color="#b91c1c"
              size="large"
              style="
                width: 100%;
                text-transform: uppercase;
                background-color: #b91c1c;
              "
              @click="handleValidateButtonClick"
              >Get Prices & Availability
            </n-button>
          </n-form>
        </div>
      </n-grid-item>
    </n-grid>
  </n-config-provider>
</template>
