<template>
  <button class="my-btn-fullwidth">
    <Icon
      :name="iconame"
      class="icon-color mr-4" />
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps(['text','iconame']);
</script>