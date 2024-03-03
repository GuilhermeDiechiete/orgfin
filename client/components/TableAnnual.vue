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
            <td>{{ monthsNames[index] }}</td>
            <td>R$ {{ getExpenseTotalForMonth(index + 1) }}</td>
            <td>R$ {{ getIncomeTotalForMonth(index + 1) }}</td>
            <td>R$ {{ getInvestmentTotalForMonth(index + 1) }}</td>
          </tr>
          <tr class="text-orange-darken-4">
            <td></td>
            <td>R$ {{ store.totalAnnualExpenses }}</td>
            <td>R$ {{ store.totalAnnualIncomes }}</td>
            <td>R$ {{ store.totalAnnualInvestments }}</td>
          </tr>
        </tbody>
      </v-data-table>
    </v-card>
  </template>
  
  <script setup lang="ts">
  
  
  const store = useTransactionStore();
  
  const expenses = store.totalExpenses;
  const incomes = store.totalIncomes;
  const investments = store.totalInvestments;
  
  const monthsNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const months = Array.from({ length: 12 }, (_, i) => i);
  
  const getExpenseTotalForMonth = (month: number) => {
    const expense = expenses.find(item => item.month === month);
    return expense ? expense.total : 0;
  };
  
  const getIncomeTotalForMonth = (month: number) => {
    const income = incomes.find(item => item.month === month);
    return income ? income.total : 0;
  };
  
  const getInvestmentTotalForMonth = (month: number) => {
    const investment = investments.find(item => item.month === month);
    return investment ? investment.total : 0;
  };
  </script>
  
  
  
  
  
  