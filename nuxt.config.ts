import '@total-typescript/ts-reset'
// @ts-ignore
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  build: {
    transpile: [
      '@heroicons/vue',
      '@headlessui/vue',
      '@googlemaps/js-api-loader',
    ],
  },
  css: [],
  extends: ['nuxt-seo-kit'],
  //@ts-ignore
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    '@nuxtjs/supabase',
    'nuxt-vitest',
    '@huntersofbook/naive-ui-nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],
  nitro: {
    preset: 'netlify',
  },
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    ZAPIER_WEBHOOK_SECRET: process.env.ZAPIER_WEBHOOK_SECRET,
    AIRCALL_API_TOKEN: process.env.AIRCALL_API_TOKEN,
    AIRCALL_API_ID: process.env.AIRCALL_API_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
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
  // typescript: {
  //   shim: false,
  // },
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#9f6c27',
        primaryColorHover: '#674D32',
      },
    },
  },
})
