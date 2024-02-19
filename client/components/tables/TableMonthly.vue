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
          <th>Saída</th>
          <th>Destino</th>
          <th v-if="type === 'expenses'">Status</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody v-if="type === 'expenses'">
        <tr v-for="expense in expenses" :key="expense.id">
          <td class="w8">{{ expense.date }}</td>
          <td class="w10">{{ expense.description }}</td>
          <td>{{ expense.installment }} - {{ expense.total_installments }}</td>
          <td class="w8">R$ {{ expense.amount }}</td>
          <td class="w10">{{ expense.category }}</td>
          <td class="w8">{{ expense.account }}</td>
          <td class="w8">{{ expense.destiny }}</td>
          <td class="has-text-centered"> 
            <span @click="changeStatus(expense.id)" v-if="expense.status === false"><button class="my-button-danger">Pendente</button></span>
            <span @click="changeStatus(expense.id)" v-if="expense.status === true"> <button class="my-button-success">Pago</button></span>
          </td>
          <td class="w5 has-text-centered"><button @click="deleteTransaction(expense.id)" class="my-button-delete">X</button></td>
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
          
          <td><button @click="deleteTransaction(income.id)" class="my-button-delete">X</button></td>
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
         
          <td><button @click="deleteTransaction(investment.id)" class="my-button-delete">X</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps(['type'])

const useTransaction = useTransactionStore()

const expenses = ref(useTransaction.expenses)
const incomes = ref(useTransaction.incomes)
const investments = ref(useTransaction.investments)

const deleteTransaction = async(id:number) => {
  await storeTransaction.delete(id)
  await useTransaction.getByMonth()
}

const changeStatus = async(id:number) => {
  await storeTransaction.changeStatus(id)
  await useTransaction.getByMonth()
}

watch(() => useTransaction.expenses, (newExpenses) => {
  expenses.value = newExpenses
})
watch(() => useTransaction.incomes, (newIncomes) => {
  incomes.value = newIncomes
})
watch(() => useTransaction.investments, (newInvestments) => {
  investments.value = newInvestments
})


const storeTransaction = useTransactionStore()


</script>

<script setup lang="ts">










</script>