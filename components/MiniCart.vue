<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useStorage } from '@vueuse/core'

const { addedToCart } = storeToRefs(useCartStore())
const cartData = useStorage('quote_data', {})
console.log('Mini Cart Data', cartData.value)
//@ts-ignore
const { isRoundTrip, serviceTypeLabel, vehicleTypeLabel } = cartData.value
const removeFromCart = useCartStore().removeFromCart()

const itemsInCart = computed(() =>
  addedToCart.value ? (isRoundTrip ? 2 : 1) : 0
)
</script>

<template>
  <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
    <PopoverButton class="group -m-2 flex items-center p-2">
      <Icon
        name="heroicons:shopping-bag"
        class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span
        :class="[
          addedToCart
            ? 'text-gray-700 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-400'
            : 'text-brand-600 group-hover:text-brand-700',
        ]"
        class="ml-2 text-sm font-medium"
        >{{ itemsInCart }}</span
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
        class="absolute inset-x-0 top-16 z-10 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <h2 class="sr-only">Shopping Cart</h2>

        <form class="mx-auto max-w-2xl px-4" @submit.prevent>
          <ul role="list" class="divide-y divide-gray-200">
            <li class="flex items-center py-6" v-if="!addedToCart">
              <Icon
                name="teenyicons:mood-sad-outline"
                class="h-16 w-16 flex-none rounded-md"
              />
              <div class="ml-4 flex-auto">
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
              <div class="ml-4 flex-auto">
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
            class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 font-sans text-sm font-medium uppercase tracking-wider text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
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
