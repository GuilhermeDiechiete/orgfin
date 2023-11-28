<template>
    <div id="container">
        <table> 
            <!-- area de informações -->
            <thead>
                <tr class="columns">
                    <th class="column"><h1>Planilha de Controle Financeiro</h1></th>
                    <th class="column">Usuário: GUILHERME DIECHIETE DA SILVA</th>
                </tr>
                <tr class="columns">
                   <th class="column">
                        <label for="">Selecione o ano: </label>
                        <select v-model="selectedYear" id="input" class="input" @change="showCategories()">
                            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                        </select>
                    </th> 
                </tr>
                <tr class="columns">
                    <th class="column">
                        <button id="button" @click="showCreateCategory">Adicionar Categoria</button>
                        <button id="button" @click="showCreatePayment">Adicionar Forma de Pagamento</button>
                        <button id="button" @click="showCreateExpense">Adicionar despesa</button> 
                    </th> 
                </tr>
            </thead>

            <!--area de mensagens para o usuario-->
            <div id="area-message">
                <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
                <div v-if="messageError" id="error">{{ messageError }}</div>
            </div>

            <br>
            <!--formulario para criação de categoria-->
            <thead class="columns">
                <div v-show="statusCreateCategory" id="form-area">
                    <label for="">Nome: # Adicione nomes curtos, como: Essenciais, não essenciais, Casa...</label>
                    <input type="text" id="input" class="input" v-model="nameCategory">
                    <div id="center">
                        <button id="button-success" @click="createCategory">Criar</button>
                    </div>  
                </div>
                <!--area de criação de forma de pagamento-->
                <div v-show="statusCreatePayment" id="form-area">
                    <label for="">Nome</label>
                    <input id="input" v-model="namePayment" type="text" class="input" />
                    <label for="">Descrição</label>
                    <input id="input" v-model="descriptionPayment" type="text" class="input" />
                    <label for="">Limite</label>
                    <input id="input" v-model="limitPayment" type="text" class="input" />
                    <div id="center">
                        <button id="button-success" @click="createPayments">Criar</button>
                    </div>
                </div>
                <div v-show="statusCreateExpense" id="form-area">

                    <label>Descrição</label>
                    <input id="input" class="input" type="text" v-model="descriptionExpense">

                    <label>Valor - R$</label>
                    <input id="input" class="input" type="text" v-model="amountExpense">

                    <label>Dia para pagamento</label>
                    <input id="input" class="input" type="number" v-model="dayExpense">

                    <label for="">Mês da despesa | primeira parcela em...</label>
                    <select id="input" class="input" v-model="selectedMonth">
                        <option v-for="(month, index) in months" :class="{ 'selected-month': index + 1 === selectedMonth }" :key="index" :value="index + 1">
                            {{ month }}
                        </option>
                    </select>


                    <label for="">Forma de pagamento</label>
                    <select v-model="selectedPayment" id="input" class="input">
                        <option v-for="(payment, index) in payments" :key="index" :value="payment.payment_name">
                        {{ payment.payment_name }}
                        </option>
                    </select>
                    <label>Categoria</label>
                    <select v-model="selectedCategory" id="input" class="input">
                        <option v-for="(category, index) in categories" :key="index" :value="category.category_name">
                        {{ category.category_name }}
                        </option>
                    </select> 
                    <label>Numero de parcelas</label>
                    <input v-model="installment_numberExpense" id="input" class="input" type="text">
                    <label>Valor da parcelas</label>
                    <input id="input" class="input" type="text" v-model="installment_amountExpense">   
                    <div id="center">
                        <button id="button-success" @click="createExpense()">Adicionar</button>
                    </div>
                </div>  
            </thead> <br>

            <tbody>

                <div v-for="(getCategory, categoryIndex) in infoExpenses" :key="categoryIndex">
                    
                    <tr class="columns is-mobile">
                        
                        <!--primeira coluna ( categoria )-->
                        <td class="column is-2" :rowspan="getCategory.expenses.length + 1">
                            {{ getCategory.category.category_name }}
                        </td>
                        
                        <!--segunda coluna ( dados da tabela )-->
                        <td class="column">
                            <div class="columns is-mobile" v-for="(expense, expenseIndex) in getCategory.expenses" :key="expenseIndex">

                                <td class="column is-1" >{{ expense.description }}</td>
                                <td class="column is-1">{{ expense.payment_name }}</td>
                                
                                <td class="column is-1" v-for="monthIndex in 12" :key="monthIndex" >
                                    <span v-if="expense.month === monthIndex && expense.amount > 0">R$ {{ expense.amount }}</span>
                                    <span v-else>-</span>
                                </td>  
                            </div> 
                        </td> 
                    </tr> <br>
                </div>
            </tbody>
        </table> 
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            // mensagens de sucesso e erro
            messageSuccess: '',
            messageError: '',

            // valores de manipulação ( mostrar e ocultar formularios )
            statusCreateCategory: false,
            statusCreatePayment: false,
            statusCreateExpense: false,

            // valores recebidos da requisição
            categories: [],
            payments: [],
            expenses: [],
            infoExpenses: [],

            // valores para enviar nas requisições
            selectedYear: new Date().getFullYear(),
            years: Array.from({ length: 78 }, (_, index) => 2023 + index),

            // create category
            nameCategory: '',

            // create payment
            namePayment:'',
            descriptionPayment:'',
            limitPayment:'',

            // create expense
            descriptionExpense: '',
            amountExpense: '',
            dayExpense: '',
            selectedMonth:'',
            selectedPayment: '',
            selectedCategory:'',
            installment_numberExpense:'',
            installment_amountExpense:'',

            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            
        }
    },
    created() {
        this.listCategories()
        this.listPayments()
        this.showTotalExpenses()
    },
    methods: {
        showCreateCategory() {
            this.statusCreateCategory = !this.statusCreateCategory
            this.statusCreateExpense = false
            this.statusCreatePayment = false
        },
        showCreatePayment() {
            this.statusCreatePayment = !this.statusCreatePayment
            this.statusCreateCategory = false 
            this.statusCreateExpense = false
        },
        showCreateExpense() {
            this.statusCreateExpense = !this.statusCreateExpense
            this.statusCreateCategory = false 
            this.statusCreatePayment = false
        },
        createCategory() {
            var req = {
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            };
            const body = {
                nameCategory: this.nameCategory
                
            }
            axios.post('http://localhost:4000/validate', {}, req)
                .then(res => {
                this.userId = res.data.user.id;
                axios.post(`http://localhost:4000/categories/${this.userId}`, body, req)
                    .then(res => {
                    this.messageSuccess = res.data.message
                            setTimeout(() => {
                                this.messageSuccess = '';
                                window.location.reload()
                            }, 2000);
                    })
                    .catch(error => {
                    this.messageError = error.response.data.message
                            setTimeout(() => {
                                this.messageError = '';
                            }, 2000);
                    });
                })
            .catch(err => {
                console.log(err);
            });
        },
        createPayments() {
            var req = {
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            };
            const data = {
                name: this.namePayment,
                description: this.descriptionPayment,
                limit: this.limitPayment
            }
            axios.post('http://localhost:4000/validate', {}, req)
                .then(res => {
                this.userId = res.data.user.id;
                axios.post(`http://localhost:4000/payments/${this.userId}`, data, req)
                    .then(res => {
                        this.messageSuccess = res.data.message
                            setTimeout(() => {
                                this.messageSuccess = '';
                                window.location.reload()
                            }, 2000);
                    })
                    .catch(error => {
                    this.messageError = error.response.data.message
                    setTimeout(() => {
                            this.messageError = '';
                        }, 2000);
                    });
                })
            .catch(err => {
                console.log(err);
            });
        },
        createExpense() {
            var req = {
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            };
            const data = {
                description: this.descriptionExpense,
                amount: this.amountExpense,
                day: this.dayExpense,
                month: this.selectedMonth,
                year: this.selectedYear,
                payment: this.selectedPayment,
                category: this.selectedCategory,
                installment_number: this.installment_numberExpense,
                installment_amount: this.installment_amountExpense
            }
            axios.post('http://localhost:4000/validate', {}, req)
                .then(res => {
                this.userId = res.data.user.id;
                axios.post(`http://localhost:4000/expenses/${this.userId}`, data, req)
                    .then(res => {
                    this.messageSuccess = res.data.message
                            setTimeout(() => {
                                this.messageSuccess = '';
                                window.location.reload()
                            }, 2000);
                    })
                    .catch(error => {
                    this.messageError = error.response.data.message
                            setTimeout(() => {
                                this.messageError = '';
                            }, 2000);
                    });
                })
                .catch(err => {
                console.log(err);
                });
            },
        showTotalExpenses() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                params: {
                    year: this.selectedYear
                }
            };

            axios.post('http://localhost:4000/validate', {}, req)
            .then(res => {
            this.userId = res.data.user.id;
            axios.get(`http://localhost:4000/expenses/show/${this.userId}`, req)
                .then(res => {
                    this.infoExpenses = res.data.message
                    console.log(this.infoExpenses)
                })
                .catch(error => {
                this.messageError = error.response.data.message;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
                });
            })
            .catch(err => {
            console.log(err);
            }); 
        },
        listPayments() {
            var req = {
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            };
            axios.post('http://localhost:4000/validate', {}, req)
                .then(res => {
                this.userId = res.data.user.id;
                axios.get(`http://localhost:4000/payments/${this.userId}`, req)
                    .then(res => {
                        this.payments = res.data.message
                    
                    })
                    .catch(err => {
                    console.log(err);
                    });
                })
                .catch(err => {
                console.log(err);
                });
    },
    listCategories() {
        var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/categories/list/${this.userId}`, req)
            .then(res => {
              this.categories = res.data.message;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    }
}
</script>

<style>
@import '../assets/global.css';
</style>