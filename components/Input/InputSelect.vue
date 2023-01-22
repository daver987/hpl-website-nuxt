<template>
  <div class="w-full col-span-6">
    <label v-show="showLabel" :for="name" class="label"
      ><span class="label-text">{{ label }}</span></label
    >
    <select
      :id="id"
      :name="name"
      class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
      :value="modelValue"
      @input="$emit('update:modelValue', handleInputChange($event))"
      :required="required"
    >
      <option disabled value="">
        {{ placeholder }}
      </option>
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-show="validation" class="label-text text-error">
      {{ validationErrorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '~~/types/FormOptions'

const handleInputChange = (event: Event): any =>
  (event.target as HTMLInputElement).value

interface Props {
  id: string
  name?: string
  label?: string
  placeholder?: string
  options: FormOptions[]
  required?: boolean
  validation?: boolean
  validationErrorMessage?: string
  showLabel?: boolean
  modelValue: string | number
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>
