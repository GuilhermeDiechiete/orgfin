import { defineStore } from "pinia";

const api = 'http://localhost:4000';

interface AuthResponse {
    token: string;
    userId: string;
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
            autorized: false,
            message: ref(''), 
            token: ref(''),
            
            };
    },
    
    getters: {
        getMessage: (state) => state.message,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
       
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
               
                localStorage.setItem('userId', response.userId);
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
                const userId = localStorage.getItem('userId');

                if (userToken && userId) {
                    const user: ShowResponse = await $fetch(`${api}/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `${userToken}`
                        }
                    });
                    this.user.id = user.id;
                    this.user.username = user.username;
                    this.user.email = user.email;
                    this.autorized = true;

                } else {
                    navigateTo('/auth/login');
                }
        
            } catch (error) {
                navigateTo('/auth/login');
            }
        }
    
    },
   
});





  