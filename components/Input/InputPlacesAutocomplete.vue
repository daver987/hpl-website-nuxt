<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

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
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    default: 'Required -*',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  showError: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref<google.maps.places.Autocomplete | null>(null)
const inputField = ref<HTMLInputElement | null>(null)
const place = ref<google.maps.places.PlaceResult | null>(null)

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

const initAutocomplete = async () => {
  await loader.load().then(() => {
    autocomplete.value = new google.maps.places.Autocomplete(
      inputField.value!,
      {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['place_id', 'formatted_address', 'name', 'types'],
      }
    )
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value!.getPlace()
  console.log('Returned place components:', place.value)
  const { place_id } = place.value
  console.log(place_id)
  emit('change', place.value)
  return place_id
}

const emit = defineEmits(['change'])

onMounted(async () => {
  await initAutocomplete()
})
const modelValue = ref('')
</script>

<template>
  <div
    class="rounded border border-gray-300 bg-white px-3 shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label :for="name" class="font-regular block text-xxs text-gray-700">{{
      label
    }}</label>
    <input
      ref="inputField"
      :aria-label="label"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="(event) => (modelValue = event.target?.value)"
      class="-mt-1 block w-full border-0 p-0 pb-0.5 capitalize text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
    />
    <div v-if="showError === null" class="flex">
      <div class="block text-xs text-red-700">
        <div role="alert">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>
