<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/useCartStore'
import { useStorage } from '@vueuse/core'

const supabase = useSupabaseClient()

const { addedToCart } = storeToRefs(useCartStore())
const { isRoundTrip } = storeToRefs(useQuoteStore())
const removeFromCart = useCartStore().removeFromCart()

const cartData = useStorage('quote_data', {})
console.log('Mini Cart Data', cartData.value)

//@ts-ignore
const { serviceTypeLabel, vehicleTypeLabel } = cartData.value

const products = [
  {
    id: 1,
    name: 'Point to Point',
    color: '00-00-0000',
    imageSrc:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024',
    imageAlt: 'Point to Point',
  },
]

const itemsInCart = () => {
  if (addedToCart.value && isRoundTrip.value) {
    return 2
  }
  if (addedToCart.value && !isRoundTrip.value) {
    return 1
  }
  return 0
}
</script>

<template>
  <Popover class="flow-root ml-4 text-sm lg:relative lg:ml-8">
    <PopoverButton class="flex items-center p-2 -m-2 group">
      <ShoppingBagIcon
        class="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span
        :class="[
          addedToCart
            ? 'dark:text-gray-300 dark:group-hover:text-gray-400 text-gray-700 group-hover:text-gray-800'
            : 'text-brand-600 group-hover:text-brand-700',
        ]"
        class="ml-2 text-sm font-medium"
        >{{ itemsInCart() }}</span
      >
      <span class="sr-only">items in cart, view bag</span>
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PopoverPanel
        class="absolute inset-x-0 z-10 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <h2 class="sr-only">Shopping Cart</h2>

        <form class="max-w-2xl px-4 mx-auto" @submit.prevent>
          <ul role="list" class="divide-y divide-gray-200">
            <li class="flex items-center py-6" v-if="!addedToCart">
              <Icon
                name="teenyicons:mood-sad-outline"
                class="flex-none w-16 h-16 rounded-md"
              />
              <div class="flex-auto ml-4">
                <h3 class="font-sans text-lg font-medium text-gray-900">
                  Cart is Empty
                </h3>
              </div>
            </li>
            <li v-else class="flex items-center py-6">
              <NuxtPicture
                src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024"
                alt="Vehicle"
                :img-attrs="{
                  class:
                    'h-16 w-16 flex-none rounded-md border object-contain border-gray-200',
                }"
              />
              <div class="flex-auto ml-4">
                <h3 class="font-sans font-medium text-gray-900">
                  <NuxtLink to="#">{{ serviceTypeLabel }}</NuxtLink>
                </h3>
                <p class="font-sans text-gray-500">{{ vehicleTypeLabel }}</p>
              </div>
            </li>
          </ul>

          <button
            v-if="addedToCart"
            type="submit"
            class="w-full px-4 py-2 font-sans text-sm font-medium tracking-wider text-white uppercase border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Book Now
          </button>

          <p v-if="addedToCart" class="mt-6 text-center">
            <button
              @click="removeFromCart"
              class="font-sans text-sm font-medium text-brand-600 hover:text-brand"
            >
              Remove From Cart
            </button>
          </p>
        </form>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
