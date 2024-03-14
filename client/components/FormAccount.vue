<!-- FORMULÁRIO PARA ADICIONAR NOVA CONTA -->

<script setup lang="ts">
const store = useAccountStore() // acessando store de conta

// campos do formulário
const account = ref({
  name: '',
  amount: 0
})

// enviando dados para API
const create = async () => {
  await store.create( account.value )
  
  // limpar os campos
  account.value = {
    name: '',
    amount: 0
  }
  await store.index() // nova busca das contas para atualizar na tabela
}
</script>

<template>
  <form class="my-box-form">
    <h3 class="mb-6">Adicionar Conta</h3>
    <Messages />
    <v-text-field v-model="account.name" label="Nome" variant="outlined" />
    <v-text-field v-model="account.amount" label="Valor em conta" variant="outlined" />
    <v-btn block @click.prevent="create" class="bg-orange-darken-4"> Criar </v-btn>
  </form>
</template>

