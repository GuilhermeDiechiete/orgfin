import { loadNuxt } from "nuxt";
import { defineStore } from "pinia";

const API = 'http://localhost:4000'


export const useTransactionStore = defineStore('transactions', {

    state: () => {
        return {
            transactions: ref([]),
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async create( data: any ) {
            try {
                if(typeof localStorage !== 'undefined'){
                    const token = localStorage.getItem('token')
                   if(token) {
                   this.messageSuccess = await $fetch(`${API}/transaction`, {
                    method: 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: {
                        date: data.date,
                        type: data.type,
                        
                    }
                }) 
                } 
                }
                
          
                
                console.log(this.messageSuccess)
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
        async index() {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.categories = await $fetch(`${API}/category`, {
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
        }
        
}})