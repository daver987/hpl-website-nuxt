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
      class="flex flex-col px-8 py-12 space-y-6 bg-white shadow-xl md:px-6 lg:px-8"
    >
      <p class="text-center subheading md:text-left">luxury vehicle</p>
      <h2 class="text-4xl text-center xl:text-5xl heading md:text-left">
        {{ heading }}
      </h2>
      <div class="flex justify-center max-w-lg md:justify-start">
        <BaseButton
          kind="btn-flat"
          label="View More"
          to="/fleet"
          :nuxtLink="true"
        >
          <Icon
            name="ic:twotone-arrow-right-alt"
            class="w-auto h-12 text-brand"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
