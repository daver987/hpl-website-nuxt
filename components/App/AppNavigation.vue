<script setup lang="ts">
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline'
import { navigation, NavigationItem } from '~/data/navigation'

const quoteStore = useQuoteStore()
const { isRoundTrip } = storeToRefs(quoteStore)

const nav = navigation as NavigationItem[]

const open = ref<boolean>(false)
</script>

<template>
  <TransitionRoot as="template" :show="open">
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
            class="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl"
          >
            <div class="flex px-4 pt-5 pb-2">
              <button
                type="button"
                class="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIconOutline class="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div class="px-4 py-6 space-y-6 border-t border-gray-200">
              <div v-for="page in nav" :key="page.id" class="flow-root">
                <NuxtLink
                  active-class="text-brand hover:text-brand-600"
                  :to="page.href"
                  class="block p-2 -m-2 font-medium text-gray-900 capitalize"
                  >{{ page.name }}</NuxtLink
                >
              </div>
            </div>

            <div class="px-4 py-6 space-y-6 border-t border-gray-200">
              <div class="flow-root">
                <NuxtLink
                  to="/signin"
                  class="block p-2 -m-2 font-medium text-gray-900"
                  >Sign in</NuxtLink
                >
              </div>
              <div class="flow-root">
                <NuxtLink
                  to="/signup"
                  class="block p-2 -m-2 font-medium text-gray-900"
                  >Create account</NuxtLink
                >
              </div>
            </div>

            <div class="px-4 py-6 border-t border-gray-200">
              <NuxtLink href="#" class="flex items-center p-2 -m-2">
                <NuxtPicture
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt="Canada flag"
                  :img-attrs="{
                    class: 'flex-shrink-0 block w-5 h-auto',
                  }"
                />
                <span class="block ml-3 text-base font-medium text-brand-600"
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
    <p
      v-if="false"
      class="flex items-center justify-center h-8 px-4 mx-auto text-sm font-medium text-gray-900 max-w-7xl bg-brand lg:px-6"
    >
      Get free delivery on orders over $100
    </p>
    <nav aria-label="Top" class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="py-2 border-b border-gray-200/30">
        <div class="flex justify-center w-full h-16 lg:items-center">
          <button
            type="button"
            class="flex-shrink-0 p-2 text-gray-400 bg-transparent rounded hover:text-gray-500 lg:hidden"
            @click="open = true"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="w-6 h-6" aria-hidden="true" />
          </button>

          <!-- Logo -->
          <div
            class="flex justify-center w-full ml-2 lg:w-auto lg:justify-start lg:ml-0"
          >
            <NuxtLink to="/" class="self-center">
              <span class="sr-only">High Park Livery</span>
              <NuxtPicture
                :img-attrs="{
                  class: 'w-auto h-12 lg:h-14',
                }"
                src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c6c7415a-d52d-46fa-a85e-1ba5153b2000/1920"
                alt="High Park Livery Logo"
                width="1920"
              />
            </NuxtLink>
          </div>

          <!-- Flyout menus -->
          <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
            <div class="flex h-full space-x-8">
              <Popover
                v-for="category in navigation.categories"
                :key="category.name"
                class="flex"
                v-slot="{ open }"
              >
                <div class="relative flex">
                  <PopoverButton
                    :class="[
                      open
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-gray-100 hover:text-brand',
                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                    ]"
                  >
                    {{ category.name }}
                  </PopoverButton>
                </div>

                <transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <PopoverPanel
                    class="absolute inset-x-0 z-10 text-sm text-gray-500 top-full"
                  >
                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                    <div
                      class="absolute inset-0 bg-white shadow top-1/2"
                      aria-hidden="true"
                    />

                    <div class="relative bg-white">
                      <div class="px-8 mx-auto max-w-7xl">
                        <div class="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                          <div
                            class="grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8"
                          >
                            <div
                              v-for="section in category.sections"
                              :key="section.name"
                            >
                              <p
                                :id="`${section.name}-heading`"
                                class="font-medium text-gray-100 hover:text-brand"
                              >
                                {{ section.name }}
                              </p>
                              <ul
                                role="list"
                                :aria-labelledby="`${section.name}-heading`"
                                class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                <li
                                  v-for="item in section.items"
                                  :key="item.name"
                                  class="flex"
                                >
                                  <NuxtLink
                                    :to="item.href"
                                    class="hover:text-gray-800"
                                    exact-active-class="text-brand hover:text-brand-600"
                                    >{{ item.name }}</NuxtLink
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
              <template v-for="page in nav" :key="page.id">
                <NuxtLink
                  :to="page.href"
                  class="flex items-center text-sm font-medium tracking-wider text-gray-100 capitalize hover:text-brand"
                  exact-active-class="text-brand hover:text-brand-600"
                  >{{ page.name }}</NuxtLink
                >
              </template>
            </div>
          </PopoverGroup>

          <div class="flex items-center ml-auto">
            <div
              class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
            >
              <NuxtLink
                to="/signin"
                class="text-sm font-medium text-gray-100 hover:text-brand"
                >Sign in</NuxtLink
              >
              <span class="w-px h-6 bg-gray-200" aria-hidden="true" />
              <NuxtLink
                to="/signup"
                class="text-sm font-medium text-gray-100 hover:text-brand"
                >Create account</NuxtLink
              >
            </div>

            <div class="hidden lg:ml-8 lg:flex">
              <a
                href="#"
                class="flex items-center text-gray-100 hover:text-brand"
              >
                <NuxtPicture
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt="Canada Flag"
                  :img-attrs="{
                    class: 'flex-shrink-0 block w-5 h-auto',
                  }"
                />
                <span class="block ml-3 text-sm font-medium">CAD</span>
                <span class="sr-only">, change currency</span>
              </a>
            </div>

            <!-- Search -->
            <div v-if="false" class="flex lg:ml-6">
              <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Search</span>
                <MagnifyingGlassIcon class="w-6 h-6" aria-hidden="true" />
              </a>
            </div>

            <!-- Cart -->
            <div class="flow-root ml-4 lg:ml-6">
              <MiniCart />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
