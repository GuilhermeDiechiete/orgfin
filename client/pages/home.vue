<template>
    <section class="container is-max-desktop p-5">

        <div v-if="validatedUser">

            <user-info-box :email="userEmail"></user-info-box>

            <MessageSuccess :message="messageSuccess"/>
            <MessageError :message="messageError"/>

            <!-- MOSTRAR E OCULTAR FORMULARIO DE NOVA TRANSAÇÃO -->
            <button class="button is-fullwidth bg-orangered text-white my-4" @click="showFormTransaction()">
                <i class="fa-solid fa-share-from-square fa-flip mr-3" style="--fa-animation-duration: 3s;"></i> Nova Transação
            </button>

           <!-- FORMULARIO DE NOVA TRANSAÇÃO-->
            <div v-if="statusFormTransaction">
                <transaction-form/>
            </div>
        

            <!-- CONTROLE ENTRE O CONTROLE MENSAL E ANUAL -->
            <div class="tabs is-toggle is-fullwidth my-4">
                <ul>
                    <li :class="{'is-active-orangered': activeTable === 'monthly'}" @click="selectedTable('monthly')"><a>Resumo Mensal</a></li>
                    <li :class="{'is-active-orangered': activeTable === 'yearly' }" @click="selectedTable('yearly')"><a>Resumo Anual</a></li>
                </ul>
            </div>

            <!--CONTROLE MENSAL-->
            <div v-if="activeTable === 'monthly'" >

                <!-- CAMPOS DE BUSCAS PARA O CONTROLE MENSAL-->
                <div class=" box has-background-black-ter mb-5 has-text-centered p-2">

                    <button class="button bg-orangered text-white m-1"  @click="showFormCategory">Categorias</button>

                    <div class="select m-1">
                        <select v-model="selectedMonth" >
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
                        <select v-model="selectedYear">
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    <button class="button bg-orangered text-blue m-1" @click="searchTransactionsByMonth">
                        <i class="fa-solid fa-magnifying-glass fa-flip" style="--fa-animation-duration : 3s;"></i>
                    </button>
                </div>

                <!--FORMULARIO DE NOVA CATEGORIA -->
                <div v-if="statusFormCategory" class="box has-background-black-ter has-text-centered">
                    <category-form/>
                </div>


                <!-- BOTOES DE BUSCA ENTRE DESPESAS, RENDA E INVESTIMENTOS -->
                <div class="columns is-desktop">

                    <div class="box column has-background-black-ter m-3" @click="selectedTableType('expenses')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration : 3s;"></i>
                            Despesas
                        </h1>
                        <h2 class="title is-4 has-text-centered is-vcentered">
                            <span class="box p-3 m-2 has-background-black-bis text-white">R$ {{ valueTotalExpenseAPI }}</span>
                        </h2>
                    </div>

                    <div class=" box column is-vcentered has-background-black-ter m-3" @click="selectedTableType('incomes')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;" ></i>
                            Renda
                        </h1>
                        <h2 class="title is-4 text-white has-text-centered">
                            <span class="box p-3 m-2 has-background-black-bis text-white">R$ {{ valueTotalIncomesAPI }}</span>
                        </h2>
                    </div>
                    
                    <div class=" box column is-vcentered has-background-black-ter m-3" @click="selectedTableType('investments')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;"></i>
                            Investimentos
                        </h1>
                        <h2 class="title is-4 text-white has-text-centered">
                            <span class="box p-3 m-2 has-background-black-bis text-white">R$ {{ valueTotalInvestmentsAPI }}</span>
                        </h2>  
                    </div>
                </div>     
                
                
            <!-- TABELA -->
            <div class="box has-background-black-ter">
                <div class="table-container">
                    <div class="box has-background-black-bis">
                        <h1 class="title is-5 text-orangered has-text-centered">
                            Resumo de {{ titleTable }}
                        </h1>
                    </div>
                    <table class="table is-bordered is-fullwidth has-background-black-ter has-text-centered has-text-info-light" style="min-width: 800px;">

                        <thead-table/>
                        <tbody-table :info="valueTable"/>
                    </table>
                </div>  
            </div>

      

        
    </div>


            <div v-if="activeTable === 'yearly'" class="box has-text-centered is-vcentered">
                <div class="box">
                    <div class="select">
                        <select>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <button class="button is-success"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>  
        </div>
        <div v-else>
            <div class="box"><h1>Não foi possivel entrar no aplicativo, tente novamente mais tarde.</h1></div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({

    data() {
        return {
            validatedUser: false, // no metodo getUser precisa vir o email e id do usuário para liberar a aplicação

            // status de visualização de formularios
            statusFormTransaction: false,
            statusFormCategory: false,

            // controladores de navegação entre o painel mensal e anual
            activeTable: 'monthly',

            // parametros de busca
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,

            // armazenamento de mensagens de sucesso e erro
            messageSuccess: '',
            messageError: '',

            

            // informações do usuário
            userEmail: '-----',
            userId: -1,

            
            valueTable: {}, // armazena valores de expensesAPI, incomesAPI ou investmentsAPI
            titleTable: '',
            // APIS
            expensesAPI: {}, // armazena todas as despesas de um mes selecionado
            incomesAPI: [], // armazena todas as rendas de um mes selecionado
            investmentsAPI: [], // armazena todos os investimentos de um mes selecionado
            valueTotalExpenseAPI: '',  // armazena apenas o valor total das despesas do mes selecionado
            valueTotalIncomesAPI: '', // armazena apenas o valor total das rendas do mes selecionado
            valueTotalInvestmentsAPI: '', // armazena apenas o valor total de investimentos do mes selecionado

            


        }
    },
    mounted() {
        this.getUser()
        this.searchTransactionsByMonth()
    },
    
    methods: {
        
        // pega as informações do usuário - email e id 
        async getUser() {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://127.0.0.1:4000/user`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                }); 

                this.userEmail = response.data.data.email
                this.userId = response.data.data.id

                if(this.userEmail && this.userId) {
                   this.validatedUser = true 
                }
            } catch (error:any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },

        // metodos dos controladores de navegação
        selectedTable(table: string) {
            this.activeTable = table
        },
        selectedTableType(type: string) {

            if(type === 'investments'){
                this.valueTable = this.investmentsAPI
                this.titleTable = 'Investimentos'
            } else if(type === 'incomes') {
                this.valueTable = this.incomesAPI
                this.titleTable = 'Rendas'
            } else {
                this.valueTable = this.expensesAPI
                this.titleTable = 'Despesas'
            }
        },

        // metodos do formulario de criação de transação
        showFormTransaction() {
            this.statusFormTransaction = !this.statusFormTransaction
        },
        showFormCategory() {
            this.statusFormCategory = !this.statusFormCategory
        },

        async searchTransactionsByMonth() {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://127.0.0.1:4000/gettransactions/${this.selectedYear}/${this.selectedMonth}`,

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })

                // result 
                this.expensesAPI = response.data.expenses
                this.incomesAPI = response.data.incomes 
                this.investmentsAPI = response.data.investments
                
                this.messageSuccess = response.data.message
                this.statusFormTransaction = false
                this.searchTotalTransactionsByMonth() // faz uma nova requisição do total dos valores
                this.selectedTableType('expenses')
                
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

                const response = await axios.get(`http://127.0.0.1:4000/gettransactions/total/${this.selectedYear}/${this.selectedMonth}`,

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.valueTotalExpenseAPI = response.data.totalExpenses
                this.valueTotalIncomesAPI = response.data.totalIncomes 
                this.valueTotalInvestmentsAPI = response.data.totalInvestments 

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
