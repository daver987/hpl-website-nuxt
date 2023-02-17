<script setup lang="ts">
import { format, isValid } from 'date-fns'
// import { useStorage } from '@vueuse/core'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'

const quoteStore = useQuoteStore()
const { quote_number, quote } = storeToRefs(quoteStore)
// quote_number.value = useStorage('quote_number', '')
quoteStore.getQuoteSingle()

const firstNameQuote = ref()
const lastNameQuote = ref()
const userEmailQuote = ref()
const phoneNumber = ref()
const originNameQuote = ref()
const destinationNameQuote = ref()
const serviceTypeLabelQuote = ref()
const vehicleTypeLabelQuote = ref()
const isPearsonAirportDropoffQuote = ref()
const isPearsonAirportPickupQuote = ref()
const totalFareQuote = ref()
const roundTripTotalQuote = ref()
const isRoundTripQuote = ref()

const {
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  firstName,
  lastName,
  userEmail,
  origin_name,
  origin_formatted_address,
  destination_name,
  destination_formatted_address,
  serviceTypeLabel,
  vehicleTypeLabel,
  isPearsonAirportDropoff,
  isPearsonAirportPickup,
  totalFare,
  roundTripTotal,
  isRoundTrip,
  phone_number,
} = quote.value[0]

firstNameQuote.value = firstName
lastNameQuote.value = lastName
userEmailQuote.value = userEmail
phoneNumber.value = phone_number
originNameQuote.value = formatAddress(origin_name, origin_formatted_address)
destinationNameQuote.value = formatAddress(
  destination_name,
  destination_formatted_address
)
serviceTypeLabelQuote.value = serviceTypeLabel
vehicleTypeLabelQuote.value = vehicleTypeLabel
isPearsonAirportDropoffQuote.value = isPearsonAirportDropoff
isPearsonAirportPickupQuote.value = isPearsonAirportPickup
totalFareQuote.value = totalFare
roundTripTotalQuote.value = roundTripTotal
isRoundTripQuote.value = isRoundTrip

console.log('Returned Quote from summary', quote.value)

const formattedPickupDate = computed(() => {
  if (isValid(new Date(pickupDate))) {
    return formatDateNew(pickupDate)
  } else {
    return 'January 1, 2023'
  }
})
const formattedPickupTime = computed(() => {
  if (isValid(new Date(pickupTime))) {
    return format(new Date(pickupTime), 'hh:mm a')
  } else {
    return '12:00'
  }
})
const formattedReturnDate = computed(() => {
  if (isValid(new Date(returnDate))) {
    return formatDateNew(returnDate)
  } else {
    return 'January 1, 2023'
  }
})
const formattedReturnTime = computed(() => {
  if (isValid(new Date(returnTime))) {
    return format(new Date(returnTime), 'hh:mm a')
  } else {
    return '12:00'
  }
})

function formatAddress(name: string, address: string) {
  return address.includes(name) ? address : `${name}, ${address}`
}

const printSummary = () => {
  window.print()
}
const space = ' '
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
            HPL-{{ quote_number }}</span
          ><br />
          For:
          <span class="font-sans font-normal"
            >{{ firstNameQuote }} {{ lastNameQuote }}</span
          >
          <span class="font-sans font-normal"> {{ phoneNumber }}</span
          ><br />
          Email:
          <span class="font-sans font-normal">{{ userEmailQuote }}</span
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
                >{{ originNameQuote }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ destinationNameQuote }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ serviceTypeLabelQuote }}<br /><span
                  class="font-bold text-gray-900"
                  >Service Type: </span
                >{{ vehicleTypeLabelQuote }}
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
              {{ serviceTypeLabelQuote }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ vehicleTypeLabelQuote }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ totalFareQuote ? totalFareQuote?.toFixed(2) : 'Loading....' }}
            </td>
          </tr>
          <tr v-if="isRoundTripQuote" class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">PU: </span
                >{{ destinationNameQuote }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ originNameQuote }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ serviceTypeLabelQuote }}<br /><span
                  class="font-sans font-bold text-gray-900"
                  >Service Type: </span
                >{{ vehicleTypeLabelQuote }}
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
              {{ serviceTypeLabelQuote }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ vehicleTypeLabelQuote }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ totalFareQuote ? totalFareQuote?.toFixed(2) : 'Loading....' }}
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
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-right font-sans text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
            >
              Airport Fee
            </th>
            <th
              scope="row"
              class="pt-4 pl-4 pr-3 text-left font-sans text-sm font-normal text-gray-500 sm:hidden"
            >
              Airport Fee
            </th>
            <td
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
              ${{ roundTripTotalQuote }}
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
