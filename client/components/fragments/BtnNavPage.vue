<template>
  <NuxtLink
    class="button bg-dark text-white mx-1"
    :to="to"
  >
    <i :class="icon"></i>{{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps(['to','icon', 'text'])
</script>