<template>
  <div class="my-table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th v-if="type === 'expenses'">
            Parcelas
          </th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Conta de Saída</th>
          <th>Destino</th>
          <th>Status</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody v-if="type === 'expenses'">
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.date }}</td>
          <td>{{ expense.description }}</td>
          <td>{{ expense.installment }}</td>
          <td>{{ expense.total_installments }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.account }}</td>
          <td>{{ expense.destiny }}</td>
          <td>{{ expense.status }}</td>
          <td><button class="my-button-delete">Excluir</button></td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps(['type'])

const useTransaciton = useTransactionStore()

const expenses = useTransaciton.expenses

 
</script>