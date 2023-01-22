<script setup lang="ts">
import { navigation, NavigationItem } from '~/data/navigation'

const companyName = 'High Park Livery'
const companyEmail = 'info@highparklivery.com'
const companyPhone = '647.360.9631'
const companyLogo =
  'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c6c7415a-d52d-46fa-a85e-1ba5153b2000/1920'

const nav = navigation as NavigationItem[]
</script>

<template>
  <footer>
    <div class="px-6 lg:px-10">
      <FooterCta />
    </div>
    <div
      class="w-full px-6 pt-24 pb-8 bg-background-dark lg:px-10 lg:pt-16 lg:pb-4"
    >
      <div
        class="grid grid-cols-1 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <div class="my-8 space-y-10">
          <NuxtLink to="/" class="max-w-[125px] block">
            <NuxtPicture
              :alt="companyName"
              :src="companyLogo"
              :img-attrs="{
                class: 'object-contain object-center w-full',
              }"
              width="1920"
            />
          </NuxtLink>

          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-3xl text-primary" name="zmdi:phone" />
            <NuxtLink
              :href="`tel:${companyPhone}`"
              class="text-base tracking-wider text-white cursor-pointer font-body hover:text-primary"
              >{{ companyPhone }}
            </NuxtLink>
          </div>
          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-4xl text-primary" name="ic:outline-mail" />
            <NuxtLink
              :href="`mailto:${companyEmail}`"
              class="text-base tracking-wider text-white cursor-pointer font-body hover:text-primary"
              >{{ companyEmail }}
            </NuxtLink>
          </div>
        </div>
        <div class="my-8 space-y-4">
          <h3
            class="text-xl tracking-widest uppercase font-subheading text-primary"
          >
            Quick Links
          </h3>
          <ul
            class="flex flex-col font-bold leading-relaxed tracking-wider uppercase font-body text-body-light"
          >
            <li v-for="myNavigation in nav" :key="myNavigation.id">
              <NuxtLink
                :to="myNavigation.href"
                active-class="text-brand hover:text-brand-600"
              >
                {{ myNavigation.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="my-8 space-y-6 lg:space-y-4">
          <h3
            class="text-xl tracking-widest uppercase font-subheading text-primary"
          >
            Sign Up
          </h3>
          <EmailInput />
          <BaseButton kind="btn-solid" label="Subscribe" />
          <p
            class="text-base tracking-wider text-center uppercase font-body text-body-light"
          >
            Socialize With {{ companyName }}
          </p>
          <div class="flex flex-row justify-center gap-8 mx-auto max-w-40">
            <Icon class="text-3xl text-primary" name="zmdi:facebook" />
            <Icon class="text-3xl text-primary" name="zmdi:twitter" />
            <Icon class="text-3xl text-primary" name="zmdi:instagram" />
          </div>
        </div>
      </div>
    </div>
    <SubFooter />
  </footer>
</template>
