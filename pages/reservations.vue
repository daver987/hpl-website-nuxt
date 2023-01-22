<script setup lang="ts">
useHead({
  title: 'High Park Livery | Reservations',
  script: [
    {
      src: 'https://book.mylimobiz.com/v4/widgets/widget-loader.js',
      type: 'text/javascript',
    },
  ],
})
const headerInfo = {
  aboveHeading: 'Reserve Your Ride',
  heading: 'BOOK BELOW',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/531a6f45-89f1-4d09-8d75-4a9edf034100/1920");',
}
definePageMeta({
  title: 'Reservations',
  layout: 'default',
})
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
        class="container mx-auto h-[125vh] -mt-16 mb-16 w-full max-w-7xl z-20 relative md:-mt-20"
      >
        <NuxtLink
          href="https://book.mylimobiz.com/v4/highpark"
          data-ores-widget="website"
          data-ores-alias="highpark"
          >Online Reservations
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
