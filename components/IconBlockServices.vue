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
  <div class="flex flex-row bg-white p-4 shadow-xl @xs:flex-col">
    <div class="mb-4 flex-shrink-0 @sm:mb-0 @sm:mr-4">
      <img :alt="altText" :src="`/icons/${image}.svg`" class="h-16 w-auto" />
    </div>
    <div>
      <h3 class="subheading text-base uppercase tracking-widest text-primary">
        {{ title }}
      </h3>
      <p class="mt-1 font-sans text-gray-500">{{ body }}</p>
    </div>
  </div>
</template>
