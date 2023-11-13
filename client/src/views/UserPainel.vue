<template>
  <div class="container">
    <div id="area-nav">
      <nav id="area-link">
        <div>
    
  </div>
        <router-link id="link" to="/edit"><i class="fas fa-user"></i></router-link>
        <router-link id="link" to="/categories">MINHAS CATEGORIAS</router-link>
        <router-link id="link" to="/payments">FORMAS DE PAGAMENTO</router-link>  
        <router-link id="link" to="/summary">MINHAS RENDAS</router-link> 
        <router-link id="link" to="#">INVESTIMENTOS</router-link> 
        <router-link id="link" to="control">CONTROLE</router-link>   
        <router-link id="link" @click="logout" to="/login">sair</router-link> 
      </nav>
      <nav id="area-menu">
        <div id="months" class="columns is-mobile">
          <select v-model="selectedYear" id="yearSelect" class="input-year">
            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
          </select>
          
          <div v-for="(month, index) in months" @click="selectExpenses(index)" :key="index" class="column">
            {{ month }}
          </div>
        </div>
      </nav>
    </div>

    <div id="area-message">
      <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
      <div v-if="messageError" id="error">{{ messageError }}</div>
    </div>

    <div class="container">
      <h2 id="title" class="toggle" @click="toggleForm"><i class="fas fa-arrow-down"> </i>  ADICIONAR NOVA DESPESA </h2>

        <div v-show="showForm">
          <label>Descrição</label>
          <input id="input" class="input" type="text" v-model="description">
          <label>Valor - R$</label>
          <input id="input" class="input" type="text" v-model="amount">
          <label>Dia para pagamento</label>
          <input id="input" class="input" type="number" v-model="day">
          <label for="">Forma de pagamento</label>
          <select v-model="selectedPayment" id="input" class="input">
            <option v-for="(payment, index) in payments" :key="index" :value="payment.payment_name">
              {{ payment.payment_name }}
            </option>
          </select>
          <label>Categoria</label>
          <select v-model="selectedCategory" id="input" class="input">
            <option v-for="(category, index) in categories" :key="index" :value="category.category_name">
             {{ category.category_name }}
            </option>
          </select> 
          <label>Numero de parcelas</label>
          <input id="input" class="input" type="text" v-model="installment_number">
          <label>Valor da parcelas</label>
          <input id="input" class="input" type="text" v-model="installment_amount">
          
          <div id="center">
            <button id="button-success" @click="createExpense()">Adicionar</button>
          </div>
          
        </div>
      </div>
      <div>
        <div id="center">
          <h2 id="subtitle" class="title is-3">DESPESAS</h2>
        </div>
        
        <table>
          <thead>
            <tr class="columns is-mobile">
              <th class="column">Data</th>
              <th class="column">Descrição</th>
              <th class="column">Valor</th>
              <th class="column">Forma de Pagamento</th>
              <th class="column"> Categoria </th>
              <th class="column">Numero de Parcelas</th>
              <th class="column">Valor das parcelas</th>
            </tr>
          </thead> <br>
          <tbody>
            <tr class="columns is-miobile" v-for="(expense, index) in expenses" :key="index">
              <td class="column">{{ expense.day }}/{{ expense.month }}/{{ expense.year }}</td>
              <td class="column">{{ expense.description }}</td>
              <td class="column">{{ expense.amount }}</td>
              <td class="column">{{ expense.payment_name }}</td>
              <td class="column">{{ expense.category_name }}</td>
              <td class="column">{{ expense.installment_number }}</td>
              <td class="column">{{ expense.installment_amount }}</td>
            </tr>
          </tbody> <br>
          <thead >
            <tr class="columns is-mobile">
              <th class="column">Data</th>
              <th class="column">Descrição</th>
              <th class="column">TOTAL</th>
              <th class="column">Pagamento</th>
              <th class="column">Categoria</th>
              <th class="column">Parcelas</th>
              <th class="column">TOTAL</th>
            </tr>
          </thead> <br>
          <tfoot>
            <tr class="columns is-mobile">
              <th class="column">--</th>
              <th class="column">--</th>
              <th class="column"><strong id="valueRed">{{ totalAmount }}</strong></th>
              <th class="column">--</th>
              <th class="column">--</th>
              <th class="column">--</th>
              <th class="column">--</th>
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

        showForm: false, // mostrar o formulario para adicionar despesa

        amount: '', // valor
        day: '', // dia
        selectedMonth: null, // mes
        selectedYear: null, // ano
        description: '',
        selectedPayment: null,
        selectedCategory: null,
        category: '',
        installment_number: '',
        installment_amount: '',

        categories: [],
        payments: [],

        expenses: [],

        messageSuccess: '',
        messageError: '',

        years: Array.from({ length: 78 }, (_, index) => 2023 + index),
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    };
  },
  computed: {
    totalAmount() {
      return this.expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2);
    }
  },
  created() {
    this.listCategories(),
    this.listPayments()
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },
    logout() {
        localStorage.removeItem('token');
    },
    createExpense() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      const data = {
        amount: this.amount,
        day: this.day,
        month: this.selectedMonth,
        year: this.selectedYear,
        description: this.description,
        payment: this.selectedPayment,
        category: this.selectedCategory,
        installment_number: this.installment_number,
        installment_amount: this.installment_amount
      }
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.post(`http://localhost:4000/expenses/${this.userId}`, data, req)
            .then(res => {
              this.messageSuccess = res.data.message
                    setTimeout(() => {
                        this.messageSuccess = '';
                        window.location.reload()
                    }, 2000);
            })
            .catch(error => {
              this.messageError = error.response.data.message
                    setTimeout(() => {
                        this.messageError = '';
                    }, 2000);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectExpenses(index) {
        var req = {
            headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
            }, 
            params: {
            year: this.selectedYear,
            month: this.selectedMonth = index + 1
        }
      };
      // PEGAR TODAS AS DESPESAS
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/expenses/${this.userId}`, req)
            .then(res => {
              this.expenses = res.data.message
            })
            .catch(error => {
              this.messageError = error.response.data.message
                    setTimeout(() => {
                        this.messageError = '';
                    }, 2000);
            });
        })
        .catch(err => {
          console.log(err);
        });
      },
      // LISTA DE PAGAMENTOS
      listPayments() {
        var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/payments/${this.userId}`, req)
            .then(res => {
                this.payments = res.data.message
              
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    listCategories() {
        var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/categories/${this.userId}`, req)
            .then(res => {
              console.log(res.data.message)
              this.categories = res.data.message;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
}
};

</script>

<style>
@import '../assets/global.css';
</style>