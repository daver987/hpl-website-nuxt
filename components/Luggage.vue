<script setup lang="ts">
defineProps({
  people: {
    type: String,
    default: 'people',
  },
  peopleAmount: {
    type: Number,
    default: 0,
  },
  luggage: {
    type: String,
    default: 'luggage',
  },
  luggageAmount: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <BaseCard class="flex justify-center w-full mb-8 md:max-w-2xl">
    <div class="flex flex-col justify-around w-full max-w-xl md:flex-row">
      <ItemCount :kind="people" :amount="peopleAmount">
        <Icon name="bi:people" class="w-16 h-auto text-gray-400" />
      </ItemCount>
      <ItemCount :kind="luggage" :amount="luggageAmount">
        <Icon
          name="fluent:luggage-28-regular"
          class="w-16 h-auto text-gray-400"
        />
      </ItemCount>
      <div class="flex flex-col items-center justify-center h-full">
        <BaseButton
          kind="btn-brand"
          label="Reserve"
          to="/reservations"
          :nuxtLink="true"
        />
      </div>
    </div>
  </BaseCard>
</template>
