<template>
    <section class="section">
        
        <div class="box has-text-centered is-vcentered">
            <h1 class="title is-3 text-orangered">Registro de Usuário</h1>

            <MessageSuccess :message="messageSuccess"/>
            <MessageError :message="messageError"/>

            <form method="post" @submit.prevent="submitForm">
                <input v-model="email" type="text" class="input mb-4" placeholder="E-mail">

                <input v-model="password" type="text" class="input mb-4" placeholder="Senha">

                <input v-model="confirmPassword" type="text" class="input mb-4" placeholder="Confirmação de senha">  
                
                <button type="submit" class="button is-fullwidth bg-orangered text-white">Criar usuário</button>
            </form>
            
            <div class="mt-3">
                <NuxtLink to="/auth/login">Fazer Login!</NuxtLink>
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
            confirmPassword: '',

            messageSuccess: '',
            messageError: ''
        }
    },
    
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://127.0.0.1:4000/user', {

                    email: this.email, 
                    password: this.password,
                    confirmPassword: this.confirmPassword
                });

                this.messageSuccess = response.data.message 
                setTimeout(() => {
                    this.$router.push('/auth/login')
                }, 2000)

            } catch (error: any) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message : "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);

            }  
        },
    }
})



</script>



