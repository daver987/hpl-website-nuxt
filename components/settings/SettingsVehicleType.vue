<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/20/solid'

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
})
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-screen max-w-md pointer-events-auto">
                <form
                  class="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
                >
                  <div class="flex-1 h-0 overflow-y-auto">
                    <div class="px-4 py-6 bg-brand-700 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white"
                          >New Vehicle Type</DialogTitle
                        >
                        <div class="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            class="rounded-md bg-brand-700 text-brand-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-brand-300">
                          Get started by filling in the information below to
                          create your new Vehicle Type.
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-col justify-between flex-1">
                      <div class="px-4 divide-y divide-gray-200 sm:px-6">
                        <div class="pt-6 pb-5 space-y-6">
                          <div>
                            <label
                              for="project-name"
                              class="block text-sm font-medium text-gray-900"
                              >Vehicle Type</label
                            >
                            <div class="mt-1">
                              <input
                                type="text"
                                name="project-name"
                                id="project-name"
                                class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                              >Description</label
                            >
                            <div class="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows="4"
                                class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <h3 class="text-sm font-medium text-gray-900">
                              Team Members
                            </h3>
                            <div class="mt-2">
                              <div class="flex space-x-2">
                                <a
                                  v-for="person in team"
                                  :key="person.email"
                                  :href="person.href"
                                  class="rounded-full hover:opacity-75"
                                >
                                  <img
                                    class="inline-block w-8 h-8 rounded-full"
                                    :src="person.imageUrl"
                                    :alt="person.name"
                                  />
                                </a>
                                <button
                                  type="button"
                                  class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-400 bg-white border-2 border-gray-200 border-dashed rounded-full hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                                >
                                  <span class="sr-only">Add team member</span>
                                  <PlusIcon
                                    class="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <fieldset>
                            <legend class="text-sm font-medium text-gray-900">
                              Privacy
                            </legend>
                            <div class="mt-2 space-y-5">
                              <div class="relative flex items-start">
                                <div class="absolute flex items-center h-5">
                                  <input
                                    id="privacy-public"
                                    name="privacy"
                                    aria-describedby="privacy-public-description"
                                    type="radio"
                                    class="w-4 h-4 border-gray-300 text-brand-600 focus:ring-brand"
                                    checked=""
                                  />
                                </div>
                                <div class="text-sm pl-7">
                                  <label
                                    for="privacy-public"
                                    class="font-medium text-gray-900"
                                    >Public access</label
                                  >
                                  <p
                                    id="privacy-public-description"
                                    class="text-gray-500"
                                  >
                                    Everyone with the link will see this
                                    project.
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div class="relative flex items-start">
                                  <div class="absolute flex items-center h-5">
                                    <input
                                      id="privacy-private-to-project"
                                      name="privacy"
                                      aria-describedby="privacy-private-to-project-description"
                                      type="radio"
                                      class="w-4 h-4 border-gray-300 text-brand-600 focus:ring-brand"
                                    />
                                  </div>
                                  <div class="text-sm pl-7">
                                    <label
                                      for="privacy-private-to-project"
                                      class="font-medium text-gray-900"
                                      >Private to project members</label
                                    >
                                    <p
                                      id="privacy-private-to-project-description"
                                      class="text-gray-500"
                                    >
                                      Only members of this project would be able
                                      to access.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div class="relative flex items-start">
                                  <div class="absolute flex items-center h-5">
                                    <input
                                      id="privacy-private"
                                      name="privacy"
                                      aria-describedby="privacy-private-to-project-description"
                                      type="radio"
                                      class="w-4 h-4 border-gray-300 text-brand-600 focus:ring-brand"
                                    />
                                  </div>
                                  <div class="text-sm pl-7">
                                    <label
                                      for="privacy-private"
                                      class="font-medium text-gray-900"
                                      >Private to you</label
                                    >
                                    <p
                                      id="privacy-private-description"
                                      class="text-gray-500"
                                    >
                                      You are the only one able to access this
                                      project.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div class="pt-4 pb-6">
                          <div class="flex text-sm">
                            <a
                              href="#"
                              class="inline-flex items-center font-medium group text-brand-600 hover:text-brand-900"
                            >
                              <LinkIcon
                                class="w-5 h-5 text-brand group-hover:text-brand-900"
                                aria-hidden="true"
                              />
                              <span class="ml-2">Copy link</span>
                            </a>
                          </div>
                          <div class="flex mt-4 text-sm">
                            <a
                              href="#"
                              class="inline-flex items-center text-gray-500 group hover:text-gray-900"
                            >
                              <QuestionMarkCircleIcon
                                class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span class="ml-2">Learn more about sharing</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end flex-shrink-0 px-4 py-4">
                    <button
                      type="button"
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      @click="open = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
