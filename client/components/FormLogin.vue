<!-- FORMULÁRIO DE LOGIN DO USUÁRIO -->

<script setup lang="ts">
const store = useAuthStore() // acessando store de autenticação

const email = ref('')
const password = ref('')

// enviando dados para API
const login = () => {
  store.login(email.value, password.value);
}
</script>

<template>
  <form class="my-box-form">
    <v-text-field v-model="email" label="E-mail" variant="outlined" type="email"/>
    <v-text-field v-model="password" label="Senha" variant="outlined" @keyup.enter="login" type="password"/>
    <v-btn class="bg-deep-orange-darken-3" block @click.prevent="login"> Entrar </v-btn>
  </form>
</template>


