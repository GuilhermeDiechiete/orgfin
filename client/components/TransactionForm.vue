<template>
    <div class="box has-background-black-ter">
      <form @submit.prevent="createdTransaction">
  
        <select v-model="month" class="input mb-2 has-background-dark text-white">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>
  
        <input v-model="year" type="text" class="input mb-2 has-background-dark text-white" placeholder="Ano da transação">

        <input v-model="description" type="text" class="input mb-2 has-background-dark text-white" placeholder="Descrição">

        <input v-model="amount" type="text" class="input mb-2 has-background-dark text-white" placeholder="Valor">

        <input v-model="category" type="text" class="input mb-2 has-background-dark text-white" placeholder="Categoria">

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
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        type: 'expense' || 'income' || 'investment',
        description: 'Nova transação',
        amount: 99.99,
        category: 'Essenciais',
        destiny: 'Sicredi',
        status: false,
      };
    },
    methods: {
        async createdTransaction() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.post('http://127.0.0.1:4000/transaction', 
                
                {
                    month: this.month,
                    year: this.year,
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
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                    this.statusFormTransaction = false
                }, 2000);

            }  
        },
    }
  };
  </script>