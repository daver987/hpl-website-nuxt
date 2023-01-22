export default defineNuxtConfig({
  // typescript: {
  //   shim: false,
  // },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  nitro: {
    preset: 'netlify',
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    '@nuxtjs/supabase',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],
  extends: ['nuxt-seo-kit'],
  build: {
    transpile: [
      '@googlemaps/js-api-loader',
      '@heroicons/vue',
      '@headlessui/vue',
      'libphonenumber-js',
      'vue-tel-input',
    ],
  },
  css: ['vue-tel-input/dist/vue-tel-input.css'],
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    ZAPIER_WEBHOOK_SECRET: process.env.ZAPIER_WEBHOOK_SECRET,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
      siteUrl: 'https://highparklivery.com/',
      siteName: 'Toronto Car Service | High Park Livery',
      siteDescription:
        'A top-rated Toronto car service, High Park Livery provides luxury transportation to and from Toronto Pearson Airport, Billy Bishop Airport, and more.',
      language: 'en-CA',
      titleSeparator: '|',
    },
  },
})
