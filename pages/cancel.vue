<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

useHead({
  title: 'Cancel',
  meta: [
    {
      name: 'description',
      content: 'Cancel page',
    },
  ],
})
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div>
    <Vehicle />
    <TabGroup>
      <TabList>
        <Tab>A</Tab>
        <Tab>B</Tab>
        <Tab>C</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel>Panel 1</TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
  <!--  <section class="min-h-screen bg-primary">-->
  <!--    <AppNavigation />-->
  <!--    <div class="p-6 text-center">-->
  <!--      <p class="mb-4 text-3xl font-bold">-->
  <!--        Forgot to add something? Shop around then come back to pay!-->
  <!--      </p>-->
  <!--      <p class="mb-6 font-bold">-->
  <!--        Don't forget to check out our current promotions:-->
  <!--      </p>-->
  <!--      <div class="grid place-items-center gap-4 md:grid-cols-2">-->
  <!--        <div>Book early and get a complimentary vehicle upgrade!!</div>-->
  <!--        <div>Book a round trip and get an extra 10% OFF!</div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="flex flex-row items-center justify-center p-12">-->
  <!--      <NuxtLink-->
  <!--        class="rounded-md bg-black px-12 py-4 text-white"-->
  <!--        to="https://highparklivery.com"-->
  <!--        >HOME</NuxtLink-->
  <!--      >-->
  <!--    </div>-->
  <!--  </section>-->
</template>

<style scoped></style>
