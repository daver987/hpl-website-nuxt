<script setup lang="ts">
definePageMeta({
  title: 'Sign In',
  layout: 'auth',
})
</script>

<template>
  <div class="flex min-h-screen dark:bg-grey-900">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <SigninForm />
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <NuxtPicture
        :img-attrs="{ class: 'absolute inset-0 h-full w-full object-cover' }"
        src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d0f63a6f-1d68-49fe-b643-224003dd5f00/1920"
        alt="Toronto skyline"
      />
    </div>
  </div>
</template>
