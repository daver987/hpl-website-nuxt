<script setup lang="ts">
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { format, isValid } from 'date-fns'
import { useQuoteStore } from '~/stores/useQuoteStore'

const quoteStore = useQuoteStore()
const { userQuoteData } = storeToRefs(quoteStore)
//@ts-ignore
const { newQuote, lineItemsList } = userQuoteData.value
const cartStore = useCartStore()

const lineItemsListTest = [
  {
    label: 'Gratuity',
    total: 25.57,
    id: 1,
  },
  {
    label: 'Fuel Surcharge',
    total: 10.23,
    id: 2,
  },
]

const newQuoteTest = {
  trips: [
    {
      destination_formatted_address: '1265 Sixth Line, Oakville, Ontario',
      destination_name: '1265 Sixth Line, Oakville, Ontario',
      is_return: false,
      origin_name: 'Toronto Pearson Airport',
      origin_formatted_address: '6644 Silver Dart Drive, Mississauga Ontario',
    },
  ],
  sales_tax: {
    tax_name: 'HST',
  },
  service: {
    label: 'From Airport',
  },
  vehicle: {
    label: 'Standard SUV',
    vehicle_image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024',
  },

  base_rate: 127.8459,
  created_at: '2023-02-20T20:49:42.485Z',
  is_booked: false,
  is_round_trip: false,
  line_items_total: 35.796852,
  pickup_date: 1677128400000,
  pickup_time: 1676880300000,
  quote_number: 6,
  return_date: 0,
  return_time: 0,
  sales_tax_id: 1,
  selected_hours: null,
  selected_passengers: 1,
  service_id: 3,
  tax_amount: 17.94956436,
  total_price: 181.59231636,
  updated_at: '2023-02-20T20:49:42.485Z',
  user_id: 'b98f28e7-9505-4bb2-8f47-7bc006584828',
  vehicle_id: 3,
}

const { addedToCart, loading } = storeToRefs(cartStore)

interface LineItem {
  label: string
  total: number
  id: number
}

interface NewQuote {
  trips: any[]
  sales_tax: { tax_name: string }
  service: { label: string }
  vehicle: { label: string; vehicle_image: string }
  base_rate: number
  created_at: string
  is_booked: boolean
  is_round_trip: boolean
  line_items_total: number
  pickup_date: number
  pickup_time: number
  quote_number: number
  return_date: any
  return_time: any
  sales_tax_id: number
  selected_hours: any
  service_id: number
  tax_amount: number
  total_price: number
  updated_at: string
  user_id: string
  vehicle_id: number
}

const prices: any[] = []

// calculate one-way prices
const oneWayPrice = {
  total_price: parseFloat(newQuote.total_price.toFixed(2)),
  tax_amount: parseFloat(newQuote.tax_amount.toFixed(2)),
  base_rate: parseFloat(newQuote.base_rate.toFixed(2)),
  line_items: lineItemsList.map((item: LineItem) => ({
    label: item.label,
    total: parseFloat(item.total.toFixed(2)),
    id: item.id,
  })),
}
prices.push(oneWayPrice)

// calculate round-trip prices
if (newQuote.is_round_trip === true) {
  const roundTripPrice = {
    total_price: parseFloat((newQuote.total_price * 2).toFixed(2)),
    tax_amount: parseFloat((newQuote.tax_amount * 2).toFixed(2)),
    base_rate: parseFloat((newQuote.base_rate * 2).toFixed(2)),
    line_items: lineItemsList.map((item: LineItem) => ({
      label: item.label,
      total: parseFloat((item.total * 2).toFixed(2)),
      id: item.id,
    })),
  }
  prices.push(roundTripPrice)
}

// prices array now contains both one-way and round-trip versions
console.log(prices)

const returnServiceTypeLabel = computed(() => {
  if (newQuote.is_round_trip && newQuote.service.label === 'To Airport') {
    return 'From Airport'
  }
  return newQuote.is_round_trip && newQuote.service.label === 'From Airport'
    ? 'To Airport'
    : newQuote.service.label
})

const pickupAddress = formatAddress(
  newQuote.trips[0].origin_name,
  newQuote.trips[0].origin_formatted_address
)
const dropOffAddress = formatAddress(
  newQuote.trips[0].destination_name,
  newQuote.trips[0].destination_formatted_address
)

const currentDate = format(new Date(), 'MMMM dd, yyyy')

const checkoutLoading = ref(false)

const createBooking = async () => {
  checkoutLoading.value = true

  // Save newQuote in localStorage
  localStorage.setItem('newQuote', JSON.stringify(newQuote))

  const { data: stripeData } = await useFetch('/api/booking', {
    method: 'POST',
    body: newQuote,
  })

  console.log('Stripe Checkout Data', stripeData.value)
  //@ts-ignore
  const { customer, session, statusCode, update: prismaData } = stripeData.value
  console.log('Prisma Data:', prismaData)
  console.log('Stripe Customer:', customer)
  console.log('Stripe Session:', session)
  console.log('Status Code:', statusCode)
  const { url, id: sessionId } = session
  const stripeCustomerId = customer.id

  setTimeout(async () => {
    checkoutLoading.value = false
    await navigateTo(url, {
      redirectCode: 303,
      external: true,
    })
  }, 1000)
}

const formattedPickupDate = computed(() => {
  return isValid(new Date(newQuote.pickup_date))
    ? format(new Date(newQuote.pickup_date), 'MMMM dd, yyyy')
    : 'January 1, 2023'
})
const formattedPickupTime = computed(() => {
  return isValid(new Date(newQuote.pickup_time))
    ? format(new Date(newQuote.pickup_time), 'hh:mm a')
    : '12:00'
})
const formattedReturnDate = computed(() => {
  return isValid(new Date(newQuote.return_date))
    ? format(new Date(newQuote.return_date), 'MMMM dd, yyyy')
    : 'January 1, 2023'
})
const formattedReturnTime = computed(() => {
  return isValid(new Date(newQuote.return_time))
    ? format(new Date(newQuote.return_time), 'hh:mm a')
    : '12:00'
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 pt-6 pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
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
          <span>HPL-{{ newQuote.quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span class="mx-2 text-gray-400 dark:text-gray-100" aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-gray-900 dark:text-gray-100">
          <time :datetime="currentDate"
            >{{ format(new Date(), 'MMMM dd, yyyy') }}
          </time>
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
                :src="newQuote.vehicle.vehicle_image"
                :alt="newQuote.vehicle.label"
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
                        >{{ newQuote.service.label }}
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
                      >{{ pickupAddress }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ dropOffAddress }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ newQuote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ newQuote.selected_passengers }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ prices[0].base_rate }}
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
                  v-if="newQuote.is_round_trip"
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
                  newQuote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
              </p>
            </div>
          </li>
          <li v-if="newQuote.is_round_trip" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="newQuote.vehicle.vehicle_image"
                :alt="newQuote.vehicle.label"
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
                      >{{ dropOffAddress }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ pickupAddress }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ newQuote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ newQuote.selected_passengers }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Base Rate: </span
                    >{{ prices[0].base_rate }}
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
                  v-if="newQuote.is_round_trip"
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
                  newQuote.is_round_trip ? 'Round Trip' : `One Way Trip`
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
                newQuote.is_round_trip
                  ? prices[1].base_rate
                  : prices[0].base_rate
              }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
            v-for="item in prices[0].line_items"
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
              <span>{{ newQuote.sales_tax.tax_name }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how {{ newQuote.sales_tax.tax_name }} is
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
                newQuote.is_round_trip
                  ? prices[1].tax_amount
                  : prices[0].tax_amount
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
                newQuote.is_round_trip
                  ? prices[1].total_price
                  : prices[0].total_price
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
