<template>
  <button class="btn fullwidth bg-black text-white py-4 border-orange">
    <i :class="icon"></i>
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['text','icon'])
  </script>