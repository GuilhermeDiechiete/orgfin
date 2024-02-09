<template>
  <button class="button is-fullwidth bg-dark text-white">
    <Icon
      :name="iconame"
      class="icon-color mr-4"
    />
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps(['text','iconame'])
</script>