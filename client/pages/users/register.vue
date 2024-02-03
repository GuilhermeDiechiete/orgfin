<template>
  <div class="box">
    <FormTitle text="Registre-se" />

    <Message v-if="user.message" :text="user.message" />

    <form action="" method="post">
      <FormInput v-model="userData.username" label="Nome de usuário" />
      <FormInput v-model="userData.email" label="E-mail" />
      <FormInput v-model="userData.password" label="Senha" />
      <FormInput v-model="userData.confirmPassword" label="Confirmação de senha" />
      <FormButton text="Enviar" @click="user.register(userData.value)" />
    </form>
    <div class="has-text-centered">
      <NuxtLink to="/auth/login">Já tem uma conta? Faça Login!</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const user = useUserStore();

const userData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});











</script>