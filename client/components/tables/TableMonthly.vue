<template>
  <div class="my-table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Parcelas</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Conta de Saída</th>
          <th>Destino</th>
          <th v-if="type === 'expenses'">Status</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody v-if="type === 'expenses'">
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.date }}</td>
          <td>{{ expense.description }}</td>
          <td>{{ expense.installment }} - {{ expense.total_installments }}</td>
          <td>R$ {{ expense.amount }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.account }}</td>
          <td>{{ expense.destiny }}</td>
          <td> 
            <span v-if="expense.status === false"><button class="my-btn-danger">Pendente</button></span>
            <span v-if="expense.status === true"> <button class="my-btn-success">Pago</button></span>
          </td>
          <td><button class="my-button-delete">X</button></td>
        </tr>
      </tbody>
      <tbody v-if="type === 'incomes'">
        <tr v-for="income in incomes" :key="income.id">
          <td>{{ income.date }}</td>
          <td>{{ income.description }}</td>
          <td>{{ income.installment }} - {{ income.total_installments }}</td>
          <td>{{ income.amount }}</td>
          <td>{{ income.category }}</td>
          <td>{{ income.account }}</td>
          <td>{{ income.destiny }}</td>
          
          <td><button class="my-button-delete">X</button></td>
        </tr>
      </tbody>
      <tbody v-if="type === 'investments'">
        <tr v-for="investment in investments" :key="investment.id">
          <td>{{ investment.date }}</td>
          <td>{{ investment.description }}</td>
          <td>{{ investment.installment }} - {{ investment.total_installments }}</td>
          <td>{{ investment.amount }}</td>
          <td>{{ investment.category }}</td>
          <td>{{ investment.account }}</td>
          <td>{{ investment.destiny }}</td>
         
          <td><button class="my-button-delete">X</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps(['type'])

const useSearchTransaction = useSearchTransactionStore()

const expenses = ref(useSearchTransaction.expenses)
const incomes = ref(useSearchTransaction.incomes)
const investments = ref(useSearchTransaction.investments)

watch(() => useSearchTransaction.expenses, (newExpenses) => {
  expenses.value = newExpenses
})
watch(() => useSearchTransaction.incomes, (newIncomes) => {
  incomes.value = newIncomes
})
watch(() => useSearchTransaction.investments, (newInvestments) => {
  investments.value = newInvestments
})




 
</script>