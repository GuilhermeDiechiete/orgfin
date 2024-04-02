import { defineStore } from "pinia";
import type { UserRegister } from "~/interfaces/interfaces"
const API = 'http://localhost:4000';

export const useUserStore = defineStore('users', {

    state: () => {
        return {
            token: ref(''),
            authenticated: false,
            registerUser: false,
            user: {
                id: ref(''),
                username: ref(''),
                email: ref(''),
            },
            
            // messages
            messageError: ref(''),
            messageSuccess: ref('')
        };
    },
    actions: {

        // registrar o usuário no sistema
        async register ( user: UserRegister ) {
            try {
                this.messageSuccess = await $fetch(`${API}/user`, {
                    method: 'POST',
                    body: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword
                    }
                });
                setTimeout(() => {
                    this.messageSuccess = ''
                },2000);
                return true
            } catch (error: any) {
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.'
                }
                setTimeout(() => {
                    this.messageError = ''
                },2000)
            }
        },

        // buscar informações do usuário
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
                    if(this.user.id && this.user.email) {
                        this.authenticated = true 
                        
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
    }
});