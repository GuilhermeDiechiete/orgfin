<template>
    <button class="button is-fullwidth my-4">{{ text }}</button>
  </template>
    
  <script setup lang="ts">
  defineProps(['text'])
  </script>