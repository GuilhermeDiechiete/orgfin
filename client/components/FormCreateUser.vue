<template>
  <section>
    <form class="my-box-form">

    <h3 class="mb-6">Informações</h3>
    <Messages />
    <v-text-field v-model="username" label="Nome de usuário" variant="outlined" />
    <v-text-field v-model="email" label="E-mail" variant="outlined" />
    <v-text-field v-model="password" label="Senha" variant="outlined" />
    <v-text-field v-model="confirmPassword" label="Confirmação de senha" variant="outlined" />
    <v-btn @click.prevent="addUser" block class="bg-deep-orange-darken-3">Enviar</v-btn>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { UserRegister } from '~/interfaces/interfaces';

const userStore = useUserStore()

// Campos do formulário
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const addUser = async () => {
  const user: UserRegister = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  };

  const register = await userStore.register(user)

  if(register) {
    setTimeout(() => {
      navigateTo('/auth/login')          
    },2000);
  }
};
</script>
