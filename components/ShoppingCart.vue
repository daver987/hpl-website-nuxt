<script setup lang="ts">
import { Database } from '~/types/supabase'
import { ReturnType } from '~/types/ReturnType'
import { Quote } from '~/schema/quote'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { useCartStore } from '~/stores/useCartStore'
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const cartStore = useCartStore()
const quoteStore = useQuoteStore()
const { quoteNumber, quoteData } = storeToRefs(quoteStore)
console.log('Store Quote Number', quoteNumber.value)
const userStore = useUserStore()
const { hplUserId, first_name, last_name, phone_number, email_address } =
  storeToRefs(userStore)
console.log('Store User ID in cart:', hplUserId.value)

console.log(
  'Shopping Cart User Data:',
  hplUserId.value,
  first_name.value,
  last_name.value,
  email_address.value,
  phone_number.value
)

//get the latest quote number
const getLatestQuoteNumber = async () => {
  const { data } = await supabase
    .from('quote_number')
    .select('latest_quote_number')
    .single()
  console.log('This is the latest quote number', data)
  // @ts-ignore
  return data.latest_quote_number
}
console.log('path:', route.path)
const getQuoteNumber = async () => {
  if (route.path === '/checkout') {
    console.log('This is the path', route.path)
    const { quotenumber } = route.query
    console.log('This is the quote number', quotenumber)
    return quotenumber as string
  } else {
    return await getLatestQuoteNumber()
  }
}
quoteNumber.value = await getQuoteNumber()
const { data: quoteFormData } = await useAsyncData('quotes', async () => {
  const { data } = await supabase
    .from('quotes')
    .select('*')
    .eq('quote_number', quoteNumber.value)
    .single()
  return data
})
console.log('Quote Form Data', quoteFormData.value)
quoteData.value = quoteFormData.value as Quote
const {
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  isRoundTrip,
  vehicleTypeLabel,
  passengersLabel,
  serviceTypeLabel,
  totalFare,
  originName,
  destinationName,
  baseRate,
  gratuity,
  HST,
  fuelSurcharge,
  id,
  userId,
  quote_number,
  isPearsonAirportPickup,
  isPearsonAirportDropoff,
  userEmail,
} = quoteData.value as Quote

const { addedToCart, loading } = storeToRefs(cartStore)

const returnServiceTypeLabel = computed(() => {
  if (isRoundTrip && serviceTypeLabel === 'To Airport') return 'From Airport'
  return isRoundTrip && serviceTypeLabel === 'From Airport'
    ? 'To Airport'
    : serviceTypeLabel
})

const roundTripFare = (roundTrip: boolean | null, fare: number | null) => {
  if (roundTrip === null || fare === null) return 0
  return roundTrip ? fare * 2 : fare
}
const pearsonAirportFee = (
  isPickup: boolean | null,
  isDropoff: boolean | null
) => {
  if (isPickup) return 15
  else if (isDropoff && isRoundTrip) return 15
  else return 0
}
const addPearsonFee = pearsonAirportFee(
  isPearsonAirportPickup,
  isPearsonAirportDropoff
)
const roundTripBaseRate = roundTripFare(isRoundTrip, baseRate).toFixed(2)
const roundTripGratuity = roundTripFare(isRoundTrip, gratuity).toFixed(2)
const roundTripHST = roundTripFare(isRoundTrip, HST).toFixed(2)
const roundTripFuelSurcharge = roundTripFare(
  isRoundTrip,
  fuelSurcharge
).toFixed(2)
const roundTripFareSubtotal = roundTripFare(isRoundTrip, totalFare)
const roundTripTotalFare = () => {
  return addPearsonFee === 15
    ? roundTripFareSubtotal + addPearsonFee
    : roundTripFareSubtotal
}

const totalFareWithAirportFee = () => {
  if (!totalFare) return 0
  return addPearsonFee === 15 ? totalFare + addPearsonFee : totalFare
}

function getCurrentDate() {
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const currentDate = getCurrentDate()

const vehicleImage = () => {
  if (vehicleTypeLabel === 'Standard Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
  } else if (vehicleTypeLabel === 'Premium Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
  } else if (vehicleTypeLabel === 'Standard SUV') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
  } else {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
  }
}
const vehicleImageSrc = vehicleImage()
const vehicleImageAlt = vehicleTypeLabel

//checkout
const loadingCheckout = ref(false)
const createSession = async () => {
  loadingCheckout.value = true
  //@ts-ignore
  localStorage.setItem('quote_number', quoteNumber.value.toString())
  const checkoutBody = {
    firstName: first_name.value,
    lastName: last_name.value,
    userEmail,
    customerId: id,
    phoneNumber: phone_number.value,
    quoteNumber: quoteNumber.value,
  }
  const { data: stripeData } = await useFetch(`/api/create-checkout-session`, {
    //@ts-ignore
    method: 'POST',
    body: checkoutBody,
  })
  console.log('Stripe Returned Data:', stripeData.value)
  const { statusCode, url, stripeCustomerId, sessionId } =
    stripeData.value as ReturnType
  console.log(
    'Returned Stripe Data',
    statusCode,
    url,
    stripeCustomerId,
    sessionId
  )
  if (stripeData && stripeData.value && stripeData.value.stripeCustomerId) {
    const stripeCustomerId = ref(stripeData.value.stripeCustomerId)
    const { data: userData } = await useAsyncData('user', async () => {
      const { data, error } = await supabase
        .from('user')
        .update({ stripe_customer_id: stripeCustomerId.value })
        .eq('id', quoteData.value?.userId)
      console.log('Updated User Data', data, error)
      return data
    })
    console.log('Updated User Data', userData.value)
  } else {
    console.log('No Stripe Customer Id found')
  }

  setTimeout(async () => {
    loadingCheckout.value = false
    await navigateTo(url, {
      redirectCode: 303,
      external: true,
    })
  }, 1500)
}
</script>

<template>
  <main class="max-w-2xl px-4 pt-6 pb-8 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
    <h1
      class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
    >
      <span class="mr-1">High Park Livery </span>-
      <span class="ml-1">{{ !addedToCart ? ' Quote' : ' Order' }} Details</span>
    </h1>
    <div class="mt-2 text-sm sm:flex sm:justify-between">
      <dl class="flex">
        <dt class="text-gray-500 dark:text-gray-100">
          {{ !addedToCart ? 'Quote' : 'Order' }} Number&nbsp;<span
            class="mx-2 text-gray-400 dark:text-gray-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-red-600">
          <span>HPL-{{ quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span class="mx-2 text-gray-400 dark:text-gray-100" aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-gray-900 dark:text-gray-100">
          <time :datetime="currentDate">{{ currentDate }}</time>
        </dd>
      </dl>
      <div class="mt-4 sm:mt-0">
        <NuxtLink to="/" class="font-medium text-brand-600 hover:text-brand">
          Continue Browsing
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
    <form
      class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
        <ul
          role="list"
          class="border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          <li class="flex py-6 sm:py-8">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="vehicleImageSrc"
                :alt="vehicleImageSrc"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
              />
            </div>

            <div class="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="flex justify-between mb-2">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 dark:text-gray-200 dark:hover:text-gray-200 hover:text-gray-800"
                        >{{ serviceTypeLabel }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="flex flex-col mt-2 space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span>{{ pickupDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ pickupTime }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span>{{ originName }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ destinationName }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ vehicleTypeLabel }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ passengersLabel }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Subtotal: </span>$
                    {{ baseRate.toFixed(2) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      v-if="false"
                      type="button"
                      class="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="w-5 h-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="flex mt-4 space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="isRoundTrip"
                  class="flex-shrink-0 w-5 h-5 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="flex-shrink-0 w-5 h-5 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{ isRoundTrip ? 'Round Trip' : `One Way Trip` }}</span>
              </p>
            </div>
          </li>
          <li v-if="isRoundTrip" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="vehicleImageSrc"
                :alt="vehicleImageAlt"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
                width="1920"
              />
            </div>

            <div class="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="flex justify-between mb-2">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 dark:text-gray-200 dark:hover:text-gray-200 hover:text-gray-800"
                        >{{ returnServiceTypeLabel }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="flex flex-col mt-2 space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span>{{ returnDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ returnTime }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span
                      >{{ destinationName }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ originName }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ vehicleTypeLabel }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ passengersLabel }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Subtotal: </span
                    >{{ baseRate.toFixed(2) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div v-if="false" class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="w-5 h-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="flex mt-4 space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="isRoundTrip"
                  class="flex-shrink-0 w-5 h-5 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="flex-shrink-0 w-5 h-5 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{ isRoundTrip ? 'Round Trip' : `One Way Trip` }}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section
        aria-labelledby="summary-heading"
        class="px-4 py-6 mt-16 bg-gray-100 rounded-lg dark:bg-grey-800 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2
          id="summary-heading"
          class="text-lg font-medium text-gray-900 dark:text-gray-100"
        >
          {{ !addedToCart ? 'Quote' : 'Order' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600 dark:text-gray-300">Subtotal</dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ isRoundTrip ? roundTripBaseRate : baseRate.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <dt
              class="flex items-center text-sm text-gray-600 dark:text-gray-300"
            >
              <span>Fuel Surcharge</span>
              <a
                href="#"
                class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how fuel surcharge is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $
              {{
                isRoundTrip ? roundTripFuelSurcharge : fuelSurcharge.toFixed(2)
              }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <dt
              class="flex items-center text-sm text-gray-600 dark:text-gray-300"
            >
              <span>Gratuity</span>
              <a
                href="#"
                class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how gratuity is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ isRoundTrip ? roundTripGratuity : gratuity.toFixed(2) }}
            </dd>
          </div>
          <div
            v-if="addPearsonFee === 15"
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <dt class="flex text-sm text-gray-600 dark:text-gray-300">
              <span>Airport Fee</span>
              <a
                href="#"
                class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about the Pearson Airport Fee</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ addPearsonFee.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <dt class="flex text-sm text-gray-600 dark:text-gray-300">
              <span>HST</span>
              <a
                href="#"
                class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how tax is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ isRoundTrip ? roundTripHST : HST.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <dt class="text-base font-medium text-gray-900 dark:text-gray-100">
              {{ !addedToCart ? 'Quote' : 'Order' }} total
            </dt>
            <dd class="text-base font-medium text-gray-900 dark:text-gray-100">
              $
              {{
                isRoundTrip
                  ? roundTripTotalFare().toFixed(2)
                  : totalFareWithAirportFee().toFixed(2)
              }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            v-if="!addedToCart"
            @click="cartStore.addToCart()"
            type="button"
            class="w-full px-4 py-3 text-base font-medium text-white uppercase bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loading ? 'Adding To Cart...' : 'Add To Cart' }}
          </button>
          <button
            v-else
            @click="createSession"
            type="button"
            class="w-full px-4 py-3 text-base font-medium text-white uppercase bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loadingCheckout ? 'Loading...' : 'Book Now' }}
          </button>
        </div>
      </section>
      <section
        v-if="addedToCart"
        class="px-4 py-6 sm:p-6 lg:col-start-8 lg:col-span-5 lg:mt-0 lg:p-6"
      >
        <div class="flex flex-col mb-2">
          <p
            class="font-sans text-sm font-bold text-gray-900 dark:text-gray-100"
          >
            We require a credit card to hold your reservation
          </p>
          <p class="text-xs font-sans text-red-700 max-w-[65ch]">
            Please note, 24 hours before the scheduled pickup time, an
            authorization hold will be placed on your credit card for the full
            amount of your reservation.
          </p>
          <div class="flex flex-col mt-2">
            <p
              class="font-sans text-sm font-bold text-gray-900 dark:text-gray-100"
            >
              Card is not charged until the completion of your trip
            </p>
            <p class="font-sans text-xs text-red-700">
              All prices include taxes, surcharges and gratuity
            </p>
            <p class="font-sans text-xs text-red-700">
              **Does not include hwy tolls, parking fees, or any extra fees
              incurred during the trip
            </p>
          </div>
        </div>
      </section>
    </form>
  </main>
</template>
