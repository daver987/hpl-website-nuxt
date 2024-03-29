<script lang="ts" setup>
import { Ref } from 'vue'
import { useGtm } from '@gtm-support/vue-gtm'

definePageMeta({
  name: 'checkout',
  layout: 'store',
  colorMode: 'dark',
})

type CombinedLineItems = {
  label: string
  total: number
}

const stripeClient = useStripe()

const quoteNumberAsString = useRoute().query.quote_number as string
const quote = await getQuote(quoteNumberAsString)

const { vehicle, service, trips, user, quote_number, quote_total } = quote!

const combinedLineItems: Ref<CombinedLineItems[] | null> = ref(null)
combinedLineItems.value = quote?.combined_line_items as CombinedLineItems[]

const gtm = useGtm()
const gclidCookie = useCookie('gclid')
const tags = useRuntimeConfig().public

function triggerEvent(totalPrice: number) {
  gtm?.trackEvent({
    event: 'submitOrder',
    event_category: 'Purchase',
    event_label: 'Submit Order',
    value: totalPrice,
    send_to: tags.GA4_SEND_TO,
    conversion: tags.G_ADS_ORDER_SUBMIT_CONVERSION,
    conversion_label: tags.G_ADS_ORDER_SUBMIT_CONVERSION_LABEL,
    gclid: gclidCookie.value,
    non_interaction: false,
  })
}

function setEnhancedTracking(email: string, phone: string, order_id: string) {
  gtm?.trackEvent({
    set: 'user_data',
    email: email,
    phone_number: phone,
  })
  gtm?.trackEvent({
    set: 'orderId',
    orderId: order_id,
  })
}

const {
  fullName,
  emailAddress,
  paymentElement,
  phoneNumber,
  linkAuthenticationElement,
  clientSecret,
  websiteURL,
  quoteNumber,
  publicKey,
} = stripeClient

fullName.value = user.full_name!
emailAddress.value = user.email_address
phoneNumber.value = user.phone_number
clientSecret.value = useRoute().query.client_secret as string
quoteNumber.value = quote_number
websiteURL.value = useRuntimeConfig().public.WEBSITE_URL
publicKey.value = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY

onMounted(() => {
  nextTick(async () => {
    await stripeClient.initStripeElements()
  })
})

const totalPrice = quote_total.toFixed(2)
const isLoading = ref(false)

const submitOrder = async () => {
  try {
    isLoading.value = true
    setEnhancedTracking(emailAddress.value, phoneNumber.value, quote?.id!)
    triggerEvent(quote_total)

    const stripeResponse = await stripeClient.submitHandler()
    console.log('Stripe Response', stripeResponse)

    if (typeof stripeResponse?.success === 'number') {
      isLoading.value = false
    } else {
      throw new Error('Stripe submission failed.')
    }
  } catch (error) {
    console.error('An error occurred while processing the booking:', error)
    throw new Error('Booking failed.')
  }
}
</script>

<template>
  <div>
    <!-- Background color split screen for large screens -->
    <div
      aria-hidden="true"
      class="fixed left-0 top-0 hidden h-full w-1/2 bg-neutral-100 lg:block"
    />
    <div
      aria-hidden="true"
      class="fixed right-0 top-0 hidden h-full w-1/2 bg-brand-900 lg:block"
    />

    <header
      class="relative mx-auto max-w-7xl bg-brand-900 py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pb-6 lg:pt-6"
    >
      <div class="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
        <NuxtLink class="self-center" to="/">
          <span class="sr-only">High Park Livery</span>
          <NuxtPicture
            :img-attrs="{
              class: 'w-auto h-12 lg:h-14',
            }"
            alt="High Park Livery Logo"
            src="/images/HPL-Logo-Dark.png"
            width="1920"
          />
        </NuxtLink>
      </div>
    </header>

    <main
      class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8"
    >
      <h1 class="sr-only">Checkout</h1>

      <section
        aria-labelledby="summary-heading"
        class="bg-brand-900 pb-12 pt-2 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div
            class="rounded-lg bg-white p-6 text-brand-900 shadow-md dark:bg-neutral-400"
          >
            <dl>
              <dt class="text-lg font-medium">Amount Due</dt>
              <dd class="mt-1 text-3xl font-bold tracking-tight text-brand-900">
                $ {{ totalPrice }}
              </dd>
            </dl>

            <ul
              class="divide-y divide-neutral-200 text-sm font-medium"
              role="list"
            >
              <li
                v-for="trip in trips"
                :key="trip.pickup_time as string"
                class="flex items-start space-x-4 py-6"
              >
                <NuxtPicture
                  :alt="vehicle.label"
                  :img-attrs="{
                    class:
                      'h-32 w-32 flex-none rounded-md object-contain object-center',
                  }"
                  :src="vehicle.vehicle_image!"
                />
                <div class="flex-auto space-y-1">
                  <h3 class="text-brand-900">{{ service.label }}</h3>
                  <p class="text-brand-700">{{ vehicle.label }}</p>
                </div>
              </li>
            </ul>

            <dl
              class="space-y-6 border-t border-gray-200 pt-8 text-sm font-medium"
            >
              <div
                v-for="item in combinedLineItems"
                :key="item.label"
                class="flex items-center justify-between"
              >
                <dt v-if="item.label === 'Total' ? '' : item.label">
                  {{ item.label }}
                </dt>
                <dd v-if="item.label === 'Total' ? '' : item.label">
                  ${{ item.total }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-6 text-brand-900"
              >
                <dt class="text-base">Total</dt>
                <dd class="text-base">${{ totalPrice }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-4 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-8 lg:pt-0"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment details
        </h2>

        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div>
            <h3
              id="payment-heading"
              class="text-lg font-medium text-neutral-900"
            >
              Payment details
            </h3>

            <form id="payment-form" class="p-6" @submit.prevent="submitOrder">
              <div
                id="link-authentication-element"
                ref="linkAuthenticationElement"
              ></div>
              <div id="payment-element" ref="paymentElement">
                <!--Stripe.js injects the Payment Element-->
              </div>
              <div
                class="mt-2 flex justify-end border-t border-neutral-200 pt-6"
              >
                <button
                  id="submit"
                  class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
                  type="submit"
                >
                  <div id="spinner" class="spinner hidden"></div>
                  <span v-if="isLoading" id="button-text"
                    >Processing......</span
                  >
                  <span v-else id="button-text">Complete Booking</span>
                </button>
                <div id="payment-message" class="hidden"></div>
              </div>
            </form>
            <div class="my-4 flex flex-col">
              <p class="font-brand-body text-sm font-bold text-neutral-900">
                We require a credit card to hold your reservation
              </p>
              <p class="max-w-[65ch] font-brand-body text-xs text-red-700">
                Please note, 24 hours before the scheduled pickup time, an
                authorization hold will be placed on your credit card for the
                full amount of your reservation.
              </p>
              <div class="mt-2 flex flex-col">
                <p class="font-brand-body text-sm font-bold text-neutral-900">
                  Card is not charged until the completion of your trip
                </p>
                <p class="font-brand-body text-xs text-red-700">
                  All prices include taxes, surcharges and gratuity
                </p>
                <p class="font-brand-body text-xs text-red-700">
                  **Does not include hwy tolls, parking fees, or any extra fees
                  incurred during the trip
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
