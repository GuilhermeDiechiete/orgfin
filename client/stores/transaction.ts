
import { defineStore } from "pinia";

const API = 'http://localhost:4000/transaction'
const API_SEARCH = 'http://localhost:4000/search'

export const useTransactionStore = defineStore('transactions', {

    state: () => {
        return {
            expenses: ref([]),
            incomes: ref([]),
            investments: ref([]),
            transactions: ref([]),
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
        async index(order:string, year:string, month:string) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                    if(token) {
                    this.transactions = await $fetch(`${API_SEARCH}/${order}/${year}/${month}`, {
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

                console.log(this.expenses, this.incomes, this.investments)
                
            } catch (error) {
                console.log(error)
            }
        }
        
}})