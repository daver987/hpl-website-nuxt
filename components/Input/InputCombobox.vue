<template>
  <HeadlessCombobox as="div" v-model="selectedPerson">
    <HeadlessComboboxLabel class="block text-sm font-medium text-gray-700"
      >Assigned to
    </HeadlessComboboxLabel>
    <div class="relative mt-1">
      <HeadlessComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        @change="query = $event.target.value"
        :display-value="(person) => person?.name"
      />
      <HeadlessComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </HeadlessComboboxButton>

      <HeadlessComboboxOptions
        v-if="filteredPeople.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <HeadlessComboboxOption
          v-for="person in filteredPeople"
          :key="person.id"
          :value="person"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-8 pr-4',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person.name }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessComboboxOption>
      </HeadlessComboboxOptions>
    </div>
  </HeadlessCombobox>
</template>

<script setup>
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const people = [
  { id: 1, name: 'Toronto' },
  { id: 2, name: 'Guelph' },
  { id: 3, name: 'Waterloo' },
  { id: 4, name: 'Cambridge' },
  { id: 5, name: 'Milton' },
]

const query = ref('')
const selectedPerson = ref(null)
const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase())
      })
)
</script>
