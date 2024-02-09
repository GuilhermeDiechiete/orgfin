<template>
  <div class="display">
    <h1><Icon :name="iconame" class="icon-color"/> <span class="text-white">{{ title }}</span></h1>
    <h1 class="title is-5 mt-3">R$ {{ amount }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps(['iconame', 'title', 'amount'])

</script>