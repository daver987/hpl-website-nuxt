<script lang="ts" setup>
import { ref } from '#imports'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { navigation } from '~/data/navigation'

definePageMeta({
  title: 'Sign Up',
  layout: 'auth',
  name: 'signup',
})

const nav = navigation

const open = ref<boolean>(false)
const src = 'hpl-logo-dark.png'
</script>

<template>
  <div class="h-full px-4 lg:px-2">
    <TransitionRoot :show="open" as="template">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  type="button"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <Icon
                    aria-hidden="true"
                    class="h-6 w-6"
                    name="heroicons:x-mark"
                  />
                </button>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <template v-for="page in nav" :key="page.id">
                  <div class="flow-root">
                    <NuxtLink
                      :to="page.href"
                      class="-m-2 block p-2 font-medium capitalize"
                      exact-active-class="dark:text-brand dark:hover:text-brand-600"
                      >{{ page.name }}
                    </NuxtLink>
                  </div>
                </template>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <NuxtLink
                    class="-m-2 block p-2 font-medium text-gray-900"
                    exact-active-class="text-brand hover:text-brand-600"
                    to="/signin"
                    >Sign in
                  </NuxtLink>
                </div>
                <div class="flow-root">
                  <NuxtLink
                    class="-m-2 block p-2 font-medium text-gray-900"
                    exact-active-class="text-brand hover:text-brand-600"
                    to="/signup"
                    >Create account
                  </NuxtLink>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <NuxtLink class="-m-2 flex items-center p-2">
                  <NuxtPicture
                    :img-attrs="{
                      class: 'flex-shrink-0 block w-5 h-auto',
                    }"
                    alt="Canada flag"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                  />
                  <span class="ml-3 block text-base font-medium text-brand-600"
                    >CAD</span
                  >
                  <span class="sr-only">, change currency</span>
                </NuxtLink>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <header class="relative bg-transparent">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-400 py-2">
          <div class="flex h-16 w-full justify-center lg:items-center">
            <button
              class="flex-shrink-0 rounded bg-transparent p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              type="button"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <Icon
                aria-hidden="true"
                class="h-6 w-6"
                name="heroicons:bars-3"
              />
            </button>

            <!-- Logo -->
            <div
              class="ml-2 flex w-full justify-center lg:ml-0 lg:w-auto lg:justify-start"
            >
              <NuxtLink class="self-center" to="/">
                <span class="sr-only">High Park Livery</span>
                <NuxtPicture
                  :img-attrs="{
                    class: 'h-12 w-auto lg:h-14',
                  }"
                  alt="High Park Livery Logo"
                  src="hpl-logo-dark.png"
                  width="1920"
                />
              </NuxtLink>
            </div>

            <div class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <template v-for="page in nav" :key="page.id">
                  <NuxtLink
                    :to="page.href"
                    class="flex items-center text-sm font-medium capitalize tracking-wider text-gray-900 hover:text-brand"
                    exact-active-class="text-brand hover:text-brand-600"
                    >{{ page.name }}
                  </NuxtLink>
                </template>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <NuxtLink
                  class="text-sm font-medium text-gray-900 hover:text-brand"
                  exact-active-class="text-brand hover:text-brand-600"
                  to="/signin"
                  >Sign in
                </NuxtLink>
                <span aria-hidden="true" class="h-6 w-px bg-gray-700" />
                <NuxtLink
                  class="text-sm font-medium text-gray-900 hover:text-brand"
                  exact-active-class="text-brand hover:text-brand-600"
                  to="/signup"
                  >Create account
                </NuxtLink>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a
                  class="flex items-center text-gray-500 hover:text-brand"
                  href="#"
                >
                  <NuxtPicture
                    :img-attrs="{
                      class: 'flex-shrink-0 block w-5 h-auto',
                    }"
                    alt="Canada Flag"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <MiniCart />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
