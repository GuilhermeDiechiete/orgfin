<template>
    <v-card class="mx-auto my-2" width="100%" prepend-icon="mdi-home">
  
      <template v-slot:title>
        {{ title }}
      </template>
  
      <v-card-text>
        {{ description }}
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      description: String
    }
  }
  </script>
  