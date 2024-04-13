import { defineStore } from "pinia";
import type { UserRegister } from "~/interfaces/interfaces"
const API = 'http://localhost:4000';

export const useUserStore = defineStore('users', {

    state: () => {
        return {
            user: { // Armazena dados do usuário autenticado no metodo show
                id: ref(''),
                username: ref(''),
                email: ref(''),
            },
            
            // messages
            msgError: ref(''),
            msgSuccess: ref('')
        };
    },
    actions: {

        // registrar o usuário no sistema
        async register ( user: UserRegister ) {
            try {
                this.msgSuccess = await $fetch(`${API}/user`, {
                    method: 'POST',
                    body: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword
                    }
                });
                setTimeout(() => {
                    this.msgSuccess = ''
                },2000);
                return true
            } catch (error: any) {
                if (error.response._data.message) {
                    this.msgError = error.response._data.message;
                } else {
                    this.msgError = 'Erro ao processar a solicitação.'
                }
                setTimeout(() => {
                    this.msgError = ''
                },2000)
            }
        },

        // buscar informações do usuário
        async show () {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token') || ''
                    const id = localStorage.getItem('userId') || -1

                    if(token && id) {
                        this.user = await $fetch(`${API}/user/${id}`, {
                            method: "GET",
                            headers: {
                                Authorization: token
                            }
                            
                        });
                    }
                }
                
                
            } catch (error: any) {
                if (error.response._data.message) {
                    this.msgError = error.response._data.message;
                } else {
                    this.msgError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.msgError = '';
                },2000);
            }
        },
    }
});