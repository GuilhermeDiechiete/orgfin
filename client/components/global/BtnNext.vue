<template>
  <NuxtLink :to="to" class="button m-1 is-fullwidth">
    {{ text }}
  </NuxtLink>
</template>
  
<script setup lang="ts">
defineProps(['text', 'to'])
</script>