<template>
  <div>
    <section class="my-32 w-full">
      <div
        class="mx-auto mb-8 flex max-w-7xl flex-col-reverse md:grid md:grid-cols-10"
      >
        <div class="w-full md:col-span-6">
          <BaseCard class="w-full space-y-6">
            <h3 class="subheading">About The Vehicle</h3>
            <h2 class="heading text-center text-3xl md:text-left">
              Executive Sprinter Van
            </h2>
            <p class="max-w-[50ch] font-sans text-gray-500">
              The 11 Passenger Sprinter Van is a perfect vehicle for the large
              group looking to travel together. This van can accommodate up to
              eleven people with luggage. This makes it perfect for large
              groups, and corporate tours.
            </p>
          </BaseCard>
        </div>
        <div class="md:col-span-4 md:w-full">
          <NuxtPicture
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/263d0341-f195-4b04-fc88-aad794b34b00/1920"
            alt="11 Passenger Van"
            :img-attrs="{
              class:
                'object-cover object-center w-full max-w-2xl md:w-5xl md:-ml-40 md:-mt-32',
            }"
            width="1920"
          />
        </div>
      </div>
      <Luggage :peopleAmount="11" :luggageAmount="11" />
    </section>
    <section class="mb-16 w-full md:mb-32">
      <div class="flex flex-col md:grid md:grid-cols-10">
        <div class="w-full md:relative md:col-span-4">
          <NuxtPicture
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b36a1164-6e42-4224-432c-a1db5fb3f200/1920"
            alt="GMC Yukon XL"
            :img-attrs="{
              class:
                'object-cover object-center w-full md:w-5xl w-2xl md:right-0 md:bottom-[55%] md:left-0',
            }"
            width="1920"
          />
        </div>
        <div class="mb-8 md:col-span-6">
          <BaseCard class="container col-span-6 mb-8 space-y-6 md:pl-56">
            <h2 class="subheading">ABOUT THE VEHICLE</h2>
            <h2 class="heading text-center text-3xl md:text-left">
              Chevy Suburban
            </h2>
            <p class="max-w-[50ch] font-sans text-gray-500">
              The Chevy Suburban is a full-size SUV that seats up to six people
              comfortably. This vehicle can be used for airport transportation,
              weddings or any other destination requiring an upgrade from a
              sedan. This SUV is the workhorse of the limo industry. You can see
              it on highways, at airports and at all events where there is a
              need for upscale transportation.
            </p>
          </BaseCard>
          <Luggage :peopleAmount="6" :luggageAmount="6" />
        </div>
      </div>
    </section>
    <section class="mb-16 w-full md:mb-24">
      <div class="flex flex-col-reverse md:grid md:grid-cols-10">
        <div class="mb-8 md:col-span-6">
          <BaseCard class="container space-y-6 md:col-span-6">
            <h2 class="subheading">ABOUT THE VEHICLE</h2>
            <h3 class="heading text-center text-3xl md:text-left">YUKON XL</h3>
            <p class="max-w-[50ch] font-sans text-gray-500">
              The GMC Yukon XL is a full-size SUV that seats up to eight people
              comfortably. This vehicle can be used for airport transportation,
              weddings or any other destination requiring an upgrade from a
              sedan. This SUV, like the Suburban, is a workhorse of the limo
              industry. You can see it on highways, at airports and at all
              events where there is a need for upscale transportation.
            </p>
          </BaseCard>
        </div>
        <div class="w-full md:relative md:col-span-4">
          <NuxtPicture
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/079c0cd1-e495-483c-1dbe-5ccc6fd47a00/1920"
            alt="GMC Yukon XL"
            :img-attrs="{
              class:
                'object-cover object-center w-full md:max-w-3xl md:right-0 md:-bottom-12 md:absolute',
            }"
            width="1920"
          />
        </div>
      </div>
      <Luggage :peopleAmount="6" :luggageAmount="6" />
    </section>
  </div>
</template>
