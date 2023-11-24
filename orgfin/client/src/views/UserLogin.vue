<template>
    <div class="container">
        <h1 id="title" class="title is-1">Login</h1>

        <div id="area-message">
            <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
            <div v-if="messageError" id="error">{{ messageError }}</div>
        </div>
        

        <form action="post">

            <label>E-mail</label>
            <input type="email" id="input" class="input" v-model="email">

            <label>Senha</label>
            <input type="password" id="input" class="input" v-model="password">

        </form>
        <div id="center" class="button-area">
            <button id="button-success" @click="login()">Entrar</button> <br>

            <router-link to="/register" class="link">Ainda não tem conta? <strong style="color: orangered;"> Registre-se!</strong></router-link>
        </div>
        
        
        
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: '',

            messageSuccess: '',
            messageError: ''
        };
    },
    methods: {
        login() {
            const data = {
                email: this.email,
                password: this.password
            };
            axios.post('http://127.0.0.1:4000/user/login', data)
                .then(res => {
                    const token = res.data.token
                    localStorage.setItem('token', token)
                    console.log(res)
                    this.messageSuccess = res.data.data
                    setTimeout(() => {
                        this.messageSuccess = '';
                        this.$router.push('/painel')
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                    this.messageError = error.response.data.data
                    setTimeout(() => {
                        this.messageError = '';
                    }, 2000);
                });
        }
    }
};
</script>

<style>
@import '../assets/global.css';
</style>