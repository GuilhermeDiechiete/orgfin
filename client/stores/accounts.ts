import { defineStore } from "pinia";
import type { AccountCreate } from "~/interfaces/interfaces";

const API = 'http://localhost:4000/account'

export const useAccountStore = defineStore('accounts', {

    state: () => {
        return {
            accounts: ref([]),
            
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async create( account: AccountCreate ) {
            try {
                if(typeof localStorage !== 'undefined'){
                    const token = localStorage.getItem('token')
                   if(token) {
                   this.messageSuccess = await $fetch(`${API}`, {
                    method: 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: {
                        name: account.name,
                        amount: account.amount
                    }
                }) 
                } 
                }
                setTimeout(() => {
                    this.messageSuccess = ''
                },2000)

            } catch (error: any) {
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
        async index() {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.accounts = await $fetch(`${API}`, {
                        method: 'GET',
                        headers: {
                            Authorization: token
                        },
                    })
                } 
                }
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
            } catch (error) {
                console.log(error)
            }
        }
        
}})