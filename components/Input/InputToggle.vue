<script lang="ts" setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
})
const enabled = ref(false)
const emit = defineEmits(['update:enabled'])
const toggleSwitch = () => {
  enabled.value = !enabled.value
  emit('update:enabled', enabled.value)
}
emit('update:enabled', enabled.value)
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      @update="toggleSwitch"
      :checked="enabled"
      v-slot="{ checked }"
      :class="[
        enabled ? 'bg-brand-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
    <SwitchLabel as="span" class="ml-3">
      <span class="text-sm font-medium text-gray-900">{{ label }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
