<template>
  <div class="box">
    <FormTitle text="Registre-se" />

    <Message v-if="userStore.message" :text="userStore.message" />
    
    <form @submit.prevent="submitForm">
      <label for="" class="label mt-3">Nome de Usuário:</label>
      <input v-model="userData.username" type="text" class="input">
      <label for="" class="label mt-3">E-mail:</label>
      <input v-model="userData.email" type="text" class="input">
      <label for="" class="label mt-3">Senha:</label>
      <input v-model="userData.password" type="text" class="input">
      <label for="" class="label mt-3">Confirmação de senha:</label>
      <input v-model="userData.confirmPassword" type="text" class="input">
      <FormButton type="submit" text="Enviar" />
    </form>

    <div class="has-text-centered">
      <NuxtLink to="/auth/login">Já tem uma conta? Faça Login!</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

const userData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const userStore = useUserStore();

const submitForm = async () => {
  try {
    await userStore.register(userData.value);

  } catch (error) {
    console.error('Erro durante o registro:', error);
  }
};
</script>
