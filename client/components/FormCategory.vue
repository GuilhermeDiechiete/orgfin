<template>
    <form class="my-box-form">

      <h3 class="mb-6">Adicionar Categoria</h3>
      <Messages />
      <v-text-field v-model="category.name" label="Name" variant="outlined" />
      <v-radio-group inline v-model="category.type">
        <v-radio label="Despesa" value="expense"></v-radio>
        <v-radio label="Renda" value="income"></v-radio>
        <v-radio label="Investimento" value="investment"></v-radio>
      </v-radio-group>
      <v-btn @click.prevent="create"> Criar </v-btn>
    </form>
  </template>

<script setup lang="ts">

const store = useCategoryStore()

const category = ref({
  name:'',
  type:''
})

const create = async () => {
  await store.create( category.value )

  category.value = {
    name: '',
    type: ''
  }
  await store.index()
}
</script>