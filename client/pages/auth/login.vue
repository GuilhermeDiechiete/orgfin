<template>
    <div class="box m-4 has-text-centered">

        <h1 class="title is-2 orange">Login</h1>

        <div v-if="messageError.length > 0">
            <div class="notification is-danger my-6">
                {{ messageError }}
            </div>
        </div>
        <div v-if="messageSuccess.length > 0">
            <div class="notification is-success my-6">
                {{ messageSuccess }}
            </div>
        </div>

        <form class="has-text-centered" action="post" @submit.prevent="submitForm">

            <label class="label" for="">E-mail:</label>
            <input id="email" v-model="email"  class="input" type="text" name="email"  >

            <label class="label" for="">Senha:</label>
            <input id="password" v-model="password" class="input" type="text" name="password">

            <button class="button is-fullwidth bg-orange my-5" type="submit">Login</button>
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
                this.$router.push('/panel/financial');
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