<template>
  <div>
    <FormTitle text="Login" />

    <Message v-if="authStore.message" :text="authStore.message" />

    <form @submit.prevent="submitForm" action="" method="post">
      <label for="" class="label">E-mail</label>
      <input class="input" v-model="userData.email" type="text">

      <label for="" class="label">Senha</label>
      <input class="input" v-model="userData.password" type="text">

      <FormButton type="submit" text="Entrar" />
    </form>
  </div>
</template>

<script setup lang="ts">

const userData = ref({
  email: '',
  password: '',
});

const authStore = useAuthStore();

const submitForm = async () => {
  try {
    await authStore.login(userData.value);

  } catch (error) {
    console.error('Erro durante o registro:', error);
  }
};
</script>