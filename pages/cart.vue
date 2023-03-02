<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
definePageMeta({
  name: 'cart',
  layout: 'auth',
})

const config = useRuntimeConfig()

const stripe = await loadStripe(
  'pk_test_51LB1WyEm9nnVhePI7x5av80XBdGNV7C6jt27HgDHJ7sHQEVbzQccJwrXRT8LphTIEFSwGebIMwkGRCHoIUI2xiGU00rvazE9dK'
)

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#9f6c27',
    colorBackground: '#ffffff',
    colorText: '#222222',
    colorDanger: '#df1b41',
    fontFamily: 'Inter Var, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
}

const clientSecret =
  'seti_1MWgziEm9nnVhePIDDuEYtiE_secret_NHFU4iarMgelRQl01On2W98cb0wPS9U'

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
//@ts-ignore
const elements = stripe?.elements({ clientSecret, appearance })

// Create and mount the Payment Element
const paymentElement = elements?.create('payment')
paymentElement?.mount('#payment-element')

const products = [
  {
    id: 1,
    name: 'High Wall Tote',
    href: '#',
    price: '$210.00',
    color: 'White and black',
    size: '15L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
  },
  // More products...
]
</script>

<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed top-0 right-0 hidden h-full w-1/2 bg-brand-900 lg:block"
      aria-hidden="true"
    />

    <header
      class="relative mx-auto max-w-7xl bg-brand-900 py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10"
    >
      <div class="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
        <NuxtLink to="/" class="self-center">
          <span class="sr-only">High Park Livery</span>
          <NuxtPicture
            :img-attrs="{
              class: 'w-auto h-12 lg:h-14',
            }"
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
            alt="High Park Livery Logo"
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
        class="bg-brand-900 pt-6 pb-12 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <dl>
            <dt class="text-sm font-medium">Amount due</dt>
            <dd class="mt-1 text-3xl font-bold tracking-tight text-white">
              $232.00
            </dd>
          </dl>

          <ul
            role="list"
            class="divide-y divide-white divide-opacity-10 text-sm font-medium"
          >
            <li
              v-for="product in products"
              :key="product.id"
              class="flex items-start space-x-4 py-6"
            >
              <img
                :src="product.imageSrc"
                :alt="product.imageAlt"
                class="h-20 w-20 flex-none rounded-md object-cover object-center"
              />
              <div class="flex-auto space-y-1">
                <h3 class="text-white">{{ product.name }}</h3>
                <p>{{ product.color }}</p>
                <p>{{ product.size }}</p>
              </div>
              <p class="flex-none text-base font-medium text-white">
                {{ product.price }}
              </p>
            </li>
          </ul>

          <dl
            class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium"
          >
            <div class="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd>$570.00</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Shipping</dt>
              <dd>$25.00</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Taxes</dt>
              <dd>$47.60</dd>
            </div>

            <div
              class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">$642.60</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>

        <form>
          <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <div>
              <h3
                id="contact-info-heading"
                class="text-lg font-medium text-gray-900"
              >
                Contact information
              </h3>

              <div class="mt-6">
                <label
                  for="full-name"
                  class="block text-sm font-medium text-gray-700"
                  >Full Name</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    autocomplete="full-name"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  />
                </div>
              </div>
              <div class="mt-1">
                <label
                  for="email-address"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <div class="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autocomplete="email"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div class="mt-4">
              <h3
                id="payment-heading"
                class="mb-4 text-lg font-medium text-gray-900"
              >
                Payment details
              </h3>

              <form id="payment-form">
                <div id="payment-element">
                  <!--Stripe.js injects the Payment Element-->
                </div>
                <div
                  class="mt-10 flex justify-end border-t border-gray-200 pt-6"
                >
                  <button
                    id="submit"
                    class="rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium uppercase text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">Book now</span>
                  </button>
                  <div id="payment-message" class="hidden"></div>
                </div>
              </form>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>
