<!-- DISPLAY - MOSTRA OS VALORES TOTAIS NA TELA INICIAL-->

<script setup lang="ts">
const store = useTransactionStore() // acessando store de transações
await store.getByMonth() // executando a API para buscar os valores


// função que monitora o valor, UTILIZADO PARA RENDERIZAR AS TABELAS
const selected = ( option: string ) => {
  store.tableSelected = option
}
// valores da API
const totalExpenses = ref(store.totalByMonthExpenses)
const totalIncomes = ref(store.totalByMonthIncomes)
const totalInvestments = ref(store.totalByMonthInvestments)
const surplus = ref(store.surplus)
const displaySelected = ref(store.tableSelected)

// MONITORAMENTO DE MUDANÇAS NOS VALORES
watch(() => store.totalByMonthExpenses, (newExpenses) => {
  totalExpenses.value = newExpenses;
})
watch(() => store.totalByMonthIncomes, (newIncomes) => {
  totalIncomes.value = newIncomes;
})
watch(() => store.totalByMonthInvestments, (newInvestments) => {
  totalInvestments.value = newInvestments;
})
watch(() => store.surplus, (newSurplus) => {
  surplus.value = newSurplus;
})
watch(() => store.tableSelected, (newSelected) => {
  displaySelected.value = newSelected;
})
</script>

<template>
  <section class="my-box">
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <div @click="selected('expense')" :class="{ 'active': displaySelected === 'expense', 'inactive': displaySelected !== 'expense' }">
          <p><i class="fa-solid fa-cart-shopping fa-flip my-icon " style="--fa-animation-duration: 3s;"></i> Despesas</p>
          <h1>R$ {{ totalExpenses }}</h1>
            <p v-if="displaySelected == 'expense'"><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
            <p v-if="displaySelected != 'expense'"><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div @click="selected('income')" :class="{ 'active': displaySelected === 'income', 'inactive': displaySelected !== 'income' }">
          <p> <i class="fa-solid fa-money-check-dollar fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Rendimentos</p>
          <h1>R$ {{ totalIncomes }}</h1>
          <p v-if="displaySelected == 'income'" class="text-left"><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
          <p v-if="displaySelected != 'income'" class="text-left"><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div @click="selected('investment')" :class="{ 'active': displaySelected === 'investment', 'inactive': displaySelected !== 'investment' }">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Investimentos</p>
          <h1>R$ {{ totalInvestments }}</h1>
          <p v-if="displaySelected == 'investment'" class=""><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
          <p v-if="displaySelected != 'investment'" class=""><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="inactive">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Sobra</p>
          <h1>R$ {{ surplus }}</h1>
          <p>-</p>
        </div>
      </v-col>
    </v-row>
  </section>
</template>


