<template>
    <v-card title="Usuários do Sistema" flat>
  
      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
      </template>
  
      <v-data-table :headers="headers" :items="users" :search="search" density="compact">
  
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>Usuário Padrão</td>
            <td>
              <v-btn color="primary" density="comfortable" @click.prevent="deleteUser(item.id)">
                excluir
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import type { Users } from '~/interfaces/interfaces';
  const search = ref('') // campo de busca
  
  const store = useAdminStore(); // importação do store de categoria
  await store.index() // buscando todas as categorias
  
  const users = ref<Users[]>(store.users) // categorias
  
  // monitora mudanças em categories
  watch(() => store.users, (newUsers) => {
    users.value = newUsers;
  })
  
  const deleteUser = async (id:number) => {
    await store.delete(id); 
    await store.index();
  };
  
  // renderização 
  const headers = [
    {
      title: 'Código',
      align: 'start',
      sortable: false,
      key: 'id',
    },
    { title: 'Nome de Usuário', key: 'username' },
    { title: 'E-mail', key: 'email'},
    { title: 'Nível de Acesso', key: 'role'},
    { title: 'Excluir', key: ''},
  ];
  
  </script>