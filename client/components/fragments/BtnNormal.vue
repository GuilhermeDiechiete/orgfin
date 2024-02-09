<template>
    <button
      class="button bg-dark text-white m-1"
    >
      <Icon
        class="text-orangered mr-2"
        :name="iconame"
      />{{ text }}
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps(['iconame', 'text'])
  </script>