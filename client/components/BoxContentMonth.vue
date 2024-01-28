<template>
    <div class="box bg-black-nv3">

        <div class="box p-2 has-text-centered bg-black-nv2">
            <div class="select m-1 ">
                <select v-model="month" class="">
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

            <div class="select m-1 ">
                <select v-model="year">
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                </select>
            </div>

            <button class="button bg-orangered m-1" @click="searchTransactionsByMonth" >Buscar</button>
        </div>

        <message-error :message="messageError"/>
        <message-success :message="messageSuccess"/>

        <div class="columns is-desktop">

            <div class="box column m-3 p-2 bg-black-nv2 has-text-centered" @click="selectedTableType('output')">
                <h1 class="title is-5 text-orangered my-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration:3s;"></i>
                    Saídas
                </h1>
                <h2 class="title is-5 has-text-centered is-vcentered">
                    <span class="box p-2 mx-5 mb-4 bg-black-nv3 text-white">R$ {{ valueTotalOutputsAPI }}</span>
                </h2>
            </div>

            <div class=" box column is-vcentered m-3 p-2 bg-black-nv2 has-text-centered" @click="selectedTableType('input')">
                <h1 class="title is-5 text-orangered my-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;" ></i>
                    Entradas
                </h1>
                <h2 class="title is-5 text-white has-text-centered">
                    <span class="box p-2 mx-5 mb-4 bg-black-nv3 text-white">R$ {{ valueTotalInputsAPI }}</span>
                </h2>
            </div>

            <div class=" box column is-vcentered m-3  p-2 bg-black-nv2 has-text-centered" @click="selectedTableType('investments')">
                <h1 class="title is-5 text-orangered my-2">
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;"></i>
                    Investimentos
                </h1>
                <h2 class="title is-5 text-white has-text-centered">
                    <span class="box p-2 mx-5 mb-4 bg-black-nv3 text-white">R$ {{ valueTotalInvestmentsAPI }}</span>
                </h2>  
            </div>
        </div>  

        <div class="box bg-black-nv2">
            
                <div class="table-container">

                    <h1 class=" mb-5 has-text-centered text-orangered"> {{ titleTable }} </h1>
                    <table class="table is-bordered is-fullwidth has-text-centered" style="min-width: 850px;">
                        
                        
                        <thead-table-transaction/>
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

            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),

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
