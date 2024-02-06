<template>
  <NuxtLink
    :to="to"
    class="button mx-1"
  >
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">

defineProps(['to', 'text' ])

</script>