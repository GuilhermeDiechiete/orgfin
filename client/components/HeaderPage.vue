<!-- CABEÇALHO DAS PAGINAS -->

<script setup lang="ts">
  defineProps(['icon', 'title', 'description'])
</script>

<template>
  <v-card class="mx-auto mb-2" width="100%">
    <template v-slot:title>
      <h1><i class="my-icon fa-flip" :class="icon" style="--fa-animation-duration: 3s;"></i>{{ title }}</h1>
      
    </template>
    <v-card-text>
      {{ description }}
    </v-card-text>
  </v-card>
</template>
  
 
  