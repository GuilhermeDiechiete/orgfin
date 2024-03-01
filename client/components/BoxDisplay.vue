<template>
    <section class="my-box">
      <v-row justify="center">
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('expense')">
            <p>Despesas</p>
            <h1>R$ {{ totalExpenses }}</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('income')">
            <p>Rendimentos</p>
            <h1>R$ {{ totalIncomes }}</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="flex-item" @click="selected('investment')">
            <p>Investimentos</p>
            <h1>R$ {{ totalInvestments }}</h1>
          </div>
        </v-col>
      </v-row>
    </section>
  </template>

<script setup lang="ts">

const store = useTransactionStore()

const selected = ( selected: string ) => {
  store.tableSelected = selected
}
const totalExpenses = ref(store.totalByMonthExpenses)
const totalIncomes = ref(store.totalByMonthIncomes)
const totalInvestments = ref(store.totalAnnualInvestments)
</script>
  
  <style>
  .my-box {
    margin: 1em 0;
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
  