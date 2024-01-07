<template>

    <div>

        <!-- nav screen mobile-->
        <div v-if="screen_mobile" class="box">
            <nav class="tabs is-toggle is-fullwidth">
                <ul>
                    <li :class="{'is-active ': pageSelect === 'feed'}" @click="selectPage('feed')"><a>Feed</a></li>
                    <li :class="{'is-active': pageSelect === 'control'}" @click="selectPage('control')"><a>Controle</a></li>
                    <li :class="{'is-active': pageSelect === 'panel'}" @click="selectPage('panel')"><a>Painel</a></li>
                </ul>
            </nav>
        </div>


        <div class="columns" >

        
        <div v-if="pageSelect === 'feed' || screen_mobile === false" class="box column m-3 container">


            <div class="box">
                <button class="button is-fullwidth bg-orange">Atualizar noticias</button>
            </div>

            <section id="scroll" class="box container" >
                
                    <div class="card box">
                        <div class="card-image">
                            <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">Guilherm Diechiete</p>
                                <p class="subtitle is-6">diechiete@gmail.com</p>
                            </div>
                            </div>

                            <div class="content">
                            Confira meu instagram, com novidades sobre investimentos todos os dias. <a>@_diechiete</a>.
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">Guilherm Diechiete</p>
                                <p class="subtitle is-6">diechiete@gmail.com</p>
                            </div>
                            </div>

                            <div class="content">
                            Confira meu instagram, com novidades sobre investimentos todos os dias. <a>@_diechiete</a>.
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                            </div>
                        </div>
                 
                </div>
                

            </section>
        </div>

        <!-- section controle financeiro -->
        <section v-if="pageSelect === 'control' || screen_mobile === false" class="box column is-half m-3" >

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
            <h1>Painel de rendas</h1>
            
        </section>

        <section v-if="contentSelectControl === 'investments'" class="box">
            <h1>Painel de investimentos</h1>
            
        </section>
    </section>
        <div v-if="pageSelect === 'panel' || screen_mobile === false" id="section" class="box column m-1">
            <section class="box userProfile">

                <!-- <div v-if="userProfile" class="box card-content">
                    <div v-for="(value, key) in userProfile" :key="key">
                        <p>{{ translatedKey(key) }}: {{ value }}</p>
                        <p></p>
                    </div>
                </div> -->

                <div class="box">
                    <h1 class="title is-4">Chat in development...</h1>

                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                        </figure>
                    </div>
                </div>
            </section>
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

            screen_mobile: window.innerWidth <= 1200, // false or true

            pageSelect: '', // feed, control or panel
            contentSelectControl: '', // expenses, incomes, investments
            tableSelect: '', // monthly or yearly
            

            status_formExpense: false, // or true - show form creation expense
            statusExpense: false,
            // inputs
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
            userProfile: {}   

        }
    },

    mounted() {
        this.getInfoUser()
        window.addEventListener('resize', this.atualizarScreenMobile);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.atualizarScreenMobile);
    },
   
    methods: {
       
        atualizarScreenMobile() {
            this.screen_mobile = window.innerWidth <= 1200;
            
        },
      
        // mobile 
        selectPage(page: any) {

            if(this.screen_mobile) {
                this.pageSelect = page
            } else {
                this.screen_mobile = false
                this.pageSelect = 'all'
            }
            
        },

        selectContentControl(content: any) {
             this.contentSelectControl = content
        
        },
        selectTableExpenses(table: any) {
            this.tableSelect = table
        },

        show_formExpense() {
            this.status_formExpense = !this.status_formExpense
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

        async alterStatusExpense(id: any) {
            try {
                const token = localStorage.getItem('userToken')
    
                const response = await axios.put(`http://127.0.0.1:4000/expenses/${id}`, {}, {
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
               
                const response = await axios.get(`http://127.0.0.1:4000/panel/financial/${this.year}/${this.month}`, {
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

        async getInfoUser() {
            try {
                const token = localStorage.getItem('userToken');
                
               
                const response = await axios.get(`http://127.0.0.1:4000/user_infos//${12}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                this.userProfile = await response.data.data

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


