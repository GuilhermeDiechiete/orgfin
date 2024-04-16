<!-- Formulário para criar Categorias -->
<template>
  <form class="my-box-form">
    <h3 class="ml-2 mb-2 text-center">ALTERAÇÃO DE SENHA</h3>
    <Messages />
    <v-text-field v-model="category.name" label="Senha Atual" variant="outlined" />
    <v-text-field v-model="category.name" label="Nova Senha" variant="outlined" />
    <v-text-field v-model="category.name" label="Nova Senha - Confirmação" variant="outlined" />
    <v-btn block class="bg-orange-darken-4"> Alterar </v-btn>
  </form>
</template>

<script setup lang="ts">
const store = useCategoryStore() // acessando store de categorias

// campos do formulário
const category = ref({
  type:'expense',
  name:''
  
})

// enviando dados para API
const create = async () => {

  await store.create( category.value )

  // limpa os campos
  category.value = {
    type: 'expense',
    name: ''
    
  }
  await store.index() // nova busca para atualizar o valor na tabela
}
</script>



