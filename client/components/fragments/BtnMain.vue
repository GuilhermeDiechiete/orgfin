<template>
  <button class="btn fullwidth bg-black text-white py-4 border-orange">
    <Icon
      :name="iconame"
      class="text-white mr-4"
    />
    {{ text }}
  </button>
</template>
  
  <script setup lang="ts">
  defineProps(['text','iconame'])
  </script>