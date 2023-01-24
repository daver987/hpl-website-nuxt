<script setup lang="ts">
definePageMeta({
  name: 'Cart',
  layout: 'store',
})
</script>

<template>
  <div class="dark:bg-grey-900">
    <AppNavigation />
    <ShoppingCart :is-it-quote="false" />
    <SubFooter />
  </div>
</template>
