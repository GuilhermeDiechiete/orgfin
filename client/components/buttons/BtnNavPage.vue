<template>
  <NuxtLink
    class="my-button-nav"
    :to="to"
  >
    <i :class="icon"></i>{{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps(['to','icon', 'text'])
</script>