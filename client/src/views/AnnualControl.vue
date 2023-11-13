<template>
  <div class="container">
    <router-link to="/painel" id="link"><i class="fas fa-arrow-left"></i></router-link>
    <div id="center">
      <h1 id="title" class="title is-2">Resumo Controle Financeiro</h1>
      
      <p id="title">Selecione o ano</p>
      <select v-model="selectedYear" id="yearSelect" class="input-year" @change="selectExpenses">
        <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
      </select>
    </div> <br>
    <div id="table-cont">
      <table id="area-table">
        <thead>
          <tr id="thead">
            <th>Mês</th>
            <th>Despesas</th>
            <th>Renda</th>
            <th>Sobra</th>
          </tr>
        </thead> <br>
        <tbody>
          <tr v-for="(item, index) in totalAmountExpenses" :key="index">
            <td >{{ getMonthName(item.month) }}</td>
            <td>{{ item.sum }}</td>
          </tr> 
        </tbody>
        <tfoot>
          <tr>
            <th>TOTAL</th>
            <th id="valueRed">{{ totalAnnual }}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalAmountExpenses: [],
      totalAnnual: 0,
      selectedYear: null,

      messageSuccess: '',
      messageError: '',

      years: Array.from({ length: 78 }, (_, index) => 2023 + index),

    };
  },
  methods: {
    getMonthName(monthNumber) {
      const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      return months[monthNumber - 1] || '';  
    },
    selectExpenses() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
          year: this.selectedYear
        }
        
      };

      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/expenses/totalmonth/${this.userId}`, req)
            .then(res => {
              console.log('ola', res.data.message);
              
              this.totalAmountExpenses = res.data.message.result
              this.totalAnnual = res.data.message.totalAnnual
              console.log(this.totalAnnual)
            })
            .catch(error => {
              this.messageError = error.response.data.message;
              setTimeout(() => {
                this.messageError = '';
              }, 2000);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
