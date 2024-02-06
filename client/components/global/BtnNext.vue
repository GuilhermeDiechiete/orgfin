<template>
  <NuxtLink :to="to" class="button m-1 is-fullwidth">
    Voltar
  </NuxtLink>
</template>
  
<script setup lang="ts">
defineProps([ 'to'])
</script>