<template>
    <v-card class="mx-auto" style="width:256px">
      <v-layout>
        <v-navigation-drawer permanent absolute>
          <v-list>
            <v-list-item :title="username" :subtitle="email">
              <template v-slot:append>
                <v-btn size="small" variant="text" icon="mdi-menu-down" />
              </template>
            </v-list-item>
          </v-list>
  
          <v-divider />
  
          <v-list :lines="false" density="compact" nav>
            
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" :to="item.to">
              <template v-slot:prepend>
                <i class="my-icon" :class="item.icon"></i>
              </template>
  
              <v-list-item-title v-text="item.text" />
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 354px" />
      </v-layout>
    </v-card>
  </template>
<script setup lang="ts">

const store = useUserStore()
await store.show()

const username = ref(store.user.username)
const email = ref(store.user.email)

const items = [
      { text: 'Iniciar', icon: 'fa-solid fa-house', to:'/'},
      { text: 'Categorias', icon: 'fa-solid fa-layer-group', to:'/categories'},
      { text: 'Contas', icon: 'fa-solid fa-building-columns', to:'/accounts'},
      { text: 'Relatório Anual', icon: 'fa-solid fa-file', to:'/annual-report'},
      { text: 'Configurações', icon: 'fa-solid fa-file', to:'/annual-report'},
    ]
</script>



