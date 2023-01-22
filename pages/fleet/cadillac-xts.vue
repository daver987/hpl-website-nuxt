<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div><h2 class="text-center heading pt-8">Cadillac XTS Sedan</h2></div>
      <div>
        <img
          src='/images/Cadillac-XTS-Car-Service.png'
          alt="XTS"
          width="1242"
          height="543"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          If you're looking for a legend to take care of you regardless of
          whether your destination is Toronto or Montreal, the Cadillac XTS is
          it. Its sophisticated and sleek design comes with features that make
          you feel like royalty on wheels—from power seats with memory positions
          to genuine rosewood accents. With an infinite list of amenities
          (including in-car WiFi), there's no guessing what comfort features
          await inside this car for celebrities, business people, or travellers.
        </p>
      </BaseCard>
      <div>
        <img
          src='/images/cadillac-xts-interior-fleet.jpg'
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="828"
          height="591"
        />
      </div>
    </div>
    <div
      class="mb-12 auto-cols-auto grid grid-cols-1 place-items-center md:gap-4 md:grid-cols-12"
    >
      <div class="mb-6 col-span-2 md:mb-0 md:col-span-4">
        <img
          src='/images/cadillac-xts-interior-fleet-3.jpg'
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="536"
          height="619"
        />
      </div>
      <div class="col-span-6">
        <img
          src='/images/cadillac-xts-interior-fleet-2.jpg'
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="828"
          height="619"
        />
      </div>
    </div>
    <div class="flex flex-col w-full md:flex-row md:justify-end">
      <Luggage
        :peopleAmount="3"
        :luggageAmount="3"
        class="mb-12 z-100 relative md:-mt-48 md:mb-16"
      />
    </div>
  </div>
</template>
