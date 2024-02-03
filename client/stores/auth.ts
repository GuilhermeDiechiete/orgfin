import { defineStore } from "pinia";

const api = 'http://localhost:4000/auth';



export const useAuthStore = defineStore('user', {
    
    state: () => {
        return {
            email: '',
            password: '',
            message: ref(''), 
            token: ''
            };
    },
    
    getters: {
        getMessage: (state) => state.message,
        getToken: (state) => state.token
    },
    
    actions: {
        async login(data: any) {
            try {
                const response = await $fetch(api, {
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password,
                }
            });
                if('message' in response) {
                   this.message = String(response.message); 
                }
                
                console.log(response);

                setTimeout(() => {
                    this.message = '';
                  }, 1000);

            } catch (error) {
                console.log(error)
                this.message = String(error);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);
            }
            
        },
    
    },
   
});