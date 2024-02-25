<template>
  <NuxtLink :to="to">
    <div>
      <div class="my-btn-nav">
        <i :class="icon" />
      </div>
      <p class="text-white">
        {{ text }}
      </p>
    </div>
  </NuxtLink>  
</template>

<script setup lang="ts">
defineProps(['to','icon', 'text']);
</script>