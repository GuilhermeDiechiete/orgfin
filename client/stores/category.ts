
import { defineStore } from "pinia";
import type { CategoryCreate } from '~/interfaces/interfaces'

const API = 'http://localhost:4000/category'

export const useCategoryStore = defineStore('categories', {

    state: () => {
        return {
            categories: ref([]),
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async create( category: CategoryCreate ) {
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
                        name: category.name,
                        type: category.type
                    }
                }) 
                }}
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