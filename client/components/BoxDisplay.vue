<template>
    <section class="my-box">
      <v-row justify="center">
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('expense')">
            <p><i class="fa-solid fa-cart-shopping fa-flip my-icon " style="--fa-animation-duration: 3s;"></i> Despesas</p>
            <h1>R$ {{ totalExpenses }}</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('income')">
            <p> <i class="fa-solid fa-money-check-dollar fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Rendimentos</p>
            <h1>R$ {{ totalIncomes }}</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('investment')">
            <p> <i class="fa-solid fa-arrow-up-right-dots fa-flip my-icon" style="--fa-animation-duration: 3s;"></i> Investimentos</p>
            <h1>R$ {{ totalInvestments }}</h1>
          </div>
        </v-col>
      </v-row>
    </section>
  </template>

<script setup lang="ts">
const store = useTransactionStore()

onMounted( async () => {
  await store.getByMonth()
})



const selected = ( selected: string ) => {
  store.tableSelected = selected
}
const totalExpenses = ref(store.totalByMonthExpenses)
const totalIncomes = ref(store.totalByMonthIncomes)
const totalInvestments = ref(store.totalAnnualInvestments)
</script>
  
  <style>
  .my-box {
    margin-bottom: 1em;
  }
  .flex-item {
    background-color: #242424;
    padding: 20px;
    border-radius: 0.4em;
    text-align: left;
    width: 100%;
  }
  h1 {
    padding-top: 0.5em;
    font-size: 1.5em;
  }
  </style>
  