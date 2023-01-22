<template>
  <HeadlessSwitchGroup as="div" class="flex items-center">
    <HeadlessSwitch
      v-model="enabled"
      class="ui-checked:bg-brand ui-not-checked:bg-gray-300 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
    >
      <span class="sr-only">{{ ariaLabel }}</span>
      <span
        aria-hidden="true"
        class="inline-block h-5 w-5 shadow ring-0 transition duration-200 ease-in-out transform rounded-full bg-white transition ui-checked:translate-x-5 ui-not-checked:translate-x-0"
      />
    </HeadlessSwitch>
    <HeadlessSwitchLabel as="span" class="ml-3">
      <span class="text-sm font-medium dark:text-white text-gray-900">{{
        label
      }}</span>
    </HeadlessSwitchLabel>
  </HeadlessSwitchGroup>
</template>

<script setup>
const props = defineProps({
  enabled: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  ariaLabel: {
    type: String,
    required: false,
  },
})

const enabled = ref(false)
</script>
