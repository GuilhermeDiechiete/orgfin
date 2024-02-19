<template>
  <div class="my-table-container">
    <table class="my-table">
      <thead>
        <tr>
        <th>Mês</th>
        <th>Despesas</th>
        <th>Rendimentos</th>
        <th>Investimentos</th>
        <th>Sobra</th>
      </tr>
      </thead>

      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>{{ months[index] }}</td>
          <td>R$ {{ expense.total }}</td>
          <td>R$ {{ incomes[index].total }}</td>
          <td>R$ {{ investments[index].total }}</td>
          <td>R$ {{ incomes[index].total - (expense.total + investments[index].total) }}</td>
        </tr>
        
      </tbody>
      <tbody>
        <tr>
          <td class="td-total-null"></td>
          <td class="td-total-red">{{ totalAnnualExpenses }}</td>
          <td class="td-total-green">{{ totalAnnualIncomes }}</td>
          <td class="td-total-yellow">{{ totalAnnualInvestments }}</td>
          <td class="td-total-yellow"></td>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps(['type'])

const useTransaction = useTransactionStore()

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro', 'Outubro','Novembro','Dezembro']
const expenses = ref(useTransaction.totalExpenses)
const incomes = ref(useTransaction.totalIncomes)
const investments = ref(useTransaction.totalInvestments)

const totalAnnualExpenses = ref(useTransaction.totalAnnualExpenses)
const totalAnnualIncomes = ref(useTransaction.totalAnnualIncomes)
const totalAnnualInvestments = ref(useTransaction.totalAnnualInvestments)

watch(() => useTransaction.totalExpenses, (newExpenses) => {
  expenses.value = newExpenses
})
watch(() => useTransaction.totalIncomes, (newIncomes) => {
  incomes.value = newIncomes
})
watch(() => useTransaction.totalInvestments, (newInvestments) => {
  investments.value = newInvestments
})

watch(() => useTransaction.totalAnnualExpenses, (newTotal) => {
  totalAnnualExpenses.value = newTotal
})

watch(() => useTransaction.totalAnnualIncomes, (newTotal) => {
  totalAnnualIncomes.value = newTotal
})

watch(() => useTransaction.totalAnnualInvestments, (newTotal) => {
  totalAnnualInvestments.value = newTotal
})



</script>

<script setup lang="ts">










</script>