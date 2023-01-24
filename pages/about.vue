<script setup lang="ts">
import { qualities } from '~/data/qualities'
useHead({
  title: 'High Park Livery | About Us',
})
const headerInfo = {
  aboveHeading: 'DISCOVER High Park Livery',
  heading: 'ABOUT US',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/33276e69-8f27-493e-57ee-7e63d9819700/1920")',
}

const quality = qualities
definePageMeta({
  title: 'About Us',
  layout: 'default',
})
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <BaseSection class="md:-mt-16">
      <BaseContainer class="md:grid md:grid-cols-2">
        <div class="relative py-6 -mt-8 overflow-hidden bg-white shadow-xl">
          <div class="py-5">
            <p class="text-center subheading">Behind The Wheel</p>
            <h2 class="mt-6 text-center heading">The Driver</h2>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <p class="font-sans text-gray-500 text-sm">
              Our team of chauffeurs is some of the most experienced in the
              industry. All of our professional chauffeurs are safe, courteous,
              and fully certified drivers by the city of Toronto. We ensure that
              our clients arrive at their destination on time and always provide
              a safe and comfortable ride.<br />Your chauffeur is just a phone
              call away! High Park Livery will get you to your destination on
              time and in style. When you require something exceptional, don't
              hesitate to contact us or get an online quote for rates and
              availability.
            </p>
          </div>
          <div class="flex justify-center px-4 py-4 sm:px-6">
            <BaseButton
              kind="btn-primary"
              class="self-center"
              label="Reserve Now"
              to="/reservations"
              :nuxtLink="true"
            />
          </div>
        </div>
        <div class="md:self-center">
          <NuxtPicture
            :img-attrs="{
              class:
                'object-center object-cover h-64 w-full md:object-left md:min-h-[18rem]',
            }"
            alt="Chauffeur Service"
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/81877055-3d82-4ba5-cef9-ba7f0148dc00/1920"
            width="1920"
            loading="lazy"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="md:grid md:grid-cols-2 place-items-center">
        <NuxtPicture
          alt="Tesla-S-Back-Seat"
          :img-attrs="{
            class:
              'object-center object-cover w-full min-h-[18rem] self-center md:object-left',
          }"
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f56d5571-1af0-4986-7db7-bd29dc818200/4200"
          width="1920"
          loading="lazy"
        />
        <div class="bg-white shadow-xl">
          <IconBlockAbout
            v-for="qualities in quality"
            :key="qualities.title"
            :altText="qualities.altText"
            :body="qualities.body"
            :image="qualities.image"
            :title="qualities.title"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <NuxtPicture
        alt="Toronto-evening-skyline"
        :img-attrs="{
          class: 'object-cover object-center w-full min-h-[16rem]',
        }"
        src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d0f63a6f-1d68-49fe-b643-224003dd5f00/4200"
        width="4200"
        loading="lazy"
      />
      <BaseContainer class="bg-white shadow-xl">
        <div class="py-6 overflow-hidden bg-white md:px-2 lg:px-4">
          <div class="px-4 py-5 sm:px-6">
            <p class="text-center uppercase subheading md:text-left">
              High Park Livery?
            </p>
            <h2 class="mt-6 text-center text-heading heading md:text-left">
              WHO WE ARE
            </h2>
          </div>
          <div class="px-3 py-4 sm:p-6">
            <p class="font-sans text-gray-500 text-sm">
              High Park Livery is a Toronto-based car service company. We
              provide luxury transportation to clients in the Greater Toronto
              and southern Ontario area. In addition to offering a variety of
              car models and levels of service. Luxury Ride Service caters to
              corporate and non-corporate clients with highly personalized
              services that aim to exceed all expectations.
            </p>
            <p class="font-sans text-gray-500 text-sm">
              When you choose to work with High Park Livery, you'll work with
              highly trained professionals who know about the industry. We are
              committed to customer satisfaction and punctuality in all that we
              do. We offer suggestions on routes as well as excellent amenities
              like refreshments and WiFi while en route. We aim to create an
              atmosphere that ensures passengers feel comfortable and relaxed
              throughout their journey.
            </p>
            <p class="font-sans text-gray-500 text-sm">
              At High Park Livery, we don't cut corners or skimp on your comfort
              to offer you a low price. We believe that all of our luxury cars
              should be maintained to the highest industry standards, ensuring a
              safe and unforgettable experience.
            </p>
            <p class="font-sans text-gray-500 text-sm">
              Whether it's a night out on the town or a business meeting across
              downtown Toronto, High Park Livery can provide a luxurious ride
              that fits perfectly within your schedule and budget.
            </p>
          </div>
          <div class="px-4 py-4 sm:px-6">
            <BaseButton
              kind="btn-primary"
              label="Contact Us"
              to="/contact"
              :nuxtLink="true"
            />
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
    <AppFooter />
  </div>
</template>
