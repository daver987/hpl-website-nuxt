<template>
  <div class="relative bg-white">
    <div class="lg:absolute lg:inset-0">
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <NuxtPicture
          :img-attrs="{
            class:
              'h-56 w-full object-cover object-center lg:absolute lg:h-full',
          }"
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d0f63a6f-1d68-49fe-b643-224003dd5f00/4200"
          alt="Toronto skyline"
          width="4200"
        />
      </div>
    </div>
    <div
      class="relative px-6 py-16 sm:py-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-32"
    >
      <div class="lg:pr-8">
        <div class="max-w-md mx-auto sm:max-w-lg lg:mx-0">
          <h2 class="font-sans text-3xl font-bold tracking-tight sm:text-4xl">
            Let's work together
          </h2>
          <p class="mt-4 font-sans text-lg text-gray-500 sm:mt-3">
            We’d love to hear from you! Send us a message using the form
            opposite, or email us. We’ll get back to you as soon as possible.
          </p>
          <form
            action="#"
            method="POST"
            class="grid grid-cols-1 mt-9 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                  >Phone</label
                >
                <span id="phone-description" class="text-sm text-gray-500"
                  >Optional</span
                >
              </div>
              <div class="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autocomplete="tel"
                  aria-describedby="phone-description"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label
                  for="how-can-we-help"
                  class="block text-sm font-medium text-gray-700"
                  >How can we help you?</label
                >
                <span
                  id="how-can-we-help-description"
                  class="text-sm text-gray-500"
                  >Max. 500 characters</span
                >
              </div>
              <div class="mt-1">
                <textarea
                  id="how-can-we-help"
                  name="how-can-we-help"
                  aria-describedby="how-can-we-help-description"
                  rows="4"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="how-did-you-hear-about-us"
                class="block text-sm font-medium text-gray-700"
                >How did you hear about us?</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="how-did-you-hear-about-us"
                  id="how-did-you-hear-about-us"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                />
              </div>
            </div>
            <div class="text-right sm:col-span-2">
              <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
