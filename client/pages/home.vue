<template>
    <section class="container is-max-desktop p-5">

        <div v-if="validatedUser">

            <!-- INFORMAÇÕES DO USUÁRIO-->
            <div class="box p-2 has-background-black-ter">  
                <h1 class="text-white"><i class="fa-solid fa-user text-orangered mx-2"></i>  {{ userEmail }}  
                    <i class="fa-solid fa-circle-info fa-flip ml-5 text-orangered" style="--fa-animation-duration: 3s;"></i>
                </h1>
            </div>

            <!-- MENSAGENS DE SUCESSO E ERRO -->
            <MessageSuccess :message="messageSuccess"/>
            <MessageError :message="messageError"/>

            <!-- MOSTRAR E OCULTAR FORMULARIO DE NOVA TRANSAÇÃO -->
            <button class="button is-fullwidth bg-orangered text-white my-4" @click="showFormTransaction()">
                <i class="fa-solid fa-share-from-square fa-flip " style="--fa-animation-duration: 3s;"></i> Nova Transação
            </button>

           <!-- FORMULARIO DE NOVA TRANSAÇÃO-->
            <div v-if="statusFormTransaction">
                <div>
                    
                    <form action="" method="post" @submit.prevent="createdTransaction">

                        <select v-model="month">
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

                        <input v-model="year" type="text"  placeholder="Ano da transação.">
                        <input v-model="description" type="text"  placeholder="Descrição: Hamburguer final de semana, Salário do trabalho, Invest renda fixa">
                        <input v-model="amount" type="text" >
                        <input v-model="category" type="text"  placeholder="Categoria: Comida - Salário - Renda Fixa">
                        <input v-model="destiny" type="text" placeholder="Destino do valor: ">

                        <select v-model="type" >
                            <option value="expense">Selecione o tipo de transação</option>
                            <option value="expense">Despesa</option>
                            <option value="income">Renda</option>
                            <option value="investment">Investimento</option>
                        </select>

                        <button type="submit" class="button is-fullwidth is-success">Criar</button>
                    </form> 
                </div>   
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

                    <button class="button bg-orangered text-white m-1"  @click="showFormCategory">+ Categoria</button>

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
                <div v-if="statusFormCategory" class="box">
                    <form action="" method="post" @submit.prevent="createdCategory">
                        <h1 class="title is-6">Criar nova categoria.</h1>
                        <input v-model="nameCategory" type="text" class="input" placeholder="Digite o nome da categoria.">
                        <button type="submit" class="button is-success m-2">Criar</button>
                    </form>
                </div>


                <!-- BOTOES DE BUSCA ENTRE DESPESAS, RENDA E INVESTIMENTOS -->
                <div class="columns is-desktop">

                    <div class="box column has-background-black-ter m-3" @click="selectedTableType('expenses')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration : 3s;"></i>
                            Despesas
                        </h1>
                        <h2 class="title is-4 text-white has-text-centered is-vcentered">
                            
                            R$ {{ valueTotalExpenseAPI }}
                        </h2>
                    </div>
                    <div class=" box column is-vcentered has-background-black-ter m-3" @click="selectedTableType('incomes')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;" ></i>
                            Renda</h1>
                        <h2 class="title is-4 text-white has-text-centered">
                            
                            R$ {{ valueTotalIncomesAPI }}
                        </h2>
                    </div>
                        <div class=" box column is-vcentered has-background-black-ter m-3	" @click="selectedTableType('investments')">
                        <h1 class="title is-5 text-orangered">
                            <i class="fa-solid fa-money-check-dollar fa-flip text-orangered mr-2" style="--fa-animation-duration: 3s;" ></i>
                            Investimentos</h1>
                        <h2 class="title is-4 text-white has-text-centered">
                       
                                
                                R$ {{ valueTotalInvestmentsAPI }}
                         
                          
                            
                            
                        </h2>  
                    </div>
                </div>     
                
                
            <!-- TABELA DE DESPESAS-->
            <div v-if="activeTableType === 'expenses'" class="box has-background-black-ter">

                <div class="box has-background-black-bis">
                    <h1 class="title is-5 text-orangered">Resumo de Despesas</h1>
                </div>
            
                <div class="table-container">
       
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth has-background-black-ter ">
                    <thead>
                        <tr class="columns m-1">
                            <th class="column">  <p class="text-orangered"><i class="fa-solid fa-calendar-days mr-3"></i>Data</p></th>
                            <th class="column"> <p class="text-orangered"><i class="fa-solid fa-pen mr-3"></i> Descrição</p></th>
                            <th class="column"><i class="fa-solid fa-brazilian-real-sign text-orangered"></i> Valor</th>
                            <th class="column"><i class="fa-solid fa-boxes-stacked text-orangered"></i> Categoria</th>
                            <th class="column"><i class="fa-solid fa-paper-plane text-orangered"></i> Destino</th>
                            <th class="column"><i class="fa-solid fa-signal text-orangered"></i> Status</th>
                        </tr> 
                    </thead> 
                    <tbody v-for="expense in expensesAPI" :key="expense.id">
                        <tr class="columns m-1">
                            <td class="column">{{ expense.month }} / {{ expense.year }}</td>
                            <td class="column">{{ expense.description }}</td>
                            <td class="column"><p class="has-text-danger">{{ expense.amount }}</p></td>
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

        <div v-if="activeTableType === 'incomes'" class="box has-background-black-bis">
            <div class="box has-background-black-bis">
                <h1 class="title is-5 text-orangered">Resumo de Rendas</h1>
            </div>

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

        <div v-if="activeTableType === 'investments'" class="box has-background-black-bis">
            <div class="box has-background-black-bis">
                    <h1 class="title is-5 text-orangered">Resumo dos Investimentos</h1>
                </div>

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
            validatedUser: false, // no metodo getUser precisa vir o email e id do usuário

            // status de visualização de formularios
            statusFormTransaction: false,
            statusFormCategory: false,

            // controladores de navegação entre o painel mensal e anual
            activeTable: 'monthly',

            // controlador de navegação entre despesa, renda e investimentos
            activeTableType: 'expenses',

            // dados do formulario de criação de transações
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            type: 'expense' || 'income' || 'investment',
            description: '',
            amount: 99.99,
            category: '',
            destiny: '',
            status: false,

            // dados do formulario de criação de categoria
            nameCategory: '',

            // parametros de busca
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,

            // armazenamento de mensagens de sucesso e erro
            messageSuccess: '',
            messageError: '',

            // Informações das APIs
            expensesAPI: {}, // despesas do mes e ano selecionado
            incomesAPI: [], // rendas do mes e ano selecionado
            investmentsAPI: [], // investimentos do mes e ano selecionado

            // informações do usuário
            userEmail: '-----',
            userId: -1,


            // soma dos valores de despesas, renda e investimentos, do mes e ano selecionado
            valueTotalExpenseAPI: '',
            valueTotalIncomesAPI: '',
            valueTotalInvestmentsAPI: '',

            


        }
    },
    mounted() {
        this.getUser()
    },
    
    methods: {
        
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
            this.activeTableType = type
        },

        // metodos do formulario de criação de transação
        showFormTransaction() {
            this.statusFormTransaction = !this.statusFormTransaction
        },
        showFormCategory() {
            this.statusFormCategory = !this.statusFormCategory
        },

        // busca apenas o email e id do usuario
        
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

            } catch (error: any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                    this.statusFormTransaction = false
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

                // result 
                this.expensesAPI = response.data.expenses
                this.incomesAPI = response.data.incomes 
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
        async createdCategory() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.post(`http://127.0.0.1:4000/categories`,
                {
                    name: this.nameCategory
                },

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.messageSuccess = response.data.message
                setTimeout(() => {
                    this.messageSuccess = ''
                    this.statusFormCategory = false
                }, 2000)
            } catch (error:any) {
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
})



</script>
