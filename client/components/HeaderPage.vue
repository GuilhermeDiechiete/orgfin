<template>
    <v-card class="mx-auto my-2" width="100%" prepend-icon="mdi-home">
  
      <template v-slot:title>
        <i class="my-icon" :class="icon"></i>{{ title }}
      </template>
  
      <v-card-text>
        {{ description }}
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      icon: String,
      title: String,
      description: String
    }
  }
  </script>
  