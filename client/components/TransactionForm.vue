<template>
    <div class="box has-background-black-ter">

      <message-error :message="messageError"/>
      <message-success :message="messageSuccess"/>

      <form @submit.prevent="createdTransaction">

        <input v-model="date" type="date" class="input mb-2 has-background-dark text-white">
  
        <input v-model="description" type="text" class="input mb-2 has-background-dark text-white" placeholder="Descrição">

        <input v-model="amount" type="text" class="input mb-2 has-background-dark text-white" placeholder="Valor">


        <select v-model="category" class="input mb-2 has-background-dark text-white">
          <option v-for="item in categories" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>

        <input v-model="destiny" type="text" class="input mb-2 has-background-dark text-white" placeholder="Destino do valor">
  
        <select v-model="type" class="input mb-2 has-background-dark text-white">
          <option value="expense">Selecione o tipo de transação</option>
          <option value="expense">Despesa</option>
          <option value="income">Renda</option>
          <option value="investment">Investimento</option>
        </select>
  
        <button type="submit" class="button is-fullwidth is-success">Criar</button>
      </form>
    </div>
  </template>
  
  <script>
 import axios from 'axios'
 
  export default {
    data() {
      return {
        date: '',
        type: 'expense' || 'income' || 'investment',
        description: 'Nova transação',
        amount: 99.99,
        category: 'Essenciais',
        destiny: 'Sicredi',
        status: false,

        categories: {},

        messageSuccess: '',
        messageError: '',
      };
    },
    mounted() {
      this.getCategories()
    },
    methods: {
        async createdTransaction() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.post('http://127.0.0.1:4000/transaction', 
                
                {
                    date: this.date,
                    type: this.type,
                    description: this.description,
                    amount: this.amount,
                    category: this.category,
                    destiny: this.destiny,
                    status: this.status,
                }, 
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                this.messageSuccess = response.data.message

                setTimeout(() => {
                    this.messageSuccess = ''
                    this.statusFormTransaction = false
                }, 1000)

            } catch (error ) {
              const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);

            }  
        },
        async getCategories() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.get(`http://127.0.0.1:4000/categories`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.categories = response.data.data

                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)
            } catch (error) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        }
    }
  };
  </script>