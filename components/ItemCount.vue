<script setup lang="ts">
defineProps({
  kind: {
    type: String,
    default: 'luggage',
  },
  amount: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div class="mb-8 flex h-full flex-col items-center space-y-4 md:m-0">
    <slot></slot>
    <h4
      class="text-center text-base font-semibold uppercase tracking-widest text-gray-500"
    >
      {{ kind }}
    </h4>
    <p class="font-heading text-5xl text-gray-700">
      {{ amount }}
    </p>
  </div>
</template>
