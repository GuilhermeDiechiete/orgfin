<template>
    <div class="box p-2 has-background-black-bis">

        <message-error :message="messageError"/>
        <message-success :message="messageSuccess"/>

        <button class="button is-fullwidth bg-orangered text-white my-4" @click="showFormTransaction()">Nova Transação</button>
        <transaction-form v-if="statusFormTransaction"/>

        <div class="box p-2 has-background-black-ter">
            <div class="select m-1">
                <select v-model="month" >
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
            </div>

            <div class="select m-1">
                <select v-model="year">
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                </select>
            </div>

            <button class="button bg-orangered m-1" @click="searchTransactionsByMonth" >Buscar</button>
        </div>

        <div class="columns is-desktop">

            <div class="box column has-background-black-ter m-3 p-2" @click="selectedTableType('output')">
                <h1 class="title is-5 text-orangered mb-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration:3s;"></i>
                    Saídas
                </h1>
                <h2 class="title is-5 has-text-centered is-vcentered">
                    <span class="box p-2 mx-5 has-background-black-bis text-white">R$ {{ valueTotalOutputsAPI }}</span>
                </h2>
            </div>

            <div class=" box column is-vcentered has-background-black-ter m-3  p-2" @click="selectedTableType('input')">
                <h1 class="title is-5 text-orangered mb-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;" ></i>
                    Entradas
                </h1>
                <h2 class="title is-5 text-white has-text-centered">
                    <span class="box p-2 mx-5 has-background-black-bis text-white">R$ {{ valueTotalInputsAPI }}</span>
                </h2>
            </div>

            <div class=" box column is-vcentered has-background-black-ter m-3  p-2" @click="selectedTableType('investments')">
                <h1 class="title is-5 text-orangered mb-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;"></i>
                    Investimentos
                </h1>
                <h2 class="title is-5 text-white has-text-centered">
                    <span class="box p-2 mx-5 has-background-black-bis text-white">R$ {{ valueTotalInvestmentsAPI }}</span>
                </h2>  
            </div>
        </div>  

        <div class="box has-background-black-ter">
                <div class="table-container">
                    <title-table-transaction/>
                    <table class="table is-bordered is-fullwidth has-background-black-ter has-text-centered has-text-info-light" style="min-width: 900px;">
                        <thead-table-transaction :title="titleTable"/>
                        <tbody-table-transaction :transactions="infoTransaction"/>
                    </table>
                </div>  
            </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
    data() {
        return {
            statusFormTransaction: false,

            month: new Date().getFullYear(),
            year: new Date().getMonth() + 1,

            // armazenamento de mensagens de sucesso e erro
            messageSuccess: '',
            messageError: '',

            infoTransaction: [], // armazena valores de expensesAPI, incomesAPI ou investmentsAPI
            titleTable: '',
            // APIS
            outputsAPI: [], // armazena todas as despesas de um mes selecionado
            inputsAPI: [], // armazena todas as rendas de um mes selecionado
            investmentsAPI: [], // armazena todos os investimentos de um mes selecionado

            valueTotalOutputsAPI: '',  // armazena apenas o valor total das despesas do mes selecionado
            valueTotalInputsAPI: '', // armazena apenas o valor total das rendas do mes selecionado
            valueTotalInvestmentsAPI: '', // armazena apenas o valor total de investimentos do mes selecionado

            


        }
    },

    mounted() {
        this.searchTransactionsByMonth()
        this.searchTotalTransactionsByMonth()
    },
    
    methods: {
        selectedTableType(type: string) {

            if(type === 'investments'){
                this.infoTransaction = this.investmentsAPI
                this.titleTable = 'Resumo de Investimentos'
            } else if(type === 'input') {
                this.infoTransaction = this.inputsAPI
                this.titleTable = 'Resumo de entradas'
            } else {
                this.infoTransaction = this.outputsAPI
                this.titleTable = 'Resumo de Saídas'
            }
        },

        // metodos do formulario de criação de transação
        showFormTransaction() {
            this.statusFormTransaction = !this.statusFormTransaction
        },

        async searchTransactionsByMonth() {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://127.0.0.1:4000/gettransactions/${this.year}/${this.month}`,

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })

                // result 
                this.outputsAPI = response.data.outputs
                this.inputsAPI = response.data.inputs
                this.investmentsAPI = response.data.investments
                
                this.messageSuccess = response.data.message
                this.statusFormTransaction = false

                this.searchTotalTransactionsByMonth() // faz uma nova requisição do total dos valores
                
                
                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)

            } catch (error: any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },
        async searchTotalTransactionsByMonth() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.get(`http://127.0.0.1:4000/gettransactions/total/${this.year}/${this.month}`,

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.valueTotalOutputsAPI = response.data.totalExpenses
                this.valueTotalInputsAPI = response.data.totalIncomes
                this.valueTotalInvestmentsAPI = response.data.totalInvestments 
                this.selectedTableType('outputs')

                this.messageSuccess = response.data.message
                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)
                
            } catch (error: any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },
        

        
    }
})



</script>
