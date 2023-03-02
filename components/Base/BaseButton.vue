<!-- <script setup lang="ts">
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
  <NuxtLink @click="$emit('click')" v-if="nuxtLink === true" :class="btnStyle" :href="href" :to="to">
    <span class="mx-auto">{{ label }}</span>
    <slot></slot>
  </NuxtLink>
  <a v-if="link === true" :class="btnStyle" :href="href">
    <slot></slot>
  </a>
</template> -->

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

const buttonStyles: { [key: string]: string } = {
  'btn-light':
    'border-white text-white hover:border-brand hover:text-brand focus:border-brand focus:ring focus:ring-brand',
  'btn-brand':
    'border-brand text-brand hover:border-brand hover:text-brand focus:border-brand focus:ring focus:ring-brand',
  'btn-dark':
    'border-background-dark text-background-dark hover:border-brand hover:text-brand focus:border-brand focus:ring focus:ring-brand',
  'btn-flat':
    'border-0 text-brand font-sans hover:border-brand hover:text-brand active:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand',
  'btn-solid':
    'bg-brand border-brand text-background-dark hover:border-brand hover:text-background-dark',
}

const props = defineProps<Props>()

const btnStyle = computed(() => {
  const style =
    buttonStyles[props.kind || 'btn-light'] || buttonStyles['btn-light']
  return `inline-flex items-center cursor-pointer border border-solid ${style} text-base py-2 px-5 tracking-[0.4em] uppercase hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20`
})
const NuxtLink = resolveComponent('nuxt-link')
</script>
<template>
  <component
    @click="$emit('click')"
    :class="btnStyle"
    v-if="button || nuxtLink || link"
    :to="to"
    :href="href"
    :is="button ? 'button' : nuxtLink ? NuxtLink : 'a'"
  >
    <span class="mx-auto">{{ label }}<slot /></span>
  </component>
</template>
