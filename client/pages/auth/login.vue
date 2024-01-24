<template>
    <section class="container is-max-desktop p-5">
        <div class="box has-text-centered is-vcentered has-background-black-ter">

            <h1 class="title is-3 text-orangered">Login</h1>

            <MessageSuccess :message="messageSuccess"/>
            <MessageError :message="messageError"/>
           

            <form action="" method="post" @submit.prevent="submitForm">

                <input v-model="email" type="text" class="input mb-4 " placeholder="orgfin@gmail.com">
                <input v-model="password" type="password" class="input mb-4" placeholder="******">

                <button type="submit" class="button is-fullwidth bg-orangered text-white">Entrar</button>
            </form>

            <div class="mt-3">
                <NuxtLink to="/user/register">Não tem uma conta? Registre-se!</NuxtLink>
            </div>
            


        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({

    data() {
        return {
            email: '',
            password: '',
            messageSuccess: '',
            messageError: ''
        }
    },
    
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://127.0.0.1:4000/auth', {

                    email: this.email, 
                    password: this.password,
                });

                const token = response.data.token.token;
                localStorage.setItem('userToken', 'Bearer ' + token);

                this.messageSuccess = response.data.message 
                setTimeout(() => {
                    this.$router.push('/home')
                }, 1000)

            } catch (error: any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);

            }  
        },
    }
})



</script>

