import { defineStore } from "pinia";

const API = 'http://localhost:4000';

export const useAdminStore = defineStore('admin', {

    state: () => {
        return {
            token: ref(''),
            authenticated: false,
            users: ref([]),
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        };
    },
    actions: {

   
        // buscar informações dos usuários
        async index() {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                    const id = localStorage.getItem('userId');

                    if(token && id) {
                        this.users = await $fetch(`${API}/admin`, {
                            method: "GET",
                            headers: {
                                Authorization: token
                            }
                            
                        });
                    }
                }
                
                
            } catch (error: any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.messageError = '';
                },2000);
            }
        },

        async delete(id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.messageSuccess = await $fetch(`${API}/admin/${id}`, {
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
    }
});