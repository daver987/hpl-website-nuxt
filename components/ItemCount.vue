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
  <div class="flex flex-col items-center h-full mb-8 space-y-4 md:m-0">
    <slot></slot>
    <h4
      class="text-base font-semibold tracking-widest text-center text-gray-500 uppercase"
    >
      {{ kind }}
    </h4>
    <p class="text-5xl text-gray-700 font-heading">
      {{ amount }}
    </p>
  </div>
</template>
