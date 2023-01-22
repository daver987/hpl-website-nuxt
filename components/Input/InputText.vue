<script setup lang="ts">
import { useField } from 'vee-validate'
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const {
  value: inputValue,
  errorMessage,
  handleChange,
} = useField(props.name, undefined, {
  initialValue: props.value,
})
</script>

<template>
  <div
    class="px-3 bg-white border border-gray-300 rounded shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label :for="name" class="block text-gray-700 text-xxs font-regular">{{
      label
    }}</label>
    <input
      :aria-label="label"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      @input="handleChange"
      :value="inputValue"
      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm pb-0.5 -mt-1"
    />
    <div v-if="!showError" class="flex">
      <div class="block text-xs text-red-700">
        <div role="alert">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>
