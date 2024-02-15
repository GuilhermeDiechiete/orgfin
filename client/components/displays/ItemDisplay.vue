<template>
  <div class="display">
    <h1> <i :class="icon" style="--fa-animation-duration: 3s;"></i> <span class="text-white">{{ title }}</span></h1>
    <h1 class="title is-5 mt-3">
      R$ {{ amount }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps(['icon', 'title', 'amount'])

</script>