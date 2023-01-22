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
  <div class="flex flex-row @xs:flex-col bg-white shadow-xl p-4">
    <div class="flex-shrink-0 mb-4 @sm:mb-0 @sm:mr-4">
      <img :alt="altText" :src="`/icons/${image}.svg`" class="w-auto h-16"/>
    </div>
    <div>
      <h4 class="text-base tracking-widest uppercase subheading text-primary">{{ title }}</h4>
      <p class="mt-1">{{ body }}</p>
    </div>
  </div>
</template>
