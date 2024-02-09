<template>
  <NuxtLink
    class="button bg-dark text-white mx-1"
    :to="to"
  >
    <Icon
      class="text-orangered mr-2"
      :name="iconame"
    />{{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps(['to','iconame', 'text'])
</script>