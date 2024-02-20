<template>
  <div>
    <section v-if="auth">
      <BoxLogout /> 
      <BoxOrgFin />
      <BoxTransaction />
      <BoxNavegationPage /> 
      <Messages />
      <BoxDisplay />
      <BoxSearchTransaction />
      <BoxTables />
    </section>

    <section v-else>
      <h1>Faça Login</h1>
    </section>
  </div>
</template>

<script setup lang="ts">

const userStore = useUserStore();


const auth = ref(false);

const midd = async () => {
  try {
    await userStore.show();
    if(userStore.authenticated) {
        auth.value = true;
      } else {
        navigateTo('/auth/login');
      }
  } catch (error) {
    navigateTo('/auth/login');
  }
};

midd();

</script>