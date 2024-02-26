<template>
  <section class="my-btn-next">
    <NuxtLink :to="to">
      <IconArrowLeft />
    </NuxtLink>
  </section>
</template>
  
  <script setup lang="ts">
  defineProps(['to']);
  </script>