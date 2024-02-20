<template>
  <button class="my-btn-wide">
    <i :class="icon"></i>
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['text','icon'])
  </script>