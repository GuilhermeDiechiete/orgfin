<template>
  <form class="my-box-form">
    <v-text-field v-model="email" label="E-mail" variant="outlined" />
    <v-text-field v-model="password" label="Senha" variant="outlined" />
    <v-btn block @click.prevent="login"> Entrar </v-btn>
  </form>
</template>

<script setup lang="ts">


const email = ref('');
const password = ref('');

const store = useAuthStore();

const login = () => {
  store.login(email.value, password.value);
};
</script>
