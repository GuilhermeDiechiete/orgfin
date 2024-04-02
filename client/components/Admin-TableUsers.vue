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
            <td>
              <span v-if="item.role">Admin</span>
              <span v-if="!item.role">Normal</span>
            </td>
            <td>
              <v-btn block color="yellow mr-2" density="comfortable" @click="confirm = !confirm">
                an
              </v-btn>
            </td>
            <td>
              
              <v-btn block color="primary" density="comfortable" @click.prevent="deleteUser(item.id)">
                excluir
              </v-btn>
            </td>
          </tr>

          <v-bottom-sheet v-model="confirm">
            <v-card class="text-center" height="50%">
              <v-card-text>
                <v-btn variant="text" @click="confirm = !confirm">
                  fechar
                </v-btn>

                <p class="mt-4 text-red">*** VOCÊ ESTÁ ALTERANDO A PERMISSÃO DO USUÁRIO, VOCÊ CONFIRMA? ***</p>
                <v-btn class="my-4" color="yellow mr-2" density="comfortable" @click.prevent="changeRole(item.id)">
                      alterar permissão
                    </v-btn>
              </v-card-text>
            </v-card>
          </v-bottom-sheet>
        </template>
      </v-data-table>

      <div class="text-center">
  </div>
    </v-card>
  </template>
  
  <script setup lang="ts">
  const confirm = ref(false)

  import type { Users } from '~/interfaces/interfaces';
  const search = ref('') // campo de busca
  
  const store = useAdminStore(); // importação do store de administrador
  await store.index() // buscando todas os usuarios
  
  const users = ref<Users[]>(store.users) // usuarios
  
  // monitora mudanças em categories
  watch(() => store.users, (newUsers) => {
    users.value = newUsers;
  })
  
  const deleteUser = async (id:number) => {
    await store.delete(id); 
    await store.index();
  };
  const changeRole = async (id:number) => {
    await store.changeRole(id)
    await store.index()
  }
  
  // renderização 
  const headers = [
    {
      title: 'CÓDIGO',
      align: 'start',
      sortable: false,
      key: 'id',
    },
    { title: 'NOME DE USUÁRIO', key: 'username' },
    { title: 'E-MAIL', key: 'email'},
    { title: 'NÍVEL DE ACESSO', key: 'role'},
    { title: 'ALTERAR NÍVEL', key: 'role'},
    { title: 'Excluir', key: ''},
  ];
  
  </script>