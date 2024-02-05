<template>
  <div>
    <FormTitle text="Login" />

    <Message v-if="userStore.message" :text="userStore.message" />

    <form action="" method="post" @submit.prevent="submitForm">
      <label for="" class="label">E-mail</label>
      <input v-model="userData.email" class="input" type="text">

      <label for="" class="label">Senha</label>
      <input v-model="userData.password" class="input" type="text">

      <FormButton type="submit" text="Entrar" />
    </form>
  </div>
</template>

<script setup lang="ts">

const userData = ref({
  email: '',
  password: '',
});

const userStore = useUserStore();

const submitForm = async () => {
  try {
    await userStore.login(userData.value);

  } catch (error) {
    console.error('Erro durante o login:', error);
  }
};
</script>