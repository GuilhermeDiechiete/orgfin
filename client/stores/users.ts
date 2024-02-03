import { defineStore } from "pinia";

const api = 'http://localhost:4000/user';



export const useUserStore = defineStore('user', {
    
    state: () => {
        return {
            username: '',
            email: '',
            password: '',
            message: ref(''), 
            };
    },
    
    getters: {
        getMessage: (state) => state.message
    },
    
    actions: {
        async register(data: any) {
            try {
                const response = await $fetch(api, {
                method: 'POST',
                body: {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                }
            });
                this.message = String(response);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);

            } catch (error) {
                this.message = String(error);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);
            }
            
        },
    
    },
   
});





  