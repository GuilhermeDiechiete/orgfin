<template>
  <button class="my-button-wide">
    <i :class="icon"></i>
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['text','icon'])
  </script>