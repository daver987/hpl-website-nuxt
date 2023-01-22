<script setup lang="ts">
import { CalendarIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import {
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Dialog,
} from '@headlessui/vue'
import { useField } from 'vee-validate'

const open = ref<boolean>(false)
const selectedDate = ref('')

const props = defineProps({
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
    required: false,
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

const toggleCalendar = () => {
  open.value = !open.value
}
const updateDate = (date: string, isOpen: boolean) => {
  selectedDate.value = date
  inputValue.value = date
  open.value = isOpen
  console.log('date', date)
}
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative max-w-xs pt-2 pb-8 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full"
              >
                <div
                  class="absolute bottom-0 right-0 hidden pt-4 pr-4 sm:block"
                >
                  <button
                    v-if="false"
                    type="button"
                    class="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    @click="open = false"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <Calendar class="mx-auto mt-4" @date="updateDate" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div>
      <label :for="name" class="block text-xs font-medium text-gray-700">{{
        label
      }}</label>
      <div class="relative mt-1 rounded shadow-sm">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <CalendarIcon
            @click="toggleCalendar"
            class="w-5 h-5 text-gray-400 cursor-pointer"
            aria-hidden="true"
            role="button"
          />
        </div>
        <input
          :aria-label="name"
          :name="name"
          :id="name"
          :placeholder="placeholder"
          @input="handleChange"
          :value="inputValue"
          type="text"
          class="block w-full pl-10 placeholder-gray-400 border-gray-300 rounded focus:border-brand focus:ring-brand sm:text-sm"
        />
      </div>
      <div v-if="!showError" class="flex">
        <div class="block text-xs text-red-700">
          <div role="alert">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
