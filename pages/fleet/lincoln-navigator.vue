<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div><h2 class="text-center heading pt-8">Lincoln Navigator SUV</h2></div>
      <div>
        <img
          src='/images/Lincoln-Navigator-Car-Service.png'
          alt="Lincoln Navigator"
          class="object-cover object-center w-full"
          width="1048"
          height="696"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          The Lincoln Navigator is one of the best vehicles to use for your
          night on the town. It comfortably fits six people, has plenty of
          amenities, and delivers luxury. The three-tonne colossus can easily
          fit through most Toronto streets while being sure to arrive in style
          with its surround sound stereo system, leather seats, seat warmers and
          more. With so many features that come standard you can't go wrong
          using this vehicle for your big night out.
        </p>
      </BaseCard>
      <div>
        <img
          src='/images/lincoln-navigator-interior-fleet-2.jpg'
          alt="Lincoln Navigator"
          class="object-cover object-center w-full"
          width="828"
          height="591"
        />
      </div>
    </div>
    <div
      class="mb-12 auto-cols-auto grid grid-cols-1 place-items-center md:gap-4 md:grid-cols-12"
    >
      <div class="mb-6 col-span-1 md:mb-0 md:col-span-4">
        <img
          src='/images/lincoln-navigator-interior-fleet-3.jpg'
          alt="Lincoln Navigator"
          class="h-full object-cover object-center w-full"
          width="536"
          height="619"
        />
      </div>
      <div class="col-span-6">
        <img
          src='/images/lincoln-navigator-interior-fleet.jpg'
          alt="Lincoln Navigator"
          class="h-full object-cover object-center w-full"
          width="828"
          height="619"
        />
      </div>
    </div>
    <div class="flex flex-row w-full justify-end">
      <Luggage
        :peopleAmount="3"
        :luggageAmount="3"
        class="mb-12 z-100 relative md:-mt-48 md:mb-16"
      />
    </div>
  </div>
</template>
