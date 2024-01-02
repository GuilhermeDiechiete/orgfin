<template>
  <div class="box has-text-centered">

    <h1 class="title is-3">Registre-se</h1>

    <div v-if="messageError.length > 0">
      <div class="notification is-danger" v-for="message in messageError" :key="message.id">
        {{ message }}
      </div>
      <div class="notification is-success" v-for="message in messageSuccess" :key="message.id">
        {{ message }}
      </div>
    
    </div>
    
 
    <form action="post" @submit.prevent="submitForm">

      <label class="label" for="">Nome de Usuário:</label>
      <input class="input" type="text" name="username" id="username" v-model="username"> <br>

      <label class="label" for="">E-mail:</label>
      <input class="input" type="text" name="email" id="email" v-model="email"> <br>

      <label class="label" for="">Senha:</label>
      <input class="input" type="text" name="password" id="password" v-model="password"> <br>

      <label class="label" for="">Confirmação de senha:</label>
      <input class="input" type="text" name="confirmPassword" id="confirmPassword" v-model="confirmPassword"> <br>

      <button type="submit" class="button is-success my-6">Registrar</button>

    </form>

    <NuxtLink to="/auth/login">Já tem uma conta? Faça Login!</NuxtLink>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({

  data() {
    return {
      username: '',
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

        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
        })

        this.messageSuccess = response.data;

        setTimeout(() => {
          this.messageSuccess = '';
        }, 2000);

        setTimeout(() => {
          this.$router.push('/auth/login');
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