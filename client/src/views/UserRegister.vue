id="input"<template>
    <div class="container">
      <div id="center">
        <h1 id="title" class="title is-1">Registro</h1>
      </div>
      <div id="area-message">
        <div v-if="messageSuccess" class="success">{{ messageSuccess }}</div>
        <div v-if="messageError" class="error">{{ messageError }}</div>
      </div>
      
      <form class="form">
        <label>Nome</label>
        <input v-model="name" type="text" class="input" id="input"/>
  
        <label>E-mail</label>
        <input v-model="email" type="email" class="input" id="input"/>
  
        <label>Telefone</label>
        <input v-model="phone" type="phone" class="input" id="input"/>
  
        <label>Data de Nascimento</label>
        <input v-model="birth" type="date" class="input" id="input"/>
  
        <label>Cidade</label>
        <input v-model="city" type="text" class="input" id="input"/>
  
        <label>Estado - UF</label>
        <input v-model="state" type="text" class="input" id="input"/>
  
        <label>Senha</label>
        <input v-model="password" type="password" class="input" id="input"/>
  
        <label>Confirmação de Senha</label>
        <input v-model="confirmpassword" type="password" class="input" id="input"/>
      </form>
      
      <div id="center">
        <div >
        <button @click="register" id="button-success">Registrar</button>
      </div>
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
  
