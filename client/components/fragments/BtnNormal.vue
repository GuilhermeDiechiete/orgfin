<template>
  <button
    class="button bg-dark text-white m-1"
  >
    <i :class="icon" />
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['icon', 'text'])
  </script>