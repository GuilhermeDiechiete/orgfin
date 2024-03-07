<template>
    <form class="my-box-form">

      <h3 class="mb-6">Adicionar Conta</h3>
      <Messages />
      <v-text-field v-model="account.name" label="Nome" variant="outlined" />
      <v-text-field v-model="account.amount" label="Valor em conta" variant="outlined" />
      <v-btn @click.prevent="create"> Criar </v-btn>
    </form>
  </template>

<script setup lang="ts">

const store = useAccountStore()

const account = ref({
  name: '',
  amount: 0
})

const create = async () => {
  await store.create( account.value );
  
  account.value = {
    name: '',
    amount: 0
  }
  await store.index()
};

</script>