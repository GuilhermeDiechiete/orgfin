<!-- TABELA DE CONTROLE ANUAL DO USUÁRIO -->

<script setup lang="ts">
const store = useTransactionStore() // acessando store das transações
await store.getByYear() // chamando api para buscar dados no banco de dados

// acessando valores da API 
const expenses = ref(store.totalExpenses) // total de despesas de cada mes do ano selecionado
const incomes = ref(store.totalIncomes) // total de rendas de cada mes do ano selecionado
const investments = ref(store.totalInvestments) // total de investimentos de cada mes do ano selecionado

// MONITORAMENTO - se o input do ano for alterada, faz uma nova busca e salva os novos valores
watch(() => store.yearTableAnnual, async () => {
  await store.getByYear() // nova busca
  expenses.value = store.totalExpenses
  incomes.value = store.totalIncomes
  investments.value = store.totalInvestments

})
// valor estatico dos meses 
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]
</script>

<template>
  <v-card>
    <v-data-table>
      <thead>
        <tr class="text-deep-orange-darken-3">
          <th>MÊS</th>
          <th>DESPESAS</th>
          <th>RENDIMENTOS</th>
          <th>INVESTIMENTOS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(month, index) in months" :key="month">
          <td>{{ months[index] }}</td>
          <td>R$ {{ expenses[index] }}</td>
          <td>R$ {{ incomes[index] }}</td>
          <td>R$ {{ investments[index] }}</td>
        </tr>
        <tr class="text-orange-darken-4">
          <td>TOTAL</td>
          <td>R$ {{ store.totalAnnualExpenses }}</td>
          <td>R$ {{ store.totalAnnualIncomes }}</td>
          <td>R$ {{ store.totalAnnualInvestments }}</td>
        </tr>
      </tbody>
    </v-data-table>
  </v-card>
</template>
  

  
  
  
  
  
  