<template>
  <div>
    <section class="w-full my-32">
      <div
        class="container flex flex-col-reverse mx-auto mb-8 max-w-7xl md:grid md:grid-cols-10"
      >
        <div class="w-full md:col-span-6">
          <BaseCard class="w-full space-y-6">
            <h3 class="subheading">About The Vehicle</h3>
            <h2 class="text-3xl text-center heading md:text-left">
              Executive Passenger Van
            </h2>
            <p class="max-w-[50ch]">
              The 12 Passenger Transit Van is a perfect vehicle for the large
              group looking to travel together. This van can accommodate up to
              twelve people and has some storage capability. This makes it
              perfect for large groups, and corporate tours.
            </p>
          </BaseCard>
        </div>
        <div
          class="invisible md:max-w-full md:w-full md:col-span-4 md:visible md:relative"
        ></div>
        <img
          src='/images/12-Passenger-Van-Car-Service.png'
          alt="12 Passenger Van"
          class="h-full object-cover object-center w-full max-w-2xl md:max-w-3xl md:top-[8%] md:right-0 md:-bottom-12 md:absolute"
          width="1049"
          height="696"
        />
      </div>
      <Luggage :peopleAmount="12" :luggageAmount="12" />
    </section>
    <section class="w-full mb-32">
      <div class="flex flex-col md:grid md:grid-cols-10">
        <div class="w-full md:col-span-4 md:relative">
          <img
            src='/images/Chevy-Suburban-Car-Service.png'
            alt="GMC Yukon XL"
            class="object-cover object-center w-fullmd:max-w-2xl md:right-0 md:bottom-[55%] md:left-0 md:absolute"
            width="1079"
            height="570"
          />
        </div>
        <div class="mb-8 md:col-span-6">
          <BaseCard
            class="container col-span-6 mx-auto mb-8 space-y-6 md:pl-56"
          >
            <h2 class="subheading">ABOUT THE VEHICLE</h2>
            <h2 class="text-3xl text-center heading md:text-left">Chevy Suburban</h2>
            <p class="max-w-[50ch]">
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
    <section class="w-full mb-24">
      <div class="flex flex-col-reverse md:grid md:grid-cols-10">
        <div class="mb-8 md:col-span-6">
          <BaseCard class="container mx-auto space-y-6 md:col-span-6">
            <h2 class="subheading">ABOUT THE VEHICLE</h2>
            <h3 class="text-3xl text-center heading md:text-left">YUKON XL</h3>
            <p class="max-w-[55ch]">
              The GMC Yukon XL is a full-size SUV that seats up to eight people
              comfortably. This vehicle can be used for airport transportation,
              weddings or any other destination requiring an upgrade from a
              sedan. This SUV, like the Suburban, is a workhorse of the limo
              industry. You can see it on highways, at airports and at all
              events where there is a need for upscale transportation.
            </p>
          </BaseCard>
        </div>
        <div class="w-full md:col-span-4 md:relative">
          <img
            src='/images/Yukon-XL-Car-Service.png'
            alt="GMC Yukon XL"
            class="object-cover object-center w-full md:max-w-3xl md:right-0 md:-bottom-12 md:absolute"
          />
        </div>
      </div>
      <Luggage :peopleAmount="6" :luggageAmount="6" />
    </section>
  </div>
</template>
