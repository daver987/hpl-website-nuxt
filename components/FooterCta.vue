<template>
  <div
    class="container relative z-10 mx-auto -mb-28 flex max-w-7xl flex-col space-y-4 bg-background-light px-8 py-10 shadow-xl lg:-mb-12 lg:flex-row lg:justify-between lg:space-y-0"
  >
    <div class="lg:self-center">
      <h2 class="heading text-center lg:text-4xl">
        interested in our services?
      </h2>
    </div>
    <div class="self-center">
      <BaseButton
        kind="btn-dark"
        label="Reserve Now"
        to="/reservations"
        :nuxt-link="true"
      />
    </div>
  </div>
</template>
