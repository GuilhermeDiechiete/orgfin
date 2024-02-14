<template>
    <NuxtLink :to="to" class="button is-fullwidth bg-dark text-white">
      <IconArrowLeft />
      <span>{{ text }}</span>
      
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  defineProps(['text','iconame','to'])
  </script>