<!-- DISPLAY - MOSTRA OS VALORES TOTAIS NA TELA INICIAL-->

<script setup lang="ts">
const store = useTransactionStore() // acessando store de transações
await store.getByMonth() // executando a API para buscar os valores

// função que monitora o valor, UTILIZADO PARA RENDERIZAR AS TABELAS
const selected = ( selected: string ) => {
  store.tableSelected = selected
}

// valores da API
const totalExpenses = ref(store.totalByMonthExpenses)
const totalIncomes = ref(store.totalByMonthIncomes)
const totalInvestments = ref(store.totalByMonthInvestments)
const surplus = ref(store.surplus)

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
</script>

<template>
  <section class="my-box">
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <div class="flex-item" @click="selected('expense')">
          <p><i class="fa-solid fa-cart-shopping fa-flip my-icon " style="--fa-animation-duration: 3s;"></i> Despesas</p>
          <h1>R$ {{ totalExpenses }}</h1>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="flex-item" @click="selected('income')">
          <p> <i class="fa-solid fa-money-check-dollar fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Rendimentos</p>
          <h1>R$ {{ totalIncomes }}</h1>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="flex-item" @click="selected('investment')">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Investimentos</p>
          <h1>R$ {{ totalInvestments }}</h1>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="flex-item">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Sobra</p>
          <h1>R$ {{ surplus }}</h1>
        </div>
      </v-col>
    </v-row>
  </section>
</template>


  
