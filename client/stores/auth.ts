import { defineStore } from "pinia";

const API = 'http://localhost:4000';


export const useAuthStore = defineStore('auth', {

    state: () => {
        return {
            email: ref(''),
            user: {
                token: ref(''),
                userId: ref(''),
            },
            messageError: ref(''),

        };
    },
    actions: {
        async login ( email: string, password:string ) {
            try {
                this.user = await $fetch(`${API}/auth`, {
                    method: 'POST',
                    body: {
                        email,
                        password,
                    }
                });
                if(this.user.token && this.user.userId) {
                   localStorage.setItem('token', this.user.token);
                    localStorage.setItem('userId', this.user.userId); 
                    navigateTo('/');
                }
                

            } catch (error: any) {
                console.log(error)
                if (error.response._data.message) {
                    this.messageError = error.response._data.message;
                } else {
                    this.messageError = 'Erro ao processar a solicitação.';
                }
            }
            setTimeout(() => {
                this.messageError = '';
            },2000);
        }
    }
});