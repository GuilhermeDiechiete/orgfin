<template>
  <v-card flat title="Rendimentos">

    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined" hide-details>
      </v-text-field>
    </template>

    <v-data-table :headers="headers" :items="incomes" :search="search" density="compact">

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ getDayFromDate(item.date) }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.installment }} - {{ item.total_installments }}</td>
          <td>R$ {{ item.amount }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.destiny }}</td>
          <td>{{ item.status }}</td>
          <td> <v-btn color="primary" density="comfortable" @click.prevent="deleteTransaction(item.id)">Excluir</v-btn></td>
        </tr>
      </template>
    </v-data-table>

  </v-card>
</template>

<script setup lang="ts">
import type { Transaction } from '~/interfaces/interfaces';


const search = ref('')
const store = useTransactionStore()
await store.getByMonth()

const incomes = ref<Transaction[]>(store.incomes);

const headers = [
        {
          align: 'start',
          key: 'date',
          sortable: false,
          title: 'Dia',
        },
        { title: 'Descrição', key: 'description' },
        { title: 'Parcelas', key: 'installment'},
        { title: 'R$', key: 'amount'},
        { title: 'Categoria', key: 'category'},
        { title: 'Destino', key: 'destiny'},
        { title: 'Situação', key: 'status'},
        { title: 'Opções'}

    ]

const deleteTransaction = async (id:number) => {
  await store.delete(id)
  await store.getByMonth()
}

const getDayFromDate = (date: string) => {
  return new Date(date).getDate(); // Retorna apenas o dia da data
};

watch(() => store.incomes, (newIncomes) => {
  incomes.value = newIncomes;
})
</script>