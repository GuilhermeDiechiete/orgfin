<template>
    <v-card class="mx-auto my-2" width="100%">
  
      <template v-slot:title>
        <i class="my-icon" :class="icon"></i>{{ title }}
      </template>
  
      <v-card-text>
        {{ description }}
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  defineProps(['icon', 'title', 'description'])
  </script>
  