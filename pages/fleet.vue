<script setup lang="ts">
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TransitionRoot,
} from '@headlessui/vue'

definePageMeta({
  layout: 'default',
  title: 'High Park Livery | Luxury Fleet',
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
const selectedTab = ref(0)

function changeTab(index: number) {
  selectedTab.value = index
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
]
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
      :selected-index="selectedTab"
      @change="changeTab"
      as="main"
      class="mx-auto max-w-7xl px-6 pt-6 md:-mt-20 md:px-8 lg:px-12"
    >
      <TabList
        class="relative z-10 mx-auto mb-12 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6"
      >
        <Tab
          v-slot="{ selected }"
          v-for="tab in tabs"
          :key="tab.id"
          as="template"
        >
          <button
            :class="[
              selected ? 'bg-primary text-white' : 'bg-white text-gray-500',
            ]"
            class="col-span-1 flex w-full flex-col items-center justify-center space-y-4 border-white px-2 py-16 hover:bg-primary hover:text-white"
          >
            <img :src="`/icons/${tab.icon}.svg`" alt="icon" class="w-16" />
            <span
              class="text-center text-sm uppercase tracking-widest hover:text-white"
              :class="[selected ? 'bg-primary text-white' : 'text-gray-500']"
            >
              {{ tab.title }}
            </span>
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FleetCadillacXts />
        </TabPanel>
        <TabPanel>
          <FleetLincolnContinental />
        </TabPanel>
        <TabPanel>
          <FleetCadillacEscalade />
        </TabPanel>
        <TabPanel>
          <FleetLincolnNavigator />
        </TabPanel>
        <TabPanel>
          <FleetTeslaS />
        </TabPanel>
        <TabPanel>
          <FleetOther />
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <AppFooter />
  </div>
</template>
