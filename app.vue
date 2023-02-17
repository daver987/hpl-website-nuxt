<script setup lang="ts">
import { useOsTheme, darkTheme } from 'naive-ui'
const osTheme = useOsTheme()

const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types/supabase.ts
//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types.ts
useHead({
  meta: [
    {
      name: 'naive-ui-style',
    },
  ],
})
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
