<script setup lang="ts">
interface Props {
  kind?: string
  label?: string
  to?: string
  href?: string
  link?: boolean
  nuxtLink?: boolean
  button?: boolean
}
const props = defineProps<Props>()

const btnType = computed(() => {
  if (props.link) {
    return true
  } else if (props.nuxtLink) {
    return true
  } else return true
})
const btnStyle = computed(() => {
  if (props.kind === 'btn-light') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-white text-white text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-brand hover:text-brand hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20 focus:border-brand focus:ring focus:ring-brand',
    ]
  }
  if (props.kind === 'btn-brand') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-brand text-brand text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-brand hover:text-brand hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20 focus:border-brand focus:ring focus:ring-brand',
    ]
  }

  if (props.kind === 'btn-dark') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-background-dark text-background-dark text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-brand hover:text-brand hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20 focus:border-brand focus:ring focus:ring-brand',
    ]
  }
  if (props.kind === 'btn-flat') {
    return [
      'inline-flex items-center cursor-pointer border-0 text-brand font-sans text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-brand hover:text-brand hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand active:bg-brand/20 active:outline-none',
    ]
  }
  if (props.kind === 'btn-solid') {
    return [
      'inline-flex text-center cursor-pointer bg-brand border border-solid border-brand text-background-dark text-sm py-4 px-4 w-full tracking-[0.4em] uppercase hover:border-brand hover:text-background-dark hover:transform-none hover:transition-none active:bg-brand/50 focus:border-brand focus:ring focus:ring-brand',
    ]
  }
  return [
    'inline-flex items-center cursor-pointer border border-solid border-white text-white text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-brand hover:text-brand hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20 focus:border-brand focus:ring focus:ring-brand',
  ]
})
</script>

<template>
  <button @click="$emit('click')" :class="btnStyle" v-if="button === true">
    <span class="mx-auto">{{ label }}</span>
    <slot></slot>
  </button>
  <NuxtLink
    @click="$emit('click')"
    v-if="nuxtLink === true"
    :class="btnStyle"
    :href="href"
    :to="to"
  >
    <span class="mx-auto">{{ label }}</span>
    <slot></slot>
  </NuxtLink>
  <a v-if="link === true" :class="btnStyle" :href="href">
    <slot></slot>
  </a>
</template>
