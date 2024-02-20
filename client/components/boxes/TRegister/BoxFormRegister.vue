<template>
  <section class="my-box">
    <form
      action=""
      method="post"
      class="fullwidth">
      <FormLabel text="Nome de usuário" />
      <input
        v-model="username"
        type="text"
        class="my-input">

      <FormLabel text="E-mail" />
      <input
        v-model="email"
        type="email"
        class="my-input">

      <FormLabel text="Senha" />
      <input
        v-model="password"
        type="password"
        class="my-input">

      <FormLabel text="Confirmação de senha" />
      <input
        v-model="confirmPassword"
        type="text"
        class="my-input">

      <BtnFullWidthSuccess
        text="Enviar"
        @click.prevent="store.register(username, email, password, confirmPassword)" />
    </form>
  </section>
</template>

<script setup lang="ts">

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const store = useUserStore();


</script>