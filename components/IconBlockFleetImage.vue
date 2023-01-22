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
})
</script>

<template>
  <NuxtPicture
    :alt="altText"
    :src="image"
    :img-attrs="{
      class: 'md:object-center md:object-cover',
    }"
    width="1920"
    loading="lazy"
  />
</template>
