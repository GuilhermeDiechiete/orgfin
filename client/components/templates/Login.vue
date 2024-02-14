<template>
  <section>
    <h1 class="my-title">Login</h1>

    <Messages />
    <form action="" method="post">
      
      <FormLabel text="E-mail:" />
      <input v-model="email" type="email" class="my-input">
  
      <FormLabel text="Senha:" />
      <input v-model="password" type="password" class="my-input">
  
      <BtnFullWidthSuccess text="Entrar" iconame="" @click.prevent="storeAuth.login(email, password)"
      />
    </form>
    <div class="center mt-4">
      <NuxtLink to="/user/register" class="text-orangered">Não tem uma conta? Registre-se!</NuxtLink>
    </div>
    
  </section>
</template>
  
<script setup lang="ts">
  
const storeAuth = useAuthStore()

const email = ref('')
const password = ref('')


  
  
</script>