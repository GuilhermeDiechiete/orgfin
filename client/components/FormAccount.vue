<template>
    <form class="my-box-form">

      <h3 class="mb-6">Adicionar Conta</h3>
      <Messages />
      <v-text-field v-model="name" label="Nome" variant="outlined" />
      <v-text-field v-model="amount" label="Valor em conta" variant="outlined" />
      <v-btn @click.prevent="create"> Criar </v-btn>
    </form>
  </template>

<script setup lang="ts">

const store = useAccountStore()

const name = ref('')
const amount = ref(0)

const create = async () => {
  await store.create( name.value, amount.value);
  name.value = ''
  amount.value = 0
  await store.index()
};

</script>