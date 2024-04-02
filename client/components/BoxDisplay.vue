<!-- DISPLAYS - mostra uma visão geral para o usuário-->

<script setup lang="ts">

const store = useTransactionStore() // acessando store de transações

// executando a API para buscar os valores ( os params 'month' e 'year' são passados diretamente para o store de transações )
await store.getByMonth() 

// FUNÇÃO PRINCIPAL DE INTERAÇÃO COM O USUÁRIO
// O metodo 'selected' monitora o display selecionado ( as tabelas são renderizadas de acordo com o display selecionado )
const selected = ( option: string ) => {
  store.tableSelected = option
}

// valores salvos no storeTransactions ( são disponibilizados com a busca na API getByMonth )
const totalExpenses = ref(store.totalByMonthExpenses.toFixed(2))
const totalIncomes = ref(store.totalByMonthIncomes.toFixed(2))
const totalInvestments = ref(store.totalByMonthInvestments.toFixed(2))
const surplus = ref(store.surplus.toFixed(2))

const display = ref(store.tableSelected)

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
watch(() => store.tableSelected, (newSelected) => {
  display.value = newSelected;
})
</script>

<template>
  <section class="my-box">
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <div @click="selected('expense')" :class="{ 'active': display === 'expense', 'inactive': display !== 'expense' }">
          <p><i class="fa-solid fa-cart-shopping fa-flip my-icon " style="--fa-animation-duration: 3s;"></i> DESPESAS</p>
          <h1 class="text-h5">R$ {{ totalExpenses }}</h1>
          <span>
            <p v-if="display == 'expense'"><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
            <p v-if="display != 'expense'"><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
          </span>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div @click="selected('income')" :class="{ 'active': display === 'income', 'inactive': display !== 'income' }">
          <p> <i class="fa-solid fa-money-check-dollar fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> RENDIMENTOS</p>
          <h1 class="text-h5">R$ {{ totalIncomes }}</h1>
          <p v-if="display == 'income'" class="text-left"><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
          <p v-if="display != 'income'" class="text-left"><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div @click="selected('investment')" :class="{ 'active': display === 'investment', 'inactive': display !== 'investment' }">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> INVESTIMENTOS</p>
          <h1 class="text-h5">R$ {{ totalInvestments }}</h1>
          <p v-if="display == 'investment'" class=""><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
          <p v-if="display != 'investment'" class=""><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="inactive">
          <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> SOBRA</p>
          <h1 class="text-h5">R$ {{ surplus }}</h1>
          <p>-</p>
        </div>
      </v-col>
    </v-row>
  </section>
</template>


