<template>
    <v-card flat title="Despesas">

      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined" hide-details>
        </v-text-field>
      </template>
  
      <v-data-table :headers="headers" :items="expenses" :search="search">

        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.date }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.installment }} - {{ item.total_installments }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.destiny }}</td>
            <td>{{ item.status }}</td>
            <td> <v-btn color="primary" @click.prevent="deleteTransaction(item.id)">Excluir</v-btn></td>
          </tr>
        </template>
      </v-data-table>

    </v-card>
  </template>

<script setup lang="ts">

const search = ref('')
const store = useTransactionStore()
await store.getByMonth()

const expenses = ref(store.expenses)

const headers = [
        {
          align: 'start',
          key: 'date',
          sortable: false,
          title: 'DATA',
        },
        { title: 'DESCRIÇÃO', key: 'description' },
        { title: 'PARCELAS', key: 'installment'},
        { title: 'VALOR R$', key: 'amount'},
        { title: 'CATEGORIA', key: 'category'},
        { title: 'DESTINO', key: 'destiny'},
        { title: 'SITUAÇÃO', key: 'status'},
        { title: 'OPÇÕES'}

    ]

const deleteTransaction = async (id:number) => {
  await store.delete(id)
  await store.getByMonth()
}

watch(() => store.expenses, (newExpenses) => {
  expenses.value = newExpenses;
})
</script>