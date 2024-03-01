<template>
  <v-card title="Minhas Contas" flat>

    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
    </template>

    <v-data-table :headers="headers" :items="accounts" :search="search">

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>
            <v-btn color="primary" @click.prevent="deleteAccount(item.id)">
              Button
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">

const search = ref('') // campo de busca

const store = useAccountStore(); // importação do store de categoria
await store.index() // buscando todas as contas

const accounts = ref(store.accounts) // contas

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
    title: 'NOME', 
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'VALOR EM CONTA', key: 'amount' },
  { title: 'OPÇÕES' },
];

</script>