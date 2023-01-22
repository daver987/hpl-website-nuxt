<script setup>
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

const props = defineProps({
  value: {
    type: Object,
    required: false,
  },
  options: {
    type: Array,
    required: true,
    default: [{ value: 0, label: 'Wade Cooper' }],
  },
  label: {
    type: String,
    required: false,
    default: 'Label Area',
  },
  name: {
    type: String,
    required: false,
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  modelValue: {
    type: Object,
    required: false,
    default: '',
  },
  classes: {
    type: String,
    required: false,
    default: 'text-gray-900',
  },
  showCheckIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <Listbox
    as="div"
    :model-value="value || modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :name="name"
    :disabled="isDisabled"
  >
    <ListboxLabel v-if="false" class="block text-sm font-medium text-gray-700"
      >{{ label }}
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        :class="classes"
        class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded shadow-sm cursor-default focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
      >
        <span class="block capitalize truncate">{{ modelValue.label }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <ChevronUpDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-48 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.label"
            :value="option"
            :disabled="option.isDisabled"
            v-slot="{ active, selected, disabled }"
          >
            <li
              :class="[
                active ? 'text-white bg-brand-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                  active ? 'text-white' : 'text-gray-900',
                  disabled
                    ? 'cursor-not-allowed text-opacity-50'
                    : 'text-gray-900',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-brand-600',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
