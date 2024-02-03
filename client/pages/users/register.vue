<template>
  <div class="box">
    <h1 class="title is-3 has-text-centered">Registre-se</h1>

    <Message v-if="user.message" :text="user.message" />

    <form action="" method="post">
      <FormInput v-model="userData.username" label="Nome de usuário" />
      <FormInput v-model="userData.email" label="E-mail" />
      <FormInput v-model="userData.password" label="Senha" />
      <FormInput v-model="userData.confirmPassword" label="Confirmação de senha" />
      <FormButton text="Enviar" @click="registerUser" />
    </form>
    <div class="has-text-centered">
      <NuxtLink to="/auth/login">Já tem uma conta? Faça Login!</NuxtLink>
    </div>
  </div>
</template>

<script setup>

const user = userStore();

const userData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registerUser = user.register(userData.value);



</script>