<!-- DISPLAYS - mostra uma visão geral para o usuário-->

<script setup lang="ts">
const store = useTransactionStore() // stores de transações
const G = useGlobalStore() // stores de valores globais

await store.getByMonth() // buscando transações do mês atual

// valores salvos no storeTransactions ( são disponibilizados com a busca na API getByMonth )
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


