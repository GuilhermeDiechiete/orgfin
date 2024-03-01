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
                <v-icon :icon="item.icon"></v-icon>
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
      { text: 'Iniciar', icon: 'mdi-home', to:'/'},
      { text: 'Categorias', icon: 'mdi-widgets', to:'/categories'},
      { text: 'Contas', icon: 'mdi-star', to:'/accounts'},
      { text: 'Relatório Anual', icon: 'mdi-folder', to:'/'},
    ]

</script>


