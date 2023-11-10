<template>
  <div class="container">
    <div>

      <router-link to="/painel" id="link"><i class="fas fa-arrow-left"></i></router-link>
      <div id="center">
        <h1 id="title" class="title is-1">Formas de Pagamento</h1>
      </div>
            
      <div id="area-message">
        <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
        <div v-if="messageError" id="error">{{ messageError }}</div>
      </div>

      <form class="form">
        <div>
          <label id="subtitle" class="title is-4">Criar nova forma de pagamento</label>
        </div><br>
          <label for="">Nome</label>
          <input id="input" v-model="name" type="text" class="input" />
          <label for="">Descrição</label>
          <input id="input" v-model="description" type="text" class="input" />
          <label for="">Limite</label>
          <input id="input" v-model="limit" type="text" class="input" />
      </form>

      <div id="center">
        <button @click="createPayments" id="button-success">Criar</button>
      </div><br>

      <div>
        <table>
          <thead>
            <tr>
              <th>Nome do Pagamento</th>
              <th>Descrição</th>
              <th>Limite</th>
              <th>Opções</th>
            </tr>
          </thead> <br>
          <tbody>
            <tr v-for="(payment, index) in payments" :key="index">
              <td>{{ payment.payment_name }}</td>
              <td>{{ payment.description }}</td>
              <td>{{ payment.limit }}</td>
              <td>
                <button id="button-danger">Deletar</button>
              </td>      
            </tr>  
          </tbody>
        </table>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      name: '',
      description: '',
      limit: '',
      paymentId: -1,
      payments: [],

      messageSuccess: '',
      messageError: ''
    };
  },
  created() {
    this.listPayments()
  },
  methods: {
    createPayments() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      const data = {
        name: this.name,
        description: this.description,
        limit: this.limit
      }
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.post(`http://localhost:4000/payments/${this.userId}`, data, req)
            .then(res => {
                this.messageSuccess = res.data.message
                    setTimeout(() => {
                        this.messageSuccess = '';
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
                console.log(res.data.message)
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
    
    
  }
};
</script>


<style>
@import '../assets/global.css';
</style>