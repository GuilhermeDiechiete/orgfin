<template>
  <section>
    <form
      method="post"
      class="my-box">
      <FormLabel text="E-mail:" />
      <input
        v-model="email"
        type="email"
        class="my-input">
  
      <FormLabel text="Senha:" />
      <input
        v-model="password"
        type="password"
        class="my-input">
  
      <BtnFullWidthSuccess
        text="Entrar"
        iconame=""
        @click.prevent="storeAuth.login(email, password)" />
    </form>
  </section>
</template>

<script setup lang="ts">
  
const storeAuth = useAuthStore();

const email = ref('');
const password = ref('');


  
  
</script>