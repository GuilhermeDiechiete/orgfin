import { defineStore } from "pinia";
import type { TransactionByMonth, TransactionByYear } from "~/interfaces/interfaces"

const API = 'http://localhost:4000/transaction';

const currentDate = new Date();

export const useTransactionStore = defineStore('transactions', {

    state: () => {
        return {
            tableSelected: ref('expense'), 
            
            day: ref(currentDate.getDay()),
            month: ref(currentDate.getMonth() + 1),
            year: ref(currentDate.getFullYear()),
            yearTableAnnual: ref(currentDate.getFullYear()),

            expenses: ref([]),
            incomes: ref([]),
            investments: ref([]),

            totalByMonthExpenses: ref(0),
            totalByMonthIncomes: ref(0),
            totalByMonthInvestments: ref(0),
            surplus: ref(0),

            // getByYear
            totalExpenses: ref([]), 
            totalIncomes: ref([]), 
            totalInvestments: ref([]),
            
            totalAnnualExpenses: ref(0), 
            totalAnnualIncomes: ref(0), 
            totalAnnualInvestments: ref(0),
            // messages
            messageError: ref(''),
            messageSuccess: ref(''),
        };
    },
    
    actions: {
        async create ( transaction: any ) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
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
                setTimeout(() => {
                    this.messageSuccess = ''
                }, 1500 )
                } 
                }
                return true
            } catch (error: any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                }, 1500 )
                return false
            }
        }, 
        // PEGAR INFORMAÇÕES PARA A TABELA DE CONTROLE MENSAL
        async getByMonth () {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                    if(token) {
                    const data: TransactionByMonth = await $fetch<TransactionByMonth>(`${API}/${this.month}/${this.year}`, {
                        method: 'GET',
                        headers: {
                            Authorization: token
                        },
                    });
                this.expenses = data.expenses;
                this.incomes = data.incomes;
                this.investments = data.investments;

                this.totalByMonthExpenses = data.totalByMonthExpenses;
                this.totalByMonthIncomes = data.totalByMonthIncomes;
                this.totalByMonthInvestments = data.totalByMonthInvestments;
                this.surplus = data.surplus;

                    } 
                }
            } catch (error:any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                }, 1500 )
            }
        },

        // PEGAR INFORMAÇÕES PARA A TABELA DE CONTROLE ANUAL
        async getByYear () {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                    if(token) {
                    const data: TransactionByYear = await $fetch<TransactionByYear>(`${API}/${this.yearTableAnnual}`, {
                        method: 'GET',
                        headers: {
                            Authorization: token
                        },
                    });
                    this.totalExpenses = data.totalExpenses, 
                    this.totalIncomes = data.totalIncomes,
                    this.totalInvestments = data.totalInvestments,
                    this.totalAnnualExpenses = data.totalAnnualExpenses,
                    this.totalAnnualIncomes = data.totalAnnualIncomes,
                    this.totalAnnualInvestments = data.totalAnnualInvestments;
                    } 
                }
            } catch (error:any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                }, 1500 )
            }
        },
        
        async delete (id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                   if(token) {
                    await $fetch(`${API}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: token
                        },
                    });
                } 
                }
            } catch (error:any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                }, 1500 )
            }
        },
        async changeStatus (id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                   if(token) {
                    await $fetch(`${API}/${id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: token
                        },
                    });
                } 
                
                }
            } catch (error:any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = ''
                }, 1500 )
            }
        }
    }
});