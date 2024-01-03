<template>
    <div class="box m-6 has-text-centered">
        <h1 class="title is-2">Login</h1>

        <div class="box" v-if="messageError.length > 0">
            <div class="notification is-danger">
                {{ messageError }}
            </div>
        </div>
        <div class="box" v-if="messageSuccess.length > 0">
            <div class="notification is-success">
                {{ messageSuccess }}
            </div>
        </div>

        <form class="box has-text-centered" action="post" @submit.prevent="submitForm">

            <label class="label" for="">E-mail:</label>
            <input class="input" type="text" name="email" id="email" v-model="email">

            <label class="label" for="">Senha:</label>
            <input class="input" type="text" name="password" id="password" v-model="password">

            <button class="button is-success my-4" type="submit">Login</button>
        </form>

        <NuxtLink to="/user/register">Não tem uma conta? Registre-se!</NuxtLink>
    </div>
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
                
                const token = response.data.token.token
                localStorage.setItem('userToken', 'Bearer ' + token)
                
                this.messageSuccess = response.data.message;

                setTimeout(() => {
                this.$router.push('/panel/one');
                }, 3000);
                
            } catch (error: any) {
                this.messageError = error.response.data.message;
                setTimeout(() => {
                this.messageError = '';
                }, 2000);
            }
            }
    }
})



</script>