<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="py-3 text-center bg-brand">
    <p class="text-sm uppercase text-gray-50">
      &copy;<span>{{ currentYear }}</span> High Park Livery Inc. All rights
      reserved
    </p>
  </div>
</template>
