<script setup lang="ts">
useHead({
  title: 'High Park Livery | Reservations',
  // script: [
  //   {
  //     src: 'https://book.mylimobiz.com/v4/widgets/widget-loader.js',
  //     type: 'text/javascript',
  //   },
  // ],
})
definePageMeta({
  layout: 'default',
})
useScriptTag('https://book.mylimobiz.com/v4/widgets/widget-loader.js')
const url = useRuntimeConfig().public.WEBSITE_URL
const headerInfo = {
  aboveHeading: 'Reserve Your Ride',
  heading: 'BOOK BELOW',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/531a6f45-89f1-4d09-8d75-4a9edf034100/1920");',
}
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <section class="px-6">
      <div
        class="container relative z-20 mx-auto -mt-16 mb-16 h-[125vh] w-full max-w-7xl md:-mt-20"
      >
        <a
          href="https://book.mylimobiz.com/v4/highpark"
          data-ores-widget="website"
          data-ores-alias="highpark"
          >Online Reservations</a
        >
        <!--        <a-->
        <!--          href="https://book.mylimobiz.com/v4/highpark"-->
        <!--          data-ores-widget="quickres"-->
        <!--          data-ores-alias="highpark"-->
        <!--          :data-redirect-url="`${url}/reservations`"-->
        <!--          >Online Reservations-->
        <!--        </a>-->
      </div>
    </section>
    <AppFooter />
  </div>
</template>
