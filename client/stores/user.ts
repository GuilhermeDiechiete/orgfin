import { defineStore } from "pinia";

const API = 'http://localhost:4000';

export const useUserStore = defineStore('users', {

    state: () => {
        return {
            token: ref(''),
            user: {
                id: ref(''),
                username: ref(''),
                email: ref(''),
            },
            authenticated: false,
            // register
            username: ref(''),
            email: ref(''),
            password: ref(''),
            confirmPassword: ref(''),

            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        };
    },
    actions: {
        async register (username: string, email: string, password:string, confirmPassword:string) {
            try {
                this.messageSuccess = await $fetch(`${API}/user`, {
                    method: 'POST',
                    body: {
                        username,
                        email,
                        password,
                        confirmPassword
                    }
                });
                setTimeout(() => {
                    this.messageSuccess = '';
                },2000);
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
        async show () {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                    const id = localStorage.getItem('userId');

                    if(token && id) {
                        this.user = await $fetch(`${API}/user/${id}`, {
                            method: "GET",
                            headers: {
                                Authorization: token
                            }
                            
                        });
                    }
                    if(this.user.email && this.user.id) {
                        this.authenticated = true;
                    }

                }
                
                
            } catch (error) {
                console.log(error);
            }
        }
    }
});