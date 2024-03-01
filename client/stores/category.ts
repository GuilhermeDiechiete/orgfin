
import { defineStore } from "pinia";

const API = 'http://localhost:4000/category'

interface Category {
    id: number;
    name: number;
}

export const useCategoryStore = defineStore('categories', {

    state: () => {
        return {
            name: ref(''),
            categories: ref([]),
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async register( name: string, type: string ) {
            try {
                console.log(type)
                if(typeof localStorage !== 'undefined'){
                    const token = localStorage.getItem('token')
                   if(token) {
                   this.messageSuccess = await $fetch(`${API}`, {
                    method: 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: {
                        name, type
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
                    this.categories = await $fetch(`${API}`, {
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