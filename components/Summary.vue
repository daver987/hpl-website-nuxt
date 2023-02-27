<script setup lang="ts">
import { format, isValid } from 'date-fns'
import { Quote } from '~/types/Quote'

const queryString = useRoute().query
const quoteNumber = queryString.quote_number
console.log('Quote Number:', quoteNumber)

const { data: newQuote } = await useFetch<Quote>('/api/quote', {
  query: { quote_number: queryString.quote_number },
})

const totalPrice = computed(() => {
  return newQuote.value?.is_round_trip
    ? newQuote.value.total_price * 2
    : newQuote.value!.total_price
})
const totalPriceFormatted = totalPrice.value.toFixed(2)
const serviceTypeLabelQuote = ref()
const isPearsonAirportDropoffQuote = ref()
const isPearsonAirportPickupQuote = ref()

console.log('Returned Quote from summary', newQuote.value)

const formattedPickupDate = computed(() => {
  return isValid(new Date(newQuote.value!.pickup_date))
    ? format(new Date(newQuote.value!.pickup_date), 'MMMM dd, yyyy')
    : 'January 1, 2023'
})
const formattedPickupTime = computed(() => {
  return isValid(new Date(newQuote.value!.pickup_time))
    ? format(new Date(newQuote.value!.pickup_time), 'hh:mm a')
    : '12:00'
})
const formattedReturnDate = computed(() => {
  return isValid(new Date(newQuote.value!.return_date!))
    ? format(new Date(newQuote.value!.return_date!), 'MMMM dd, yyyy')
    : 'January 1, 2023'
})
const formattedReturnTime = computed(() => {
  return isValid(new Date(newQuote.value!.return_time!))
    ? format(new Date(newQuote.value!.return_time!), 'hh:mm a')
    : '12:00'
})

const printSummary = () => {
  window.print()
}
</script>

<template>
  <BaseContainer class="rounded bg-gray-100 p-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="font-sans text-xl font-semibold text-gray-900">
          Thank You For Your Booking
        </h1>
        <p class="mt-2 text-sm font-bold text-gray-700">
          <span
            class="font-sans text-base font-bold leading-relaxed text-gray-900"
            >Order Number: </span
          ><span
            class="font-sans text-base font-bold leading-relaxed text-red-600"
          >
            HPL-{{ newQuote!.quote_number }}</span
          ><br />
          For:
          <span class="font-sans font-normal"
            >{{ newQuote!.user.first_name }}
            {{ newQuote!.user.last_name + '  ' }}
          </span>
          <span class="font-sans font-medium">
            {{ newQuote!.user.phone_number }}</span
          >
          <br />
          Email:
          <span class="font-sans font-normal">{{
            newQuote!.user.email_address
          }}</span
          ><br />
          Pick up Date:
          <time class="font-sans font-normal" :datetime="formattedPickupDate"
            >{{ formattedPickupDate }}
          </time>
          <br />
          Pick up Time:
          <time class="font-sans font-normal" :datetime="formattedPickupTime"
            >{{ formattedPickupTime }}
          </time>
        </p>
        <p>
          Return Pick up Date:
          <time class="font-sans font-normal" :datetime="formattedReturnDate"
            >{{ formattedReturnDate }}
          </time>
          <br />
          Return Pick up Time:
          <time class="font-sans font-normal" :datetime="formattedReturnTime"
            >{{ formattedReturnTime }}
          </time>
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="printSummary"
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-sans text-sm font-medium uppercase tracking-wider text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
        >
          Print
        </button>
      </div>
    </div>
    <div class="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              <span class="font-sans sm:hidden">Details</span>
              <span class="invisible font-sans sm:visible">Routing</span>
            </th>

            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Service Type
            </th>
            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Vehicle Type
            </th>
            <th
              scope="col"
              class="py-3.5 pl-3 pr-4 text-right font-sans text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">PU: </span
                >{{ newQuote!.trips[0].origin_full_name }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ newQuote!.trips[0].destination_full_name }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ newQuote!.vehicle.label }}<br /><span
                  class="font-bold text-gray-900"
                  >Service Type: </span
                >{{ newQuote!.service.label }}
              </div>
            </td>
            <td
              v-if="isPearsonAirportPickupQuote || isPearsonAirportDropoffQuote"
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{
                serviceTypeLabelQuote !== 'From Airport'
                  ? 'To Airport'
                  : serviceTypeLabelQuote
              }}
            </td>

            <td
              v-else
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ newQuote!.service.label }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ newQuote!.vehicle.label }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{
                newQuote?.total_price
                  ? newQuote?.total_price?.toFixed(2)
                  : 'Loading....'
              }}
            </td>
          </tr>
          <tr v-if="newQuote!.is_round_trip" class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">PU: </span
                >{{ newQuote!.trips[0].destination_full_name }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ newQuote!.trips[0].origin_full_name }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ newQuote!.service.label }}<br /><span
                  class="font-sans font-bold text-gray-900"
                  >Service Type: </span
                >{{ newQuote!.vehicle.label }}
              </div>
            </td>
            <td
              v-if="isPearsonAirportPickupQuote || isPearsonAirportDropoffQuote"
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{
                serviceTypeLabelQuote === 'From Airport'
                  ? 'To Airport'
                  : serviceTypeLabelQuote
              }}
            </td>

            <td
              v-else
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ newQuote!.service.label }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ newQuote!.vehicle.label }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{
                newQuote?.total_price
                  ? newQuote?.total_price?.toFixed(2)
                  : 'Loading....'
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="false">
            <th
              scope="row"
              colspan="3"
              class="hidden pt-6 pl-6 pr-3 text-right font-sans text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
            >
              Subtotal
            </th>
            <th
              scope="row"
              class="pt-6 pl-4 pr-3 text-left font-sans text-sm font-normal text-gray-500 sm:hidden"
            >
              Subtotal
            </th>
            <td
              class="pt-6 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              $0.00
            </td>
          </tr>
          <tr>
            <th
              v-show="false"
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-right font-sans text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
            >
              Airport Fee
            </th>
            <th
              v-show="false"
              scope="row"
              class="pt-4 pl-4 pr-3 text-left font-sans text-sm font-normal text-gray-500 sm:hidden"
            >
              Airport Fee
            </th>
            <td
              v-show="false"
              class="pt-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{
                isPearsonAirportDropoffQuote || isPearsonAirportPickupQuote
                  ? '15.00'
                  : '0.00'
              }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
            >
              Total
            </th>
            <th
              scope="row"
              class="pt-3 pl-4 pr-3 text-left font-sans text-sm font-semibold text-gray-900 sm:hidden"
            >
              Total
            </th>
            <td
              class="pt-3 pl-3 pr-4 text-right font-sans text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
            >
              ${{ totalPriceFormatted }}
            </td>
          </tr>
        </tfoot>
      </table>
      <table class="mt-4">
        <tr class="border-t border-gray-200 pb-4">
          <td class="py-2">
            <BaseContainer>
              <div
                class="mt-4 mb-6 grid grid-cols-1 items-start gap-4 md:grid-cols-2"
              >
                <div class="mb-2 flex flex-col">
                  <p class="font-sans text-base font-bold text-black">
                    Check your email for your trip confirmation
                  </p>
                  <p class="max-w-[65ch] font-sans text-sm text-red-700">
                    **Please note, due to scheduling you may not receive a
                    confirmation right away. If your trip is not confirmed
                    within 2 hours, please contact us at 1-800-668-8687.
                  </p>
                </div>
                <div class="flex flex-col">
                  <p class="font-sans text-base font-bold text-black">
                    Contact us if your trip is booked within 6 hours or less
                  </p>
                  <p class="font-sans text-sm text-red-700">
                    Due to scheduling, we may not be able to accommodate your
                    request if it is booked less than two hours from now. We
                    will contact you asap if we cannot accommodate your booking.
                  </p>
                </div>
              </div>
            </BaseContainer>
          </td>
        </tr>
      </table>
    </div>
  </BaseContainer>
</template>
