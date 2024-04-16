<template>
    <v-card flat title="Despesas">

      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined" hide-details>
        </v-text-field>
      </template>
  
      <v-data-table :headers="headers" :items="expenses" :search="search" density="compact">

        <template v-slot:item="{ item }">
          <tr>
            <td>{{ getDayFromDate(item.date) }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.installment }} - {{ item.total_installments }}</td>
            <td>R$ {{ item.amount }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.destiny }}</td>
            <td @click="alterStatus(item.id)">
              <v-btn block small color="primary" density="comfortable" v-if="item.status === false">Pendente</v-btn>
              <v-btn block small color="green darken-1" density="comfortable" v-if="item.status === true">Pago</v-btn>
            </td>
            <td> <v-btn block small color="primary" density="comfortable" @click.prevent="deleteTransaction(item.id)">Excluir</v-btn></td>
          </tr>
        </template>
        
      </v-data-table>
      <p>Valor Pendente: R$ {{ totalExpensesFalse }}</p>

    </v-card>
  </template>

<script setup lang="ts">
import type { Transaction } from '~/interfaces/interfaces';

const search = ref('')
const store = useTransactionStore()
const G = useGlobalStore()

await store.getByMonth()

const totalExpensesFalse = ref(store.totalByMonthExpensesFalse)
const expenses = ref<Transaction[]>(store.expenses);
const headers = [
        {
          title: 'VENC. DIA',
          align: 'start', key: 'date',
       
          
        },
        { title: 'DESCRIÇÃO', key: 'description' },
        { title: 'PARCELAS', key: 'installment'},
        { title: 'R$', key: 'amount'},
        { title: 'CATEGORIA', key: 'category'},
        { title: 'DESTINO', key: 'destiny'},
        { title: 'SITUAÇÃO', key: 'status'},
        { title: 'OPÇÕES'}

    ]

const deleteTransaction = async (id:number) => {
  await store.delete(id)
  await store.getByMonth()
}
const alterStatus = async (id:number) => {
  await store.changeStatus(id)
  await store.getByMonth()
}

const getDayFromDate = (date: string) => {
  return new Date(date).getDate(); // Retorna apenas o dia da data
};

watch(() => store.expenses, (newExpenses) => {
  expenses.value = newExpenses;
})
watch(() => store.totalByMonthExpensesFalse, (newExpenses) => {
  totalExpensesFalse.value = newExpenses;
})
watch(() => store.totalByMonthExpensesFalse, (newExpenses) => {
  totalExpensesFalse.value = newExpenses;
})
</script>

