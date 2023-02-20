<script setup lang="ts">
import { useOsTheme, darkTheme } from 'naive-ui'
import { useUserStore } from './stores/useUserStore'
import { useStorage } from '@vueuse/core'

useHead({
  meta: [
    {
      name: 'naive-ui-style',
    },
  ],
})

const userStore = useUserStore()
const userId = useStorage('userId', userStore.getUserId())

userStore.setUserId(userId.value)

const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))

//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types/supabase.ts
//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types.ts
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NGlobalStyle />
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <NuxtLayout>
            <SeoKit />
            <NuxtPage />
          </NuxtLayout>
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
