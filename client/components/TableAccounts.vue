<template>
  <v-card title="Minhas Contas" flat>

    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
    </template>

    <v-data-table :headers="headers" :items="accounts" :search="search" density="compact">

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>R$ {{ item.amount }}</td>
          <td>
            <v-btn color="primary" density="comfortable" @click.prevent="deleteAccount(item.id)">
              excluir
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import type { Account } from '~/interfaces/interfaces';

const search = ref('') // campo de busca

const store = useAccountStore(); // importação do store de categoria
await store.index() // buscando todas as contas

const accounts = ref<Account[]>(store.accounts);

// monitora mudanças em categories
watch(() => store.accounts, (newAccounts) => {
  accounts.value = newAccounts;
 
});

const deleteAccount = async (id:number) => {
  await store.delete(id); 
  await store.index();
}

// renderização 
const headers = [
  {
    title: 'BANCO', 
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'EM CONTA', key: 'amount' },
  { title: 'OPÇÕES' },
];

</script>