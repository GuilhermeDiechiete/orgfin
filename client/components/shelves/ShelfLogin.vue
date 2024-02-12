<template>
  <section>
    <h1>Login</h1>

    <Messages />
    <form
      action=""
      method="post"
    >
      <FormLabel text="E-mail:" />
      <input
        v-model="email"
        type="email"
        class="input bg-dark"
      >
  
      <FormLabel text="Senha:" />
      <input
        v-model="password"
        type="password"
        class="input bg-dark"
      >
  
      <BtnFullWidth
        text="Entrar"
        class="btn mt-5 bg-green"
        iconame=""
        @click.prevent="storeAuth.login(email, password)"
      />
    </form>
  </section>
</template>
  
<script setup lang="ts">
  
const storeAuth = useAuthStore()

const email = ref('')
const password = ref('')


  
  
</script>