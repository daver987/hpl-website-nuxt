<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  enabled: {
    type: Boolean,
    required: false,
  },
  bannerLabel: {
    type: String,
    required: false,
    default: 'Book Online Now and save 10% on your trip',
  },
  bannerLinkLabel: {
    type: String,
    required: false,
    default: 'Learn more',
  },
})
const hideBanner = ref(true)
const dismissBanner = () => {
  hideBanner.value = false
}
</script>

<template>
  <div v-if="hideBanner" class="bg-brand">
    <div class="px-3 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="pr-16 sm:px-16 sm:text-center">
        <p class="font-medium text-white">
          <span v-if="true" class="text-sm">{{ bannerLabel }}</span>
          <span class="hidden text-sm md:inline">{{ bannerLabel }}</span>
          <span class="block sm:ml-2 sm:inline-block">
            <NuxtLink
              v-if="false"
              href="#"
              class="font-bold text-white underline"
            >
              {{ bannerLinkLabel }}
              <span aria-hidden="true"> &rarr;</span>
            </NuxtLink>
          </span>
        </p>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2"
      >
        <button
          type="button"
          @click="dismissBanner"
          class="flex p-2 rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon class="w-4 h-4 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>
