<script lang="ts" setup>
const colorMode = useColorMode()
const color = colorMode.value
</script>

<template>
  <div class="w-full max-w-sm mx-auto lg:w-96">
    <div v-if="color === 'dark'">
      <NuxtLink to="/">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/406cb8bc-8a88-4aa9-912d-d73155765900/1920"
          alt="High Park Livery"
          :img-attrs="{ class: 'w-auto h-16' }"
          width="1920"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        Create account
      </h2>
    </div>

    <div v-if="color !== 'dark'">
      <NuxtLink to="/">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
          alt="High Park Livery"
          width="1920"
          :img-attrs="{
            class: 'w-auto h-16',
          }"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        Sign up for an account
      </h2>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <InputText
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
          />
          <InputText
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
          />
          <InputText
            type="email"
            label="Email"
            placeholder="Enter Email"
            name="email"
          />
          <InputText
            type="tel"
            label="Phone Number"
            placeholder="Enter Phone Number"
            name="phoneNumber"
          />
          <InputText
            type="password"
            label="Password"
            placeholder="Enter Password"
            name="password"
            autocomplete="new-password"
            required=""
          />
          <InputText
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirm-password"
            autocomplete="new-password"
            required=""
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded text-brand-600 focus:ring-brand"
              />
              <label
                for="remember-me"
                class="block ml-2 text-sm text-gray-900 dark:text-gray-200"
                >Remember me</label
              >
            </div>

            <div class="text-sm">
              <NuxtLink
                to="/signin"
                class="font-medium text-brand-600 hover:text-brand"
                >Back To Sign In</NuxtLink
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
