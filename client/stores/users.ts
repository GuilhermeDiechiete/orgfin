import { defineStore } from "pinia";

const api = 'http://localhost:4000';

interface AuthResponse {
    token: string;
    id: number;
}
interface ShowResponse {
    id: number;
    username: string, 
    email: string
}

export const useUserStore = defineStore('user', {
    
    state: () => {
        return {
            user: {
                id: ref(-1),
                username: '',
                email: '', 
            },
            
            message: ref(''), 
            token: ref(''),
            autorized: false,
            };
    },
    
    getters: {
        getMessage: (state) => state.message,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        autorized: (state) => state.autorized,
    },
    
    actions: {
        async register(data: any) {
            try {
                const response = await $fetch(api + '/user', {
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

        async login(data: any) {
            try {
                const response: AuthResponse = await $fetch(api + '/auth', {
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password,
                }
            });
                this.user.id = response.id;
                localStorage.setItem('token', response.token);
                navigateTo('/');

            } catch (error) {
                console.log(error);
                this.message = String(error);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);
            }
            
        },
        async show() {
            try {
                const userToken = localStorage.getItem('token');

                if (userToken) {
                    const user: ShowResponse = await $fetch(`${api}/user/${this.user.id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `${userToken}`
                        }
                    });
        
                    this.autorized = true;
                    this.user.id = user.id;
                    this.user.username = user.username;
                    this.user.email = user.email;


                } else {
                    console.log('Token não encontrado');
                }
        
            } catch (error) {
                console.log(error);
                this.message = String(error);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);
            }
        }
    
    },
   
});





  