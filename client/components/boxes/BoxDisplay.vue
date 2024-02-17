<template>
  <section class="columns">
    <ItemDisplay class="column" icon="fa-solid fa-cart-shopping mr-3 my-icon fa-flip" title="Despesas" :amount="totalExpenses"/>
    <ItemDisplay class="column" icon="fa-solid fa-sack-dollar mr-3 my-icon fa-flip" title="Rendimentos" :amount="totalIncomes"/>
    <ItemDisplay class="column" icon="fa-solid fa-arrow-up-right-dots mr-3 my-icon fa-flip" title="Investimentos" :amount="totalInvestments"/>
    <ItemDisplay class="column" icon="fa-solid fa-champagne-glasses mr-3 my-icon fa-flip" title="Sobra" :amount="surplus"/>
  </section>
</template>


<script setup lang="ts">

const total = useTransactionStore()

const totalExpenses = ref(total.totalByMonthExpenses)
const totalIncomes = ref(total.totalByMonthIncomes)
const totalInvestments = ref(total.totalByMonthInvestments)
const surplus = ref(total.surplus)

watch(() => total.totalByMonthExpenses, (newExpenses) => {
  totalExpenses.value = newExpenses
})
watch(() => total.totalByMonthIncomes, (newIncomes) => {
  totalIncomes.value = newIncomes
})
watch(() => total.totalByMonthInvestments, (newInvestments) => {
  totalInvestments.value = newInvestments
})
watch(() => total.surplus, (newSurplus) => {
  surplus.value = newSurplus
})

</script>
