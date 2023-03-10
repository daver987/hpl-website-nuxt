<script setup lang="ts">
import { servicesHome } from '~/data/servicesHome'
import { features } from '~/data/features'
definePageMeta({
  name: 'Home',
  layout: 'default',
})
</script>

<script lang="ts">
export default {
  computed: {
    fleetImage(): any {
      const imgUrl = this.$img(
        'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d10059a-b5c4-44cc-ef3f-6ef867396000/1920',
        { width: 100, loading: 'lazy' }
      )
      return { backgroundImage: `url('${imgUrl}')` }
    },
  },
}
</script>

<template>
  <div>
    <div
      class="relative min-h-screen overflow-hidden"
      style="
        background-image: url('https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c2f2c5f0-7a8d-4617-e4aa-d81156a40600/4200');
      "
    >
      <AppNavigation />
      <div class="relative">
        <div class="mt-16 sm:mt-24">
          <div class="mx-auto max-w-7xl">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
              <div
                class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left"
              >
                <div class="align-center lg:align-start flex flex-col">
                  <h1
                    class="mb-2 text-center font-heading text-3xl capitalize text-white sm:text-4xl md:text-left md:text-5xl"
                  >
                    Experience Toronto's Finest Car Service
                  </h1>
                  <p class="subheading text-center md:text-left">
                    High Park Livery
                  </p>
                  <NuxtPicture
                    :img-attrs="{
                      class:
                        'self-center object-cover object-center max-w-sm mt-8 md:max-w-lg md:self-start',
                    }"
                    alt="Lincoln Continental"
                    src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/58d16f60-282e-4e29-1805-ebfee9794f00/1920"
                    width="1920"
                  />
                </div>
              </div>
              <div class="mt-16 px-3 pb-8 sm:mt-24 lg:col-span-6 lg:mt-0">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main>
      <BaseSection>
        <BaseContainer
          class="grid grid-cols-1 gap-3 @container md:grid-cols-2 lg:max-w-7xl lg:grid-cols-4"
        >
          <IconBlockServices
            v-for="feature in features"
            :key="feature.title"
            :altText="feature.altText"
            :body="feature.body"
            :image="feature.image"
            :title="feature.title"
          />
        </BaseContainer>
      </BaseSection>
      <BaseSection
        class="bg-fit bg-center bg-no-repeat pt-10"
        :style="fleetImage"
      >
        <BaseContainer
          class="flex flex-col place-items-center justify-between lg:flex-row"
        >
          <div class="mb-4 space-y-4">
            <p class="subheading text-center lg:text-left">
              The Many Types of Comfort We offer
            </p>
            <h2 class="heading text-center capitalize text-white lg:text-left">
              Our Fleet
            </h2>
          </div>
          <div>
            <BaseButton
              kind="btn-light"
              label="View All"
              to="/fleet"
              nuxt-link
            />
          </div>
        </BaseContainer>
      </BaseSection>
      <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
        <BaseContainer
          class="-mt-6 grid grid-cols-6 gap-6 bg-white shadow-xl md:grid-cols-12"
        >
          <div class="col-span-6 p-6 md:col-span-7">
            <p class="font-sans text-sm text-gray-500">
              <span class="font-sans text-gray-500">
                Experience luxury and reliability with
                <span class="font-body text-sm font-bold uppercase text-brand"
                  >High Park Livery's</span
                >
                Toronto car service. For over a decade, we have consistently
                maintained a fleet of top-of-the-line vehicles to meet the
                demands of the Toronto GTA market. Our clients can expect only
                the best in chauffeur service with our selection of premium
                cars, including the Cadillac XTS, Lincoln Navigator SUV,
                Cadillac Escalade SUV, and Lincoln Continental. <br /><br />Our
                highly trained drivers provide exceptional service for even the
                most discerning clientele. As a full-service transportation
                company,
                <strong class="text-brand"
                  >we have a variety of vehicles to meet any transportation
                  need, including specialty 6+ person vehicles for larger tour
                  groups.</strong
                >
                Contact us to explore the various options available from our
                limo service.
              </span>
            </p>
          </div>
          <div
            class="col-span-2 flex w-full place-items-center justify-center p-6"
          >
            <NuxtPicture
              class="w-96 self-center"
              src="/icons/24-hours.svg"
              alt="24 hours icon"
            />
          </div>
        </BaseContainer>
      </BaseSection>
      <BaseSection>
        <BaseContainer
          class="mx-auto mb-8 flex max-w-4xl flex-col md:mb-4 md:grid md:flex-none md:grid-cols-2 md:grid-rows-1 md:items-stretch lg:max-w-7xl"
        >
          <IconBlockFleet
            heading="Cadillac XTS"
            class="order-1 md:order-first md:col-span-1 md:col-start-1 md:w-full md:self-center"
          />
          <IconBlockFleetImage
            altText="XTS Interior"
            image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f0204aa2-4cb2-4204-10e5-5c3bed0d3500/1920"
            class="md:col-span-1 md:col-start-2"
          />
        </BaseContainer>
        <BaseContainer
          class="mx-auto flex max-w-4xl flex-col items-stretch gap-x-2 md:grid md:flex-none md:grid-cols-2 lg:max-w-7xl"
        >
          <IconBlockFleet
            class="order-2 mb-8 w-full md:col-span-1 md:col-start-1 md:row-start-2 md:mb-4 md:max-w-[80%] md:justify-self-end"
            heading="Cadillac Escalade"
          />
          <IconBlockFleetImage
            altText="Escalade Interior"
            class="order-1 md:col-span-1 md:col-start-1 md:row-start-1 md:row-end-2 md:mb-0 md:self-end"
            image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/180e12f4-a0c1-4c70-b5af-5f05bbfa4700/1920"
          />
          <IconBlockFleet
            class="order-4 w-full md:order-first md:max-w-[80%] md:place-self-end md:justify-self-end md:pb-8"
            heading="Lincoln Continental"
          />
          <IconBlockFleetImage
            altText="Continental Interior"
            class="order-3 md:col-start-2 md:row-start-2 md:-mt-8"
            image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/7968b80b-ad94-4501-02ca-43e552c67100/1920"
          />
        </BaseContainer>
      </BaseSection>
      <BaseSection class="pb-0">
        <NuxtPicture
          alt="Toronto Skyline"
          :img-attrs="{
            class: 'object-cover object-center lg:mx-auto lg:max-w-6xl',
          }"
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d7e1f6bc-c349-4e62-48c4-642bbfcb3c00/1920"
          width="1920"
          loading="lazy"
        />
      </BaseSection>
      <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
        <BaseContainer class="-mt-16 bg-white pt-32 pb-16">
          <p class="subheading text-center">WHAT High Park Livery OFFERS YOU</p>
          <h2 class="heading mt-4 text-center">We Offer</h2>
        </BaseContainer>
        <div
          class="mx-auto -mt-8 grid max-w-7xl grid-cols-1 gap-4 bg-white p-6 shadow-xl @container lg:grid-cols-2"
        >
          <IconBlockAbout
            v-for="service in servicesHome"
            :key="service.title"
            :alt-text="service.altText"
            :body="service.body"
            :image="service.image"
            :title="service.title"
            class="shadow-none"
          />
        </div>
      </BaseSection>
      <BaseSection>
        <BaseContainer class="space-y-8">
          <p class="subheading text-center">High Park Livery PARTNERS</p>
          <h2 class="heading text-center">They Trust Us</h2>
        </BaseContainer>
        <TheLogoCloud />
      </BaseSection>
    </main>
    <AppFooter />
  </div>
</template>
