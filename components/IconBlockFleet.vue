<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  grid: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div :class="grid">
    <div
      class="flex flex-col space-y-6 bg-white px-8 py-12 shadow-xl md:px-6 lg:px-8"
    >
      <p class="subheading text-center md:text-left">luxury vehicle</p>
      <h2 class="heading text-center text-4xl md:text-left xl:text-5xl">
        {{ heading }}
      </h2>
      <div class="flex max-w-lg justify-center md:justify-start">
        <BaseButton
          kind="btn-flat"
          label="View More"
          to="/fleet"
          :nuxtLink="true"
        >
          <Icon
            name="ic:twotone-arrow-right-alt"
            class="h-12 w-auto text-brand"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
