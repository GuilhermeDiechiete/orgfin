<template>
    <div class="container">
    <router-link to="/painel" id="link"><i class="fas fa-arrow-left"></i></router-link>
      <div id="center">
        <h1 id="title" class="title is-2">Resumo de despesas anual</h1>
        
        <p id="title">Selecione o ano</p>
        <select v-model="selectedYear" id="yearSelect" class="input-year">
            <option id="optionSelect" disabled selected>Selecione o ano</option>
            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
        </select>
      </div> <br>
      <div id="table-cont">
        <table id="area-table">
          <thead>
            <tr id="thead">
              <th>Mês</th>
              <th>Valor</th>
            </tr>
          </thead> <br>
          <tbody>
            <tr v-for="(item, index) in monthlySummary" :key="index">
              <td>{{ item.month }}</td>
              <td>R$ {{ item.value }}</td>
            </tr>
            <tr>
                <td>VALOR TOTAL DE GASTOS ANUAL em R$</td>
                <td ><strong id="valueRed">R$ 6000</strong> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {

        selectedYear: null,
        
        messageSuccess: '',
        messageError: '',

        years: Array.from({ length: 78 }, (_, index) => 2023 + index),

        monthlySummary: [
          { month: "Janeiro", value: "1000" },
          { month: "Fevereiro", value: "1500" },
          { month: "Março", value: "1500" },
          { month: "Abril", value: "1500" },
          { month: "Maio", value: "1500" },
          { month: "Junho", value: "1500" },
          { month: "Julho", value: "1500" },
          { month: "Agosto", value: "1500" },
          { month: "Setembro", value: "1500" },
          { month: "Outubro", value: "1500" },
          { month: "Novembro", value: "1500" },
          { month: "Dezembro", value: "1500" },
        ]
      };
    }
  };
  </script>