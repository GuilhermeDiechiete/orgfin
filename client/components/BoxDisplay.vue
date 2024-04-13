<!-- Caixa de Displays, exibe 4 display, cada um deles é responsavel por exibir as informações principais de cada transação, na tela inicial -->
<template>
  <section class="my-box">
    <v-row justify="center">
      <Display @click="selected('expense')" :option="display === 'expense'" title="DESPESAS" :value="totalExpenses" icon="fa-solid fa-cart-shopping fa-flip my-icon"/>
      <Display @click="selected('income')" :option="display === 'income'" title="RENDIMENTOS" :value="totalIncomes" icon="fa-solid fa-money-check-dollar fa-flip my-icon"/>
      <Display @click="selected('investment')" :option="display === 'investment'" title="INVESTIMENTOS" :value="totalInvestments" icon="fa-solid fa-arrow-up-right-dots fa-flip my-icon"/>
      <Display @click="selected('surplus')" :option="display === ''" title="SOBRAS" :value="surplus" icon="fa-solid fa-arrow-up-right-dots fa-flip my-icon"/>
    </v-row>
  </section>
</template>

<script setup lang="ts">
const store = useTransactionStore() // stores com informações das transações
const G = useGlobalStore() // stores de valores globais

await store.getByMonth() // faz uma busca atualizada das transações do mes e ano atual

// informações buscados na API getByMonth
const totalExpenses = ref(store.totalByMonthExpenses.toFixed(2))
const totalIncomes = ref(store.totalByMonthIncomes.toFixed(2))
const totalInvestments = ref(store.totalByMonthInvestments.toFixed(2))
const surplus = ref(store.surplus.toFixed(2))

const display = ref(G.tableSelected)


// MONITORAMENTO DE MUDANÇAS NOS VALORES
watch(() => store.totalByMonthExpenses, (newExpenses) => {
  totalExpenses.value = String(newExpenses);
})
watch(() => store.totalByMonthIncomes, (newIncomes) => {
  totalIncomes.value = String(newIncomes);
})
watch(() => store.totalByMonthInvestments, (newInvestments) => {
  totalInvestments.value = String(newInvestments);
})
watch(() => store.surplus, (newSurplus) => {
  surplus.value = String(newSurplus);
})
watch(() => G.tableSelected, (newSelected) => {
  display.value = newSelected;
})

const selected = ( option: string ) => {
  G.tableSelected = option
}
</script>




