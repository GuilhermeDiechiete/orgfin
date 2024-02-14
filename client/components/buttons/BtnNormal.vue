<template>
  <button
    class="my-button"
  >
    <i :class="icon" />
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['icon', 'text'])
  </script>