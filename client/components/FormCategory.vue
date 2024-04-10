<!-- Formulário para criar Categorias -->
<template>
  <form class="my-box-form">
    <h3 class="ml-2 mb-2 text-left">NOVA CATEGORIA</h3>
    <Messages />
    <v-radio-group inline v-model="category.type">
      <v-radio label="Despesa" value="expense"/>
      <v-radio label="Renda" value="income"/>
      <v-radio label="Investimento" value="investment"/>
    </v-radio-group>
    <v-text-field v-model="category.name" label="Name" variant="outlined" />
    <v-btn block @click.prevent="create" class="bg-orange-darken-4"> Criar </v-btn>
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
    name: '',
    type: ''
  }
  await store.index() // nova busca para atualizar o valor na tabela
}
</script>



