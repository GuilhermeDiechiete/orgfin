<template>
    <div class="box">

      <message-error :message="messageError"/>
      <message-success :message="messageSuccess"/>

      <form @submit.prevent="createdTransaction">

        <input v-model="date" type="date" class="input mb-2">
        <input v-model="description" type="text" class="input mb-2" placeholder="Descrição">
        <input v-model="installment" type="number" class="input mb-2" placeholder="Parcela">
        <input v-model="max_installment" type="number" class="input mb-2" placeholder="Quantidade de Parcelas">
        <input v-model="amount" type="text" class="input mb-2" placeholder="Valor">

        <select v-model="type" class="input mb-2">
          <option value="output">Selecione o tipo de transação</option>
          <option value="output">Saida</option>
          <option value="input">Entrada</option>
          <option value="investment">Investimento</option>
        </select>

        <input v-model="local" type="text" class="input mb-2" placeholder="Local">

        <select v-model="category" class="input mb-2">
          <option value="normal">Selecione uma Categoria</option>
          <option v-for="item in categories" :key="item.id" :value="item.name">{{ item.name }}</option>
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
        description: '',
        installment: '',
        max_installment: '',
        amount: '',
        type: 'output' || 'input' || 'investment',
        local: '',
        category: '',
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
                    description: this.description,
                    installment: this.installment,
                    max_installment: this.max_installment,
                    amount: this.amount,
                    type: this.type,
                    local: this.local,
                    category: this.category,
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
              console.log(error)
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