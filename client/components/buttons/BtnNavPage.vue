<template>
  <NuxtLink
    class="my-btn-nav"
    :to="to">
    <i :class="icon" />{{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps(['to','icon', 'text']);
</script>