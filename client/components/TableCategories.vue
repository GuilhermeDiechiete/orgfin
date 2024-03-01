<template>
  <v-card title="Minhas Categorias" flat>

    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line />
    </template>

    <v-data-table :headers="headers" :items="categories" :search="search">

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>
            <span v-if="item.type === 'expense'">Despesas</span>
            <span v-if="item.type === 'income'">Rendas</span>
            <span v-if="item.type === 'investment'">Investimentos</span>
          </td>
          <td>
            <v-btn color="primary" @click.prevent="deleteCategory(item.id)">
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

const store = useCategoryStore(); // importação do store de categoria
await store.index() // buscando todas as categorias

const categories = ref(store.categories) // categorias

// monitora mudanças em categories
watch(() => store.categories, (newCategories) => {
  categories.value = newCategories;
})

const deleteCategory = async (id:number) => {
  await store.delete(id); 
  await store.index();
};

// renderização 
const headers = [
  {
    title: 'NOME',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'TIPO DE TRANSAÇÃO', key: 'type' },
  { title: 'OPÇÕES' },
];

</script>
