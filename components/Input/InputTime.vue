<script setup lang="ts">
import { ClockIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { PlusIcon as PlusIconMini } from '@heroicons/vue/20/solid'
import { MinusIcon as MinusIconMini } from '@heroicons/vue/20/solid'
import {
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Dialog,
} from '@headlessui/vue'
import { useField } from 'vee-validate'

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
const open = ref<boolean>(false)
const toggleTimePicker = () => {
  open.value = !open.value
}
const minutes = ref(0)
const hours = ref(12)
const ampm = ref('AM')

const incrementHours = () => {
  hours.value = (hours.value % 12) + 1
  inputValue.value = `${hours.value.toString().padStart(2, '0')}:${minutes.value
    .toString()
    .padStart(2, '0')} ${amPm[amPmIndex.value].title}`
}

const decrementHours = () => {
  hours.value = hours.value === 1 ? 12 : hours.value - 1
  inputValue.value = `${hours.value.toString().padStart(2, '0')}:${minutes.value
    .toString()
    .padStart(2, '0')} ${amPm[amPmIndex.value].title}`
}

const incrementMinutes = () => {
  minutes.value = (minutes.value + 5) % 60 || 0
  inputValue.value = `${hours.value.toString().padStart(2, '0')}:${minutes.value
    .toString()
    .padStart(2, '0')} ${amPm[amPmIndex.value].title}`
}

const decrementMinutes = () => {
  minutes.value = (minutes.value + 55) % 60 || 0
  inputValue.value = `${hours.value.toString().padStart(2, '0')}:${minutes.value
    .toString()
    .padStart(2, '0')} ${amPm[amPmIndex.value].title}`
}

const amPm = [
  { id: '0', title: 'AM' },
  { id: '1', title: 'PM' },
]
const amPmIndex = ref(0)
const changeAmPm = () => {
  amPmIndex.value = (amPmIndex.value + 1) % 2
  inputValue.value = `${hours.value.toString().padStart(2, '0')}:${minutes.value
    .toString()
    .padStart(2, '0')} ${amPm[amPmIndex.value].title}`
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
                class="relative max-w-sm p-8 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full"
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
                <div class="flex flex-row justify-around space-x-6">
                  <div class="flex flex-row space-x-2">
                    <div class="flex flex-col">
                      <button
                        @click="incrementHours"
                        type="button"
                        class="inline-flex items-center p-1 text-white border border-transparent rounded-none shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      >
                        <PlusIconMini class="w-5 h-5" aria-hidden="true" />
                      </button>
                      <span>{{ hours }}</span>
                      <button
                        @click="decrementHours"
                        type="button"
                        class="inline-flex items-center p-1 text-white border border-transparent rounded-none shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      >
                        <MinusIconMini class="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                    <span class="self-center">:</span>
                    <div class="flex flex-col">
                      <button
                        @click="incrementMinutes"
                        type="button"
                        class="inline-flex items-center p-1 text-white border border-transparent rounded-none shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      >
                        <PlusIconMini class="w-5 h-5" aria-hidden="true" />
                      </button>
                      <span>{{
                        minutes< 9? 0 + '' + '' + minutes : minutes
                      }}</span>
                      <button
                        @click="decrementMinutes"
                        type="button"
                        class="inline-flex items-center p-1 text-white border border-transparent rounded-none shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      >
                        <MinusIconMini class="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <fieldset class="mt-4">
                      <legend class="sr-only">AM/PM</legend>
                      <div class="space-y-4">
                        <div
                          v-for="a in amPm"
                          :key="a.id"
                          class="flex items-center"
                        >
                          <input
                            @click="changeAmPm"
                            v-model="ampm"
                            :id="a.id"
                            name="notification-method"
                            type="radio"
                            :value="a.title"
                            class="w-4 h-4 border-gray-300 text-brand-600 focus:ring-brand"
                          />
                          <label
                            :for="a.id"
                            class="block ml-3 text-sm font-medium text-gray-700"
                            >{{ a.title }}</label
                          >
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
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
          <ClockIcon
            @click="toggleTimePicker"
            class="w-5 h-5 text-gray-400 cursor-pointer"
            aria-hidden="true"
            role="button"
          />
        </div>
        <input
          :aria-label="label"
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
