<template>
  <section>
    <div
      v-if="userStore.messageError"
      class="message-error">
      <h1>{{ userStore.messageError }}</h1>
    </div>
    <div
      v-if="userStore.messageSuccess"
      class="message-success">
      <h1>{{ userStore.messageSuccess }}</h1>
    </div>

    <div
      v-if="authStore.messageError"
      class="message-error">
      <h1>{{ authStore.messageError }}</h1>
    </div>

    <div
      v-if="categoryStore.messageError"
      class="message-error">
      <p>{{ categoryStore.messageError }}</p>
    </div>
    <div
      v-if="categoryStore.messageSuccess"
      class="message-success">
      <p>{{ categoryStore.messageSuccess }}</p>
    </div>

    <div
      v-if="accountStore.messageError"
      class="message-error">
      <h1>{{ accountStore.messageError }}</h1>
    </div>
    <div
      v-if="accountStore.messageSuccess"
      class="message-success">
      <h1>{{ accountStore.messageSuccess }}</h1>
    </div>

    <div
      v-if="transactionStore.messageError"
      class="message-error">
      <h1>{{ transactionStore.messageError }}</h1>
    </div>
    <div
      v-if="transactionStore.messageSuccess"
      class="message-success">
      <h1>{{ transactionStore.messageSuccess }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">

const userStore = useUserStore()
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const accountStore = useAccountStore();
const transactionStore = useTransactionStore();
</script>