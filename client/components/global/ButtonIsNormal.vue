<template>
  <button class="button m-1">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps(['text'])
</script>