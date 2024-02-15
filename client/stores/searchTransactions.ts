


import { defineStore } from "pinia";

const API = 'http://localhost:4000/search'

export const useSearchTransactionStore = defineStore('searchTransactions', {

    state: () => {
        return {
            // by month
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
        }
        
}})