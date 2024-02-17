
import { defineStore } from "pinia";

const API = 'http://localhost:4000/transaction'

export const useTransactionStore = defineStore('transactions', {

    state: () => {
        return {
            expenses: ref([]),
            incomes: ref([]),
            investments: ref([]),
            transactions: ref([]),

            totalByMonthExpenses: ref(''),
            totalByMonthIncomes: ref(''),
            totalByMonthInvestments: ref(''),
            surplus: ref(''),
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async create( transaction: any ) {
            try {
                console.log(transaction)
                if(typeof localStorage !== 'undefined'){
                    const token = localStorage.getItem('token')
                   if(token) {
                   this.messageSuccess = await $fetch(`${API}`, {
                    method: 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: {
                        date: transaction.date,
                        type: transaction.type,
                        description: transaction.description,
                        installment:transaction.installment,
                        total_installments:transaction.total_installments,
                        amount: transaction.amount,
                        category: transaction.category,
                        account: transaction.account,
                        destiny: transaction.destiny,
                        status: transaction.status
                        
                    }
                }) 
                } 
                }

                setTimeout(() => {
                    this.messageSuccess = ''
                },2000)
            } catch (error: any) {
                console.log(error)
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                },2000)
            }
        }, 
        async getByMonth(order:string, year:string, month:string) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                    if(token) {
                    this.transactions = await $fetch(`${API}/${order}/${year}/${month}`, {
                        method: 'GET',
                        headers: {
                            Authorization: token
                        },
                    })
                    } 
                }
                this.expenses = this.transactions.expenses
                this.incomes = this.transactions.incomes
                this.investments = this.transactions.investments

                this.totalByMonthExpenses = this.transactions.totalByMonthExpenses
                this.totalByMonthIncomes = this.transactions.totalByMonthIncomes
                this.totalByMonthInvestments = this.transactions.totalByMonthInvestments
                this.surplus = this.transactions.surplus

            } catch (error) {
                console.log(error)
            }
        },
        
        async delete(id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.messageSuccess = await $fetch(`${API}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: token
                        },
                    })
                } 
                
                }
                console.log('deleteado')
            } catch (error) {
                console.log(error)
            }
        }
    }
})