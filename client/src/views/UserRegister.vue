<template>
    <div class="container">
      <h1 class="title is-1">Registro</h1>
  
      <div v-if="messageSuccess" class="success">{{ messageSuccess }}</div>
    <div v-if="messageError" class="error">{{ messageError }}</div>
      <form class="form">
        <label>Nome</label>
        <input v-model="name" type="text" class="input" />
  
        <label>E-mail</label>
        <input v-model="email" type="email" class="input" />
  
        <label>Telefone</label>
        <input v-model="phone" type="phone" class="input" />
  
        <label>Data de Nascimento</label>
        <input v-model="birth" type="date" class="input" />
  
        <label>Cidade</label>
        <input v-model="city" type="text" class="input" />
  
        <label>Estado - UF</label>
        <input v-model="state" type="text" class="input" />
  
        <label>Senha</label>
        <input v-model="password" type="password" class="input" />
  
        <label>Confirmação de Senha</label>
        <input v-model="confirmpassword" type="password" class="input" />
      </form>
      <div class="button-area">
        <button @click="register" class="button is-success">Registrar</button>
      </div>
      <div class="link-area">
        <router-link to="/login" class="link"
          >Já tem uma conta? <strong style="color: orangered;"> Faça login!</strong
        ></router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        birth: '',
        city: '',
        state: '',
        password: '',
        passwordConfirmation: '',

        messageSuccess: '',
        messageError: ''
      };
    },
    methods: {
      register() {
        const data = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          birth: this.birth,
          city: this.city,
          state: this.state,
          password: this.password,
          confirmpassword: this.confirmpassword
        };
  
        axios
          .post('http://127.0.0.1:4000/users/register', data)
          .then(response => {
            this.messageSuccess = response.data.message;
            setTimeout(() => {
              this.messageSuccess = '';
              this.$router.push('/login'); 
            }, 2000);
          })
          .catch(error => {
            this.messageError = error.response.data.message;
  
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
  
