<script setup lang="ts">
import { Ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

useHead({
  title: 'High Park Livery | Fleet',
})
definePageMeta({
  title: 'High Park Livery | Luxury Fleet',
  layout: 'default',
})
const headerInfo = {
  aboveHeading: 'Discover Our Luxury Vehicles',
  heading: 'OUR FLEET',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8027755f-611b-4470-96bf-4b845c9f5600/4200")',
}

interface Vehicles {
  icon: string
  title: string
  id: string
  tag: string
  to: string
}
const selectedTab: Ref<number> = ref(0)
function changeTab(index: number) {
  selectedTab.value = index
  console.log(selectedTab.value)
}

const tabs = [
  {
    icon: 'Fleet-XTS-Continental',
    title: 'Cadillac XTS',
    id: '0',
    tag: resolveComponent('FleetCadillacXts'),
    to: '/fleet',
  },
  {
    icon: 'Fleet-XTS-Continental',
    title: 'Lincoln Continental',
    id: '1',
    tag: resolveComponent('FleetLincolnContinental'),
    to: '/fleet/lincoln-continental',
  },
  {
    icon: 'Fleet-Navigator-Escalade',
    title: 'Cadillac Escalade',
    id: '2',
    tag: resolveComponent('FleetCadillacEscalade'),
    to: '/fleet/cadillac-escalade',
  },
  {
    icon: 'Fleet-Navigator-Escalade',
    title: 'Lincoln Navigator',
    id: '3',
    tag: resolveComponent('FleetLincolnNavigator'),
    to: '/fleet/lincoln-navigator',
  },
  {
    icon: 'Fleet-Tesla',
    title: 'Tesla S',
    id: '4',
    tag: resolveComponent('FleetTeslaS'),
    to: '/fleet/tesla-s',
  },
  {
    icon: 'Fleet-Other',
    title: 'Other',
    id: '6',
    tag: resolveComponent('FleetOther'),
    to: '/fleet/other',
  },
] as Vehicles[]
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <TabGroup
      @change="changeTab"
      as="div"
      :defaultIndex="0"
      class="container px-6 pt-6 mx-auto md:-mt-20 md:px-0"
    >
      <TabList
        class="relative z-10 grid grid-cols-2 gap-1 mx-auto mb-12 md:grid-cols-3 lg:grid-cols-6"
      >
        <Tab
          v-slot="{ selected }"
          v-for="tab in tabs"
          :key="tab.id"
          as="template"
        >
          <button
            ref="tabRef"
            :id="tab.id"
            :data-vehicle="tab.tag"
            :class="[
              selected ? 'bg-primary text-white' : 'bg-white text-gray-500',
            ]"
            class="flex flex-col items-center justify-center w-full col-span-1 py-16 space-y-4 border-white hover:bg-primary hover:text-white"
          >
            <NuxtPicture
              :src="`/icons/${tab.icon}.svg`"
              alt="icon"
              class="w-16"
            />
            <span
              class="text-sm tracking-widest text-center uppercase hover:text-white"
              :class="[selected ? 'bg-primary text-white' : 'text-gray-500']"
            >
              {{ tab.title }}
            </span>
          </button>
        </Tab>
      </TabList>
      <TabPanels as="div">
        <TabPanel v-for="tab in tabs" :key="tab.id">
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <component :is="tab.tag" />
          </transition>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
