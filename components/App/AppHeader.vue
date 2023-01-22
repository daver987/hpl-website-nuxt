<script setup lang="ts">
defineProps({
  aboveHeading: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  companyPhone: {
    type: String,
    required: false,
    default: '647.360.9631',
  },
  companyEmail: {
    type: String,
    required: false,
    default: 'info@highparklivery.com',
  },
})
</script>

<template>
  <header
    class="relative min-h-screen overflow-hidden"
    style="
      background-image: url('https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c2f2c5f0-7a8d-4617-e4aa-d81156a40600/4200');
    "
  >
    <AppNavigation />
    <BaseContainer
      class="relative grid h-full grid-cols-1 mt-20 md:grid-cols-2"
    >
      <div
        :style="image"
        class="relative py-32 bg-black bg-center bg-no-repeat bg-cover md:col-span-2 md:px-10 bg-opacity-60 bg-blend-darken"
      >
        <div class="space-y-4 text-center md:text-left">
          <p
            class="text-sm tracking-widest text-center font-subheading text-brand md:text-left"
          >
            {{ aboveHeading }}
          </p>
          <h1
            class="leading-tight text-center text-white capitalize font-heading md:text-left"
          >
            {{ heading }}
          </h1>
          <p class="max-w-xs mx-auto md:m-0 md:text-left">
            {{ body }}
          </p>
          <div
            class="tracking-wide md:transform md:-rotate-90 md:absolute md:-left-20 bottom-1/2"
          >
            <NuxtLink
              :href="`tel:${companyPhone}`"
              class="text-sm text-center text-gray-300 font-body"
              ><span class="text-brand">CALL :</span>
              {{ companyPhone }}</NuxtLink
            >
          </div>
          <div
            class="my-1 md:transform md:rotate-90 md:absolute md:-right-36 bottom-1/2"
          >
            <NuxtLink
              :href="`mailto:${companyEmail}`"
              class="text-sm tracking-wide text-center text-gray-300 uppercase font-body"
              ><span class="text-brand">EMAIL :</span>
              {{ companyEmail }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
