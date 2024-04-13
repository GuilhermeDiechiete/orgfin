<!-- MENSAGENS DE SUCESSO E ERRO DAS PAGINAS E FORMULÁRIOS -->
<template>
  <section v-for="store in stores">
    <div v-if="store.msgError" class="message-error"> {{ store.msgError }} </div>
    <div v-if="store.msgSuccess" class="message-success"> {{ store.msgSuccess }} </div>
  </section>
</template>

<script setup lang="ts">

const stores = [
  useUserStore(),
  useAuthStore(),
  useCategoryStore(),
  useAccountStore(),
  useTransactionStore()
]

</script>



