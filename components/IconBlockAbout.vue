<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="p-4 sm:flex">
    <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
      <img :alt="altText" :src="`/icons/${image}.svg`" class="w-16" />
    </div>
    <div>
      <h3 class="text-lg font-subheading text-brand">{{ title }}</h3>
      <p class="mt-1 font-sans text-gray-500">{{ body }}</p>
    </div>
  </div>
</template>
