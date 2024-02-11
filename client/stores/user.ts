import { defineStore } from "pinia";

const API = 'http://localhost:4000'
console.log('api', API)

export const useUserStore = defineStore('users', {

    state: () => {
        return {
            username: ref(''),
            email: ref(''),
            password: ref(''),
            confirmPassword: ref(''),
            messageError: ref(''),
            messageSuccess: ref('')
        }
    },
    actions: {
        async register(username: string, email: string, password:string, confirmPassword:string) {
            try {
                this.messageSuccess = await $fetch(`${API}/user`, {
                    method: 'POST',
                    body: {
                        username,
                        email,
                        password,
                        confirmPassword
                    }
                })
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
        }
    }
})