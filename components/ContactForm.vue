<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod'
import { useForm, ErrorMessage, Field } from 'vee-validate'
import { z } from 'zod'

const schema = toFormValidator(
  z.object({
    first_name: z.string(),
    last_name: z.string(),
    email_address: z.string().email(),
    phone_number: z.string(),
    subject: z.string(),
    message: z.string(),
  })
)

type ValidationSchema = z.infer<typeof schema>

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
})

const isShown = ref(false)
const loading = ref(false)
const onSubmit = handleSubmit(async (values: ValidationSchema) => {
  try {
    loading.value = true
    const { data } = await useFetch('/api/post-contact', {
      method: 'POST',
      body: values,
    })
    console.log('Contact Form Data:', data.value)
    setTimeout(() => {
      isShown.value = true
      loading.value = false
      resetForm()
    }, 1500)
    setTimeout(() => {
      isShown.value = false
    }, 7500)
    return
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div>
    <main class="overflow-hidden">
      <section class="relative" aria-labelledby="contact-heading">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="relative bg-white shadow-xl">
            <h2 id="contact-heading" class="sr-only">Contact us</h2>

            <div class="grid grid-cols-1 lg:grid-cols-3">
              <!-- Contact information -->
              <div
                class="relative overflow-hidden bg-gradient-to-b from-brand to-brand-600 py-10 px-6 sm:px-10 xl:p-12"
              >
                <!-- Decorative angle backgrounds -->
                <div
                  class="pointer-events-none absolute inset-0 sm:hidden"
                  aria-hidden="true"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    width="343"
                    height="388"
                    viewBox="0 0 343 388"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                      fill="url(#linear1)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear1"
                        x1="254.553"
                        y1="107.554"
                        x2="961.66"
                        y2="814.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#fff" offset="" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                  aria-hidden="true"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    width="359"
                    height="339"
                    viewBox="0 0 359 339"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                      fill="url(#linear2)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear2"
                        x1="192.553"
                        y1="28.553"
                        x2="899.66"
                        y2="735.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#fff" offset="" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                  aria-hidden="true"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    width="160"
                    height="678"
                    viewBox="0 0 160 678"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                      fill="url(#linear3)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear3"
                        x1="192.553"
                        y1="325.553"
                        x2="899.66"
                        y2="1032.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#fff" offset="" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-white">Get In Touch</h3>
                <p class="mt-6 max-w-3xl text-base text-brand-50">
                  At High Park Livery, we strive to make your travel experience
                  as elegant and effortless as possible. Contact us today.
                </p>
                <dl class="mt-8 space-y-6">
                  <dt><span class="sr-only">Phone number</span></dt>
                  <dd class="flex text-base text-brand-50">
                    <icon
                      name="heroicons:phone"
                      class="h-6 w-6 flex-shrink-0 text-brand-200"
                      aria-hidden="true"
                    />
                    <span class="ml-3">+1 (647) 360-9631</span>
                  </dd>
                  <dt><span class="sr-only">Email</span></dt>
                  <dd class="flex text-base text-brand-50">
                    <Icon
                      name="heroicons:envelope"
                      class="h-6 w-6 flex-shrink-0 text-brand-200"
                      aria-hidden="true"
                    />
                    <span class="ml-3">info@highparklivery.com</span>
                  </dd>
                </dl>
                <ul role="list" class="mt-8 flex space-x-12">
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">Facebook</span>
                      <svg
                        class="h-7 w-7"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">GitHub</span>
                      <svg
                        class="h-7 w-7"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">Twitter</span>
                      <svg
                        class="h-7 w-7"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Contact form -->
              <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 class="text-warm-gray-900 text-lg font-medium">
                  Send us a message
                </h3>
                <form
                  @submit="onSubmit"
                  class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <InputTextContact
                      type="text"
                      name="first_name"
                      label="First name"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      type="text"
                      name="last_name"
                      label="Last name"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      type="email"
                      name="email_address"
                      label="Email"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      autocomplete="tel"
                      type="tel"
                      name="phone_number"
                      label="Phone Number"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <InputTextContact
                      type="text"
                      name="subject"
                      label="Subject"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <div class="flex justify-between">
                      <label
                        for="message"
                        class="block text-sm font-medium text-gray-700"
                        >Message</label
                      >
                      <span id="message-max" class="text-warm-gray-500 text-sm"
                        >Max. 500 characters</span
                      >
                    </div>
                    <div class="mt-1">
                      <Field name="message" v-slot="{ field, errorMessage }">
                        <textarea
                          v-bind="field"
                          id="message"
                          name="message"
                          rows="4"
                          class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-brand focus:ring-brand"
                          aria-describedby="message-max"
                        />
                        <ErrorMessage name="message" />
                      </Field>
                    </div>
                  </div>
                  <div class="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      class="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-6 py-2 text-base font-medium uppercase tracking-wider text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto"
                    >
                      {{ loading ? 'Submitting....' : 'Submit' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Notification
      message1="Your Message has been submitted"
      message2="Someone from our team will get back to you shortly"
      :show="isShown"
    />
  </div>
</template>
