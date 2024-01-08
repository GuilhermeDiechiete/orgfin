<template>
    <div>

        <nav class="box tabs is-toggle is-fullwidth">
            <ul>
                <li :class="{'is-active': contentSelectControl === 'expenses'}" @click="selectContentControl('expenses')"><a>Despesas</a></li>
                <li :class="{'is-active': contentSelectControl === 'incomes'}" @click="selectContentControl('incomes')"><a>Rendas</a></li>
                <li :class="{'is-active': contentSelectControl === 'investments'}" @click="selectContentControl('investments')"><a>Investimentos</a></li>
            </ul>
        </nav>


        <section v-if="contentSelectControl === 'expenses'" class="box is-centered">

        <div class=" tabs is-toggle is-fullwidth">
            <ul>
                <li :class="{'is-active': tableSelect === 'monthly'}" @click="selectTableExpenses('monthly')"><a>Mensal</a></li>
                <li :class="{'is-active': tableSelect === 'yearly'}" @click="selectTableExpenses('yearly')"><a>Anual</a></li>
            </ul>
        </div>


    <div v-if="tableSelect === 'monthly'"  >
    
        <div class="box has-text-centered">
            <button class="button is-info m-1" @click="show_formExpense" >Criar despesa</button>

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
            <div class="select m-1">
                <select>
                    <option value="">Ordem</option>
                    <option value="category">Categoria</option>
                    <option value="payment">Pagamento</option>
                    <option value="maturity">Vencimento</option>
                </select>
            </div>
            <button class="button is-success m-1" @click="showExpensesByMonth">Buscar</button>
        </div>

        <div v-if="messageError.length > 0" class="box notification is-danger" >
            {{ messageError }}
        </div>
        <div v-if="messageSuccess.length > 0" class="box notification is-success" >
            {{ messageSuccess }}
        </div>

        <div v-if="status_formExpense" class="box" >
            <form action="" method="post">
                <input v-model="year_expense" class="input m-1" type="text"  placeholder="Ano">
                <input v-model="month_expense" class="input m-1" type="text"  placeholder="Mês">
                <input v-model="name_expense" class="input m-1" type="text"  placeholder="Nome da despesa">
                <input v-model="value_expense" class="input m-1" type="text"  placeholder="Valor da despesa">
                <input v-model="payment_expense" class="input m-1" type="text"  placeholder="Forma de pagamento">
                <input v-model="category_expense" class="input m-1" type="text"  placeholder="Categoria da despesa">
                <input v-model="installments_expense" class="input m-1" type="text"  placeholder="Quantidade de parcelas">
            </form>
            <button class="button is-success m-1" @click="createExpense">Criar</button>
        </div>

        <div class="table-container" id="table-container">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                <th class="is-2 is-vcentered">Nome</th>
                
                <th class="is-2 is-vcentered">Pagamento</th>
                <th class="is-2 is-vcentered">Categoria</th>
                <th class="is-1 is-vcentered">Parcelas</th>
                <th class="is-2 is-vcentered">( R$ )</th>
                <th class="is-1 is-vcentered">Status</th>
                <th class="is-1 is-vcentered">Operações</th> 
                </tr>
            </thead>
            <tbody v-for="expenses in expensesArray" :key="expenses.id">
                <tr v-for="expense in expenses" :key="expense.id">
                <td class="is-2 is-vcentered">{{ expense.name }}</td>
                
                <td class="is-2 is-vcentered">{{ expense.payment }}</td>
                <td class="is-2 is-vcentered">{{ expense.category }}</td>
                <td class="is-1 is-vcentered">{{ expense.installments }}</td>
                <td class="is-2 is-vcentered">{{ expense.value_installment }}</td>


                <td class="is-1">
                    <button 
                        :class="{'button': true, 'is-success': expense.status, 'is-danger': !expense.status}" 
                        @click="alterStatusExpense(expense.id)">
                        {{ expense.status ? 'Pago' : 'Pendente' }}
                    </button>
                </td>
                <td class="is-1 is-vcentered">
                    <button class="delete is-medium bg-orange">Excluir</button>
                </td>

                </tr>
                <tr v-for="value in valueTotalByMonth" :key="value">
                    <td class="is-2">TOTAL:</td>
                    <td class="is-2">{{ value }}</td>

                    <span v-for="valueStatusTrue in installmentsStatusTrue" :key="valueStatusTrue">
                        <td class="is-2"> {{ valueStatusTrue }}</td>
                    </span>
                </tr>
            </tbody>
            </table>
        </div>
        

</div>   

            <div v-if="tableSelect === 'yearly'">
                <h1>painel anual</h1>
            </div>

        </section >

        <section v-if="contentSelectControl === 'incomes'" class="box">
            <div class=" tabs is-toggle is-fullwidth">
                <ul>
                    <li :class="{'is-active': tableSelectIncome === 'monthly'}" @click="selectTableIncome('monthly')"><a>Mensal</a></li>
                    <li :class="{'is-active': tableSelectIncome === 'yearly'}" @click="selectTableIncome('yearly')"><a>Anual</a></li>
                </ul>
            </div>

        </section>

        <section v-if="contentSelectControl === 'investments'" class="box">
            <div class=" tabs is-toggle is-fullwidth">
                <ul>
                    <li :class="{'is-active': tableSelectInvestments === 'monthly'}" @click="selectTableInvestments('monthly')"><a>Mensal</a></li>
                    <li :class="{'is-active': tableSelectInvestments === 'yearly'}" @click="selectTableInvestments('yearly')"><a>Anual</a></li>
                </ul>
            </div>

        </section>

    </div>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
   
    data() {
        return {

            contentSelectControl: '',
            tableSelect: '', 
            tableSelectIncome: '',
            tableSelectInvestments: '',

            status_formExpense: false, 
            statusExpense: false,
         
            year_expense: '',
            month_expense: '',
            name_expense: '',
            value_expense: '',
            payment_expense: '',
            category_expense: '',
            installments_expense:'',

            year: '',
            month: '',


            translationMap: {
                full_name: 'Nome Completo',
                phone: 'Telefone',
                profession: 'Profissão'
    
            },

            // messages
            messageSuccess: '',
            messageError: '',

            // database
            expensesArray: [] ,
            valueTotalByMonth: {}, 
            installmentsStatusTrue: {},  
       

        }
    },
   
    methods: {

        selectContentControl(content: any) {
             this.contentSelectControl = content
        
        },
        selectTableExpenses(table: any) {
            this.tableSelect = table
        },
        selectTableIncome(table: any) {
            this.tableSelectIncome = table
        },
        selectTableInvestments(table: any) {
            this.tableSelectInvestments = table
        },

        show_formExpense() {
            this.status_formExpense = !this.status_formExpense
        },

        

        async createExpense() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await this.$axios.post(`/expenses`,{
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

        async alterStatusExpense(id: any) {
            try {
                const token = localStorage.getItem('userToken')
    
                const response = await this.$axios.put(`/expenses/${id}`, {}, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                
                this.statusExpense = await response.data.data
                
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
               
                const response = await this.$axios.get(`http://127.0.0.1:4000/panel/financial/${this.year}/${this.month}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                this.expensesArray = await response.data.data.expenses
                this.valueTotalByMonth = await response.data.data.totalInstallments

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

        
    }
})



</script>

