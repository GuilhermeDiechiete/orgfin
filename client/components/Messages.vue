<!-- MENSAGENS DE SUCESSO E ERRO DAS PAGINAS E FORMULÁRIOS -->

<script setup lang="ts">
const userStore = useUserStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

</script>

<template>
  <section>
    <div v-if="userStore.messageError" class="message-error"> {{ userStore.messageError }} </div>
    <div v-if="authStore.messageError" class="message-error"> {{ authStore.messageError }} </div>
    <div v-if="accountStore.messageError" class="message-error"> {{ accountStore.messageError }} </div>
    <div v-if="categoryStore.messageError" class="message-error"> {{ categoryStore.messageError }} </div>
    <div v-if="transactionStore.messageError" class="message-error"> {{ transactionStore.messageError }} </div>

    <div v-if="userStore.messageSuccess" class="message-success"> {{ userStore.messageSuccess }} </div>
    <div v-if="accountStore.messageSuccess" class="message-success"> {{ accountStore.messageSuccess }} </div>
    <div v-if="categoryStore.messageSuccess" class="message-success"> {{ categoryStore.messageSuccess }} </div>
    <div v-if="transactionStore.messageSuccess" class="message-success"> {{ transactionStore.messageSuccess }} </div>
  </section>
</template>

