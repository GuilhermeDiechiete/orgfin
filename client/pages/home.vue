<template>
    <section class="container box">

        <div class="box">
            <div class="columns">
                <div class="column">
                    <h1 class="mb-1 title is-6"><i class="fa-solid fa-user text-orangered"></i> Guilherme Diechiete da Silva</h1>
                    <h2><i class="fa-solid fa-user-tie text-orangered"></i> Desenvolvedor de Software</h2>
                </div>
                <div class="column">

                </div>
                <div class="column">
                    <i class="fa-solid fa-gear"></i>
                    <i class="fa-solid fa-circle-info"></i>
                </div>
            </div>
            

            <div class="columns">
                
                <div class="box m-3 column">
                    <h1>Despesas</h1>
                    <p>R$ {{ valueTotalExpenseAPI }}</p>
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered" style="--fa-animation-duration : 3s;" ></i>
                </div>
                <div class=" box m-3 column">
                    <h1>Renda</h1>
                    <p>R$ 7.000</p>
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered" style="--fa-animation-duration: 3s;" ></i>
                </div>
                <div class=" box m-3 column">
                    <h1>Investimentos</h1>
                    <p>R$ 3.000</p>
                    <i class="fa-solid fa-money-check-dollar fa-flip text-orangered" style="--fa-animation-duration: 3s;" ></i>
                </div>
            </div>     
        </div>
            <!-- BOX RESPONSIBLE FOR CREATING TRANSACTIONS-->
        <div>

            <button class="button my-4 is-fullwidth bg-orangered text-white" @click="showFormTransaction()">
                <i class="fa-solid fa-share-from-square fa-flip" style="--fa-animation-duration: 3s;"></i> Nova Transação
            </button>

            <div v-if="activeFormTransaction">

                <div class="box mb-3">
                    <form action="" method="post" @submit.prevent="createdTransaction">

                        <select v-model="type" class="input mb-2">
                            <option value="expense">Selecione o tipo de transação</option>
                            <option value="expense">Despesa</option>
                            <option value="income">Renda</option>
                            <option value="investment">Investimento</option>
                        </select>

                        <input v-model="month" type="text" class="input mb-2" placeholder="Mês da transação.">
                        <input v-model="year" type="text" class="input mb-2" placeholder="Ano da transação.">
                        <input v-model="description" type="text" class="input mb-2" placeholder="Descrição.">
                        <input v-model="amount" type="text" class="input mb-2" placeholder="R$: Valor.">
                        <input v-model="category" type="text" class="input mb-2" placeholder="Categoria">
                        <input v-model="destiny" type="text" class="input mb-2" placeholder="Destino do valor">

                        <button type="submit" class="button is-fullwidth is-success">Criar</button>
                    </form> 
                </div>   
            </div>
        </div>

        <!-- SELECT TABLE MONTH OR YEAR-->
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li :class="{'is-active': activeTable === 'monthly'}" @click="selectedTable('monthly')"><a>Mensal</a></li>
                <li :class="{'is-active': activeTable === 'yearly' }" @click="selectedTable('yearly')"><a>Anual</a></li>
            </ul>
        </div>

        <div v-if="activeTable === 'monthly'" class="box has-text-centered is-vcentered">

        <div class="box">

            <h1 class="title is-4">Controle Mensal</h1>
            
            <div class="select">
                <select v-model="selectedMonth">
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                </select>
            </div>
            <div class="select">
                <select v-model="selectedYear">
                    <option value="2024">2024</option>
                </select>
            </div>
            <button class="button is-success" @click="searchTransactionsByMonth">
                <i class="fa-solid fa-magnifying-glass fa-flip" style="--fa-animation-duration : 3s;"></i>
            </button>
        </div>
                
                

        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li :class="{'is-active': activeTableType === 'expenses'}" @click="selectedTableType('expenses')">
                    <a><strong><i class="fa-solid fa-arrow-down-long"></i></strong>Despesas</a>
                </li>

                <li :class="{'is-active': activeTableType === 'incomes' }" @click="selectedTableType('incomes')">
                    <a><strong><i class="fa-solid fa-arrow-up-long"></i></strong> Rendas</a>
                </li>
                <li :class="{'is-active': activeTableType === 'investments' }" @click="selectedTableType('investments')">
                    <a><strong><i class="fa-solid fa-arrow-up-right-dots"></i></strong>Investimentos</a>
                </li>
            </ul>
        </div>

        <div v-if="activeTableType === 'expenses'" class="box">
            <h1 class="title is-4">Despesas do mes de {{ selectedMonth }}</h1>

            <div class="table-container">
            <br>
            
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr class="columns m-1">
                        <th class="column"><i class="fa-solid fa-calendar-days"></i> Data</th>
                        <th class="column"><i class="fa-solid fa-pen"></i> Descrição</th>
                        <th class="column"><i class="fa-solid fa-brazilian-real-sign"></i> Valor</th>
                        <th class="column"><i class="fa-solid fa-boxes-stacked"></i> Categoria</th>
                        <th class="column"><i class="fa-solid fa-paper-plane"></i> Destino</th>
                        <th class="column"><i class="fa-solid fa-signal"></i> Status</th>
                    </tr> 
                </thead> 
                <tbody v-for="expense in expensesAPI" :key="expense.id">
                    <tr class="columns m-1">
                        <td class="column">{{ expense.month }} / {{ expense.year }}</td>
                        <td class="column">{{ expense.description }}</td>
                        <td class="column">{{ expense.amount }}</td>
                        <td class="column">{{ expense.category }}</td>
                        <td class="column">{{ expense.destiny }}</td>
                        <td class="column is-danger">
                            <span v-if="expense.status === false">
                                Pendente
                            </span>
                            <span v-else-if="expense.status === true" class="is-success">
                                Pago
                            </span>
                        </td>
                    </tr> 
                </tbody> 
            </table>
        </div>  
    </div>

    <div v-if="activeTableType === 'incomes'" class="box">
        <h1 class="title is-4">Rendas do mês de {{ selectedMonth }}</h1>

        <div class="table-container"><br>
            
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr class="columns m-1">
                        <th class="column">Data</th>
                        <th class="column">Descrição</th>
                        <th class="column">Valor</th>
                        <th class="column">Categoria</th>
                        <th class="column">Destino</th>
                        <th class="column">Status</th>
                    </tr> 
                </thead> 
                <tbody v-for="income in incomesAPI" :key="income.id">
                    <tr class="columns m-1">
                        <td class="column">{{ income.month }} / {{ income.year }}</td>
                        <td class="column">{{ income.description }}</td>
                        <td class="column">{{ income.amount }}</td>
                        <td class="column">{{ income.category }}</td>
                        <td class="column">{{ income.destiny }}</td>
                        <td class="column is-danger">
                            <span v-if="income.status === false">
                                Pendente
                            </span>
                            <span v-else-if="income.status === true" class="is-success">
                                Pago
                            </span>
                        </td>
                    </tr> 
                </tbody> 
            </table>
        </div>  
    </div>

    <div v-if="activeTableType === 'investments'" class="box">
        <h1 class="title is-4">Investimentos do mês de {{ selectedMonth }}</h1>

        <div class="table-container"><br>
            
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr class="columns m-1">
                        <th class="column">Data</th>
                        <th class="column">Descrição</th>
                        <th class="column">Valor</th>
                        <th class="column">Categoria</th>
                        <th class="column">Destino</th>
                        <th class="column">Status</th>
                    </tr> 
                </thead> 
                <tbody v-for="investment in investmentsAPI" :key="investment.id">
                    <tr class="columns m-1">
                        <td class="column">{{ investment.month }} / {{ investment.year }}</td>
                        <td class="column">{{ investment.description }}</td>
                        <td class="column">{{ investment.amount }}</td>
                        <td class="column">{{ investment.category }}</td>
                        <td class="column">{{ investment.destiny }}</td>
                        <td class="column is-danger">
                            <span v-if="investment.status === false">
                                Negativo
                            </span>
                            <span v-else-if="investment.status === true" class="is-success">
                                Positivo
                            </span>
                        </td>
                    </tr> 
                </tbody> 
            </table>
        </div> 
    </div>
</div>


        <div v-if="activeTable === 'yearly'" class="box has-text-centered is-vcentered">
            <h1 class="title is-4">Controle Anual</h1>

            <div class="box">
                <div class="select">
                    <select>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <button class="button is-success"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>

    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({

    data() {
        return {
            // controladores de navegação
            activeFormTransaction: false,
            activeTable: '',
            activeTableType: 'expenses',

            // formulario de criação de transação
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            type: 'expense' || 'income' || 'investment',
            description: '',
            amount: 0,
            category: '',
            destiny: '',
            status: false,

            // parametros de busca
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,

            expensesAPI: {},
            incomesAPI: [],
            investmentsAPI: [],
            valueTotalExpenseAPI: '',

            // mensageria
            messageSuccess: '',
            messageError: '',


        }
    },
    mounted() {
        this.searchTotalTransactionsByMonth();
    },
    
    methods: {
        // metodos dos controladores de navegação
        selectedTable(table: string) {
            this.activeTable = table
        },
        selectedTableType(type: string) {
            this.activeTableType = type
        },

        // metodos do formulario de criação de transação
        showFormTransaction() {
            this.activeFormTransaction = !this.activeFormTransaction
        },
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
                    this.activeFormTransaction = false
                }, 1000)

            } catch (error: any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                    this.activeFormTransaction = false
                }, 2000);

            }  
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
                this.expensesAPI = response.data.expenses
                this.incomesAPI = response.data.incomes 
                this.investmentsAPI = response.data.investments

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
                
            } catch (error) {
                
            }
        }

        
    }
})



</script>
