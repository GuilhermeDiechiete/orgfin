<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <NavBar />
      </v-navigation-drawer>
  
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer">
          <i class="fa-solid fa-bars my-icon"></i>
        </v-app-bar-nav-icon>
        <v-app-bar-title>OrgFin</v-app-bar-title>
      </v-app-bar>
  
      <v-main>
        <slot></slot>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      data: () => ({ drawer: null }),
    }
  </script>