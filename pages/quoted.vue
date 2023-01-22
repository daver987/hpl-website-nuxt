<script setup lang="ts">
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'store',
  name: 'Quoted',
})
const cartStore = useCartStore()
const { addedToCart } = storeToRefs(cartStore)
const route = useRoute()
const notification = ref<boolean>(false)
const showNotification = () => {
  if (route.fullPath === '/quoted' && !addedToCart.value) {
    setTimeout(() => {
      notification.value = true
    }, 1000)
    setTimeout(() => {
      notification.value = false
    }, 7000)
  }
}
showNotification()
</script>

<template>
  <div class="min-h-screen dark:bg-grey-900">
    <AppNavigation />
    <ShoppingCart />
    <Notification
      :show="notification"
      message1="Your Quote Has been Submitted"
      message2="A copy of the quote has been sent to your email address"
    />
  </div>
</template>
