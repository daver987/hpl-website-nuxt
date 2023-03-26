// import '@total-typescript/ts-reset'

export default defineNuxtConfig({
  //@ts-ignore
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  build: {
    transpile: ['@headlessui/vue', '@googlemaps/js-api-loader', 'trpc-nuxt'],
  },
  css: ['vue-tel-input/dist/vue-tel-input.css'],
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-typed-router',
    'nuxt-lodash',
    'nuxt-vitest',
    '@huntersofbook/naive-ui-nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'definePiniaStore'],
      },
    ],
  ],
  routeRules: {
    '**': { prerender: true },
  },
  colorMode: {
    classSuffix: '',
  },
  lodash: {
    prefix: '_',
  },

  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#A57C52FF',
        primaryColorSuppl: 'rgba(165, 124, 82, 1)',
        primaryColorHover: '#BD9975FF',
        primaryColorPressed: '#8A6642FF',
        bodyColor: 'rgba(64, 64, 64, 1)',
        cardColor: 'rgba(82, 82, 82, 1)',
        modalColor: 'rgba(64, 64, 64, 1)',
        errorColorSuppl: 'rgba(185, 28, 27, 1)',
        errorColor: '#b91c1cFF',
        errorColorPressed: '#dc2626FF',
        errorColorHover: '#ef4444FF',
        popoverColor: 'rgba(64, 64, 64, 1)',
        tableColor: 'rgba(82, 82, 82, 1)',
        borderRadius: '0',
        borderRadiusSmall: '0',
        textColor1: 'rgba(245, 245, 245, 0.9)',
        textColor2: 'rgba(245, 245, 245, 0.82)',
        textColor3: 'rgba(245, 245, 245, 0.52)',
        textColorDisabled: 'rgba(245, 245, 245, 0.38)',
        placeholderColor: 'rgba(245, 245, 245, 0.38)',
        placeholderColorDisabled: 'rgba(245, 245, 245, 0.28)',
        iconColor: 'rgba(245, 245, 245, 0.38)',
        iconColorDisabled: 'rgba(245, 245, 245, 0.28)',
        iconColorHover: 'rgba(245, 245, 245, 0.48)',
        iconColorPressed: 'rgba(245, 245, 245, 0.3)',
        dividerColor: 'rgba(245, 245, 245, 0.09)',
        borderColor: 'rgba(245, 245, 245, 0.24)',
        closeIconColorHover: 'rgba(245, 245, 245, 0.52)',
        closeIconColor: 'rgba(245, 245, 245, 0.52)',
        closeIconColorPressed: 'rgba(245, 245, 245, 0.52)',
        closeColorHover: 'rgba(245, 245, 245, 0.12)',
        closeColorPressed: 'rgba(245, 245, 245, 0.08)',
        clearColor: 'rgba(245, 245, 245, 0.38)',
        clearColorHover: 'rgba(245, 245, 245, 0.48)',
        clearColorPressed: 'rgba(245, 245, 245, 0.3)',
        scrollbarColor: 'rgba(245, 245, 245, 0.2)',
        scrollbarColorHover: 'rgba(245, 245, 245, 0.3)',
        progressRailColor: 'rgba(245, 245, 245, 0.12)',
        railColor: 'rgba(245, 245, 245, 0.2)',
        tagColor: 'rgba(64, 64, 64, 1)',
        avatarColor: 'rgba(245, 245, 245, 0.18)',
        invertedColor: '#171717FF',
        inputColor: 'rgba(245, 245, 245, 0.1)',
        codeColor: 'rgba(245, 245, 245, 0.12)',
        tabColor: 'rgba(245, 245, 245, 0.04)',
        actionColor: 'rgba(245, 245, 245, 0.06)',
        tableHeaderColor: 'rgba(245, 245, 245, 0.06)',
        hoverColor: 'rgba(245, 245, 245, 0.09)',
        tableColorHover: 'rgba(245, 245, 245, 0.06)',
        tableColorStriped: 'rgba(245, 245, 245, 0.05)',
        pressedColor: 'rgba(245, 245, 245, 0.05)',
        inputColorDisabled: 'rgba(245, 245, 245, 0.06)',
        buttonColor2Hover: 'rgba(245, 245, 245, 0.12)',
        buttonColor2Pressed: 'rgba(245, 245, 245, 0.08)',
        buttonColor2: 'rgba(246, 245, 245, 0.08)',
      },
      Card: {
        boxShadow: '0 20px 13px rgb(0 0 0 / 0.03),0 8px 5px rgb(0 0 0 / 0.08)',
      },
      Typography: {
        liTextColor: 'rgba(64, 64, 64, 1)',
        textColor1Depth: 'rgba(82, 82, 82, 1)',
        textColor2Depth: 'rgba(115, 115, 115, 1)',
        textColor3Depth: 'rgba(163, 163, 163, 1)',
      },
    },
  },
  nitro: {
    preset: 'vercel',
  },
  runtimeConfig: {
    TWILIO_STRIPE_RESPONSE_SERVICE: process.env.TWILIO_STRIPE_RESPONSE_SERVICE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    ZAPIER_WEBHOOK_SECRET: process.env.ZAPIER_WEBHOOK_SECRET,
    ZAPIER_WEBHOOK_EMAIL: process.env.ZAPIER_WEBHOOK_EMAIL,
    AIRCALL_API_TOKEN: process.env.AIRCALL_API_TOKEN,
    AIRCALL_API_ID: process.env.AIRCALL_API_ID,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    public: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
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
  typescript: {
    shim: true,
  },
  vite: {
    resolve: {
      alias: { '.prisma/client/index-browser': `@prisma/client/index-browser` },
    },
  },
})
