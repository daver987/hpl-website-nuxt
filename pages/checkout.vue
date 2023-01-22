<script lang="ts" setup>
definePageMeta({
  title: 'Checkout',
  layout: 'store',
})

const route = useRoute().query
console.log(route.quoteNumber)
</script>

<template>
  <div class="min-h-screen dark:bg-grey-900">
    <AppNavigation :is-it-quote="false" />
    <ShoppingCart />
  </div>
</template>
