<template>
  <button
    class="my-btn">
    <i :class="icon" />
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['icon', 'text']);
  </script>