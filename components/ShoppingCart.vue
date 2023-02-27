<script setup lang="ts">
import { Quote } from '~/server/api/quote.get'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'

interface LineItem {
  id: string
  label: string
  total: number
}

interface Price {
  total_price: number
  tax_amount: number
  base_rate: number
  line_items: LineItem[]
}

interface BookingData {
  customer: { id: string }
  session: { url: string; id: string }
  statusCode: number
  update: any
}

const quoteStore = useQuoteStore()
const cartStore = useCartStore()

const { addedToCart, loading } = storeToRefs(cartStore)

const quote = reactive<Quote>({
  total_price: 0,
  tax_amount: 0,
  base_rate: 0,
  line_items_list: [
    {
      id: '0',
      label: '',
      total: 0.0,
    },
  ],
  is_round_trip: false,
  vehicle: { label: '', vehicle_image: '' },
  service: { label: '' },
  quote_number: 0,
  selected_hours: 0,
  selected_passengers: 1,
  pickup_date: 11111111,
  pickup_time: 11111111,
  return_date: null,
  return_time: null,
  trips: [
    {
      origin_full_name: '',
      destination_full_name: '',
    },
  ],
  sales_tax: { tax_name: '' },
  user: {
    first_name: '',
    last_name: '',
    phone_number: '',
    email_address: '',
  },
})

// const lineItemsList = ref<LineItemsList[]>([])
const prices = ref<Price[]>([])

const formattedPickupDate = useFormattedDate(quote.pickup_date)
const formattedPickupTime = useFormattedTime(quote.pickup_time)
const formattedReturnDate = useFormattedDate(quote.return_date)
const formattedReturnTime = useFormattedTime(quote.return_time)
const currentDate = useFormattedDate(new Date())

const returnServiceTypeLabel = computed(() =>
  quote.is_round_trip && quote.service.label === 'To Airport'
    ? 'From Airport'
    : quote.is_round_trip && quote.service.label === 'From Airport'
    ? 'To Airport'
    : quote.service.label
)

const pending = ref(false)
const fetchData = async (quoteNumber: string) => {
  try {
    const { data, pending: loading } = await useFetch(`/api/quote`, {
      method: 'POST',
      query: { quote_number: quoteNumber },
    })
    pending.value = loading.value
    const quoteData: Quote = data.value as unknown as Quote
    quote.total_price = parseFloat(quoteData.total_price.toFixed(2))
    quote.tax_amount = parseFloat(quoteData.tax_amount.toFixed(2))
    quote.base_rate = parseFloat(quoteData.base_rate.toFixed(2))
    quote.is_round_trip = quoteData.is_round_trip
    quote.pickup_date = quoteData.pickup_date
    quote.pickup_time = quoteData.pickup_time
    quote.return_date = quoteData.return_date
    quote.return_time = quoteData.return_time
    quote.service = quoteData.service
    quote.vehicle = quoteData.vehicle
    quote.trips = quoteData.trips
    quote.line_items_list = quoteData.line_items_list
    console.log('Fetching Data, Quote Data:', quoteData)
    await initCheckout()
  } catch (error) {
    console.log(error)
  }
}

const fetchQuoteFromRoute = async () => {
  const route = useRoute()
  const quoteNumber = route.query.quote_number as string
  console.log('Quote Number Client:', quoteNumber)
  if (quoteNumber) {
    await fetchData(quoteNumber)
  }
}

const fetchQuoteFromStore = async () => {
  if (quoteStore.quote) {
    Object.assign(quote, quoteStore.quote)
    initCheckout()
  }
}

const initCheckout = () => {
  console.log('Init Checkout')
  if (quote.is_round_trip) {
    const roundTripPrice: Price = {
      total_price: parseFloat((quote.total_price * 2).toFixed(2)),
      tax_amount: parseFloat((quote.tax_amount * 2).toFixed(2)),
      base_rate: parseFloat((quote.base_rate * 2).toFixed(2)),
      line_items: quote.line_items_list.map((item) => ({
        id: item.id,
        label: item.label,
        total: parseFloat((item.total * 2).toFixed(2)),
      })),
    }
    prices.value.push(roundTripPrice)
  }
}

onMounted(() => {
  fetchQuoteFromRoute()
  fetchQuoteFromStore()
})

const checkoutLoading = ref(false)

const createBooking = async (quote: Quote) => {
  checkoutLoading.value = true

  try {
    const { data: response } = await useFetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quote),
    })

    //@ts-ignore
    const { data: stripeData } = await response.value

    const {
      customer,
      session,
      statusCode,
      update: prismaData,
    }: BookingData = stripeData

    console.log('Prisma Data:', prismaData)
    console.log('Stripe Customer:', customer)
    console.log('Stripe Session:', session)
    console.log('Status Code:', statusCode)

    const { url } = session
    const stripeCustomerId = customer.id

    setTimeout(async () => {
      checkoutLoading.value = false
      await navigateTo(url, {
        redirectCode: 303,
        external: true,
      })
    }, 500)
  } catch (error) {
    console.log(error)
    checkoutLoading.value = false
  }
}
</script>

<template>
  <div v-if="pending">Loading ...</div>
  <main
    v-else
    class="mx-auto max-w-2xl px-4 pt-6 pb-8 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    <h1
      class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
    >
      <span class="mr-1">High Park Livery </span>-
      <span class="ml-1">{{ addedToCart ? ' Order' : ' Quote' }} Details</span>
    </h1>
    <div class="mt-2 text-sm sm:flex sm:justify-between">
      <dl class="flex">
        <dt class="text-gray-500 dark:text-gray-100">
          {{ addedToCart ? 'Order' : 'Quote' }} Number&nbsp;<span
            class="mx-2 text-gray-400 dark:text-gray-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-red-600">
          <span>HPL-{{ quote.quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span class="mx-2 text-gray-400 dark:text-gray-100" aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-gray-900 dark:text-gray-100">
          <time :datetime="currentDate">{{ currentDate }} </time>
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
          class="divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          <li class="flex py-6 sm:py-8">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="quote.vehicle.vehicle_image"
                :alt="quote.vehicle.label"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="mb-2 flex justify-between">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200"
                        >{{ quote.service.label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span
                      >{{ formattedPickupDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ formattedPickupTime }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].origin_full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].destination_full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote.base_rate }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      v-if="false"
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="quote.is_round_trip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{
                  quote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
              </p>
            </div>
          </li>
          <li v-if="quote.is_round_trip" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="quote.vehicle.vehicle_image"
                :alt="quote.vehicle.label"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
                width="1920"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="mb-2 flex justify-between">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200"
                        >{{ returnServiceTypeLabel }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span
                      >{{ formattedReturnDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ formattedReturnTime }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].destination_full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].origin_full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Base Rate: </span
                    >{{ quote.line_items_list[0].total }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div v-if="false" class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="quote.is_round_trip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{
                  quote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section
        aria-labelledby="summary-heading"
        class="mt-16 rounded-lg bg-gray-100 px-4 py-6 dark:bg-grey-800 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2
          id="summary-heading"
          class="text-lg font-medium text-gray-900 dark:text-gray-100"
        >
          {{ addedToCart ? 'Order' : 'Quote' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600 dark:text-gray-300">Base Rate</dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $
              {{
                quote.is_round_trip
                  ? quote.line_items_list[1].total
                  : quote.line_items_list[0].total
              }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
            v-for="item in quote.line_items_list"
            :key="item.id"
          >
            <dt
              class="flex items-center text-sm text-gray-600 dark:text-gray-300"
            >
              <span>{{ item.label }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how {{ item.label }} is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ item.total }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex text-sm text-gray-600 dark:text-gray-300">
              <span>{{ quote.sales_tax.tax_name }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how {{ quote.sales_tax.tax_name }} is
                  calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $
              {{
                quote.is_round_trip
                  ? quote.line_items_list[1].total
                  : quote.line_items_list[0].total
              }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-base font-medium text-gray-900 dark:text-gray-100">
              {{ addedToCart ? 'Order' : 'Quote' }} total
            </dt>
            <dd class="text-base font-medium text-gray-900 dark:text-gray-100">
              $
              {{
                quote.is_round_trip
                  ? quote.line_items_list[0].total
                  : quote.line_items_list[1].total
              }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            v-if="!addedToCart"
            @click="cartStore.addToCart()"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loading ? 'Adding To Cart...' : 'Add To Cart' }}
          </button>
          <button
            v-else
            @click="createBooking"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ checkoutLoading ? 'Loading...' : 'Book Now' }}
          </button>
        </div>
      </section>
      <section
        v-if="addedToCart"
        class="px-4 py-6 sm:p-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:p-6"
      >
        <div class="mb-2 flex flex-col">
          <p
            class="font-sans text-sm font-bold text-gray-900 dark:text-gray-100"
          >
            We require a credit card to hold your reservation
          </p>
          <p class="max-w-[65ch] font-sans text-xs text-red-700">
            Please note, 24 hours before the scheduled pickup time, an
            authorization hold will be placed on your credit card for the full
            amount of your reservation.
          </p>
          <div class="mt-2 flex flex-col">
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
