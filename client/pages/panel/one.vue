<template>
    <div class="box has-text-centered ">
        <h1 class="title is-6">CONTROLE FINANCEIRO</h1>
        
        <!--menu controle-->
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li class="is-active"><a @click="show_expenses">Despesas</a></li>
                <li><a @click="show_income">Renda</a></li>
                <li><a @click="show_investments">Investimentos</a></li>
            </ul>
        </div>

        <!-- PAINEL DE DESPESAS-->

        <div class="box" v-if="status_expenses">

            <h1 class="title is-5">Controle de despesas</h1>
            
            <div class="tabs is-toggle is-fullwidth">
                <ul>
                    <li class="is-active"><a @click="show_monthPanel"> Controle Mensal </a></li>
                    <li> <a @click="show_annualPanel"> Controle Anual </a></li>
                </ul>
            </div>

            <div class="box" v-if="status_monthPanel">
                
                <div class="box notification is-danger" v-if="messageError.length > 0">
                    {{ messageError }}
                </div>
                <div class="box notification is-success" v-if="messageSuccess.length > 0">
                    {{ messageSuccess }}
                </div>

                <div>
                    <button @click="show_formExpense" class="button is-info m-1">Adicionar despesa</button>

                    <div class="select m-1">
                        <select v-model="year">
                            <option value="">Selecione o ano</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>
                    <div class="select m-1">
                        <select v-model="month">
                            <option value="">Selecione o mês</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <button class="button is-success m-1" @click="showExpensesByMonth">Buscar</button>
                </div>

                <div class="box" v-if="status_formExpense">
                    <form action="" method="post">
                        <input class="input m-1" type="text" v-model="year_expense" placeholder="Ano">
                        <input class="input m-1" type="text" v-model="month_expense" placeholder="Mês">
                        <input class="input m-1" type="text" v-model="name_expense" placeholder="Nome da despesa">
                        <input class="input m-1" type="text" v-model="value_expense" placeholder="Valor da despesa">
                        <input class="input m-1" type="text" v-model="payment_expense" placeholder="Forma de pagamento">
                        <input class="input m-1" type="text" v-model="category_expense" placeholder="Categoria da despesa">
                        <input class="input m-1" type="text" v-model="installments_expense" placeholder="Quantidade de parcelas">
                    </form>
                    <button class="button is-success m-1" @click="createExpense">Criar</button>
                </div>

                



                
                
                <table class="box has-text-centered">
                    <thead class="box has-text-centered">
                        <tr class="columns is-mobile">
                            <th class="column">Nome</th>
                            <th class="column">Valor</th>
                            <th class="column">Pagamento</th>
                            <th class="column">Categoria</th>
                            <th class="column">Parcelas</th>
                            <th class="column">Valor da parcela</th>
                            <th class="column">Status</th>
                            <th class="column">Operações</th>
                        </tr>
                    </thead>
                    <tbody class="box has-text-centered" v-for="expenses in expensesArray" :key="expenses.id">
                        <tr v-for="expense in expenses" :key="expense.id" class="columns is-mobile">
                            <td class="column">{{ expense.name }}</td>
                            <td class="column">{{ expense.value }}</td>
                            <td class="column">{{ expense.payment }}</td>
                            <td class="column">{{ expense.category }}</td>
                            <td class="column">{{ expense.installments }}</td>
                            <td class="column">{{ expense.value_installment }}</td>
                            <td class="column">{{ expense.status }}</td>
                            <div class="column">
                                <button class="button is-danger">Excluir</button>
                            </div>
                        </tr> <br>
                        <tr class="columns" v-for="value in valueTotalByMonth" :key="value">
                            <td class="column">TOTAL:</td>
                            <td class="column">{{ value }}</td>
                            <td class="column"></td>
                            <td class="column"></td>
                            <td class="column"></td>
                            <td class="column"></td>
                            <td class="column"></td>
                        </tr>
                    </tbody>
                </table>   
            </div>    
        </div>

        <div v-if="status_annualPanel">
            <h1>painel anual</h1>
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'


export default Vue.extend({
   
    data() {
        return {
            status_expenses: true,
            status_income: false, 
            status_investments: false,

            year_expense: '',
            month_expense: '',
            name_expense: '',
            value_expense: '',
            payment_expense: '',
            category_expense: '',
            installments_expense:'',

            status_formExpense: false,

            status_annualPanel: false,
            status_monthPanel: true,

            year: '',
            month: '',

            expensesArray: [] ,
            valueTotalByMonth: {},
            messageSuccess: '',
            messageError: ''

        }
    },
    
    methods: {
        show_formExpense() {
            this.status_formExpense = !this.status_formExpense
        },
        show_expenses() {
            this.status_expenses = true 
            this.status_income = false 
            this.status_investments = false
        },
        show_income() {
            this.status_expenses = false 
            this.status_income = true 
            this.status_investments = false
        },
        show_investments() {
            this.status_expenses = false
            this.status_income = false 
            this.status_investments = true
        },
        show_annualPanel() {
            this.status_monthPanel = false
            this.status_annualPanel = true
        },
        show_monthPanel() {
            this.status_annualPanel = false
            this.status_monthPanel = true
        },
        async createExpense() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.post(`http://127.0.0.1:4000/expenses`,{
                    year: this.year_expense,
                    month: this.month_expense,
                    name: this.name_expense,
                    value: this.value_expense,
                    payment: this.payment_expense,
                    category: this.category_expense,
                    installments: this.installments_expense
                }, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                this.messageSuccess = await response.data.message
                setTimeout(() => {
                this.messageSuccess = '';
                }, 2000);
            } catch (error: any) {
                this.messageError = error.response.data.message;
                setTimeout(() => {
                this.messageError = '';
                }, 2000);
            }
        },
        async showExpensesByMonth() {
            try {
                const token = localStorage.getItem('userToken');
               
                const response = await axios.get(`http://127.0.0.1:4000/panel/${this.year}/${this.month}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                this.expensesArray = await response.data.data.organizedExpenses
                this.valueTotalByMonth = await response.data.data.valueTotalByMonth

                this.messageSuccess = await response.data.message
                setTimeout(() => {
                this.messageSuccess = '';
                }, 2000);
            
            } catch (error: any) {
                this.messageError = error.response.data.message;
                setTimeout(() => {
                this.messageError = '';
                }, 2000);
            }
        }
    }
})



</script>

