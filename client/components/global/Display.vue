<template>
  <div class="display">
    <h1>
      <i
        :class="icon"
        style="--fa-animation-duration: 3s;" /> <span>{{ title }}</span>
    </h1>
    <h1 class="display-amount">
      R$ {{ amount }}
    </h1>
  </div>
</template>
  
  <script setup lang="ts">
  defineProps(['icon', 'title', 'amount']);
  
  </script>