<!-- Formulário para criar Categorias -->
<template>
    <form class="my-box-form">
      <h3 class="ml-2 mb-2 text-left">NOVA TAREFA</h3>
      <Messages />
      <v-text-field v-model="tasks.date" label="Data" variant="underlined" type="date"/>
      <v-text-field v-model="tasks.name" label="Nome" variant="underlined" type="text"/>
      <v-text-field v-model="tasks.description" label="Descrição" variant="underlined" type="text"/>
      <v-btn block @click.prevent="create" class="bg-orange-darken-4"> Criar </v-btn>
    </form>
  </template>
  
  <script setup lang="ts">
import { useTasksStore } from '~/stores/tasks';

  const store = useTasksStore() // acessando store de categorias
  const G = useGlobalStore()
  const date = G.dataISO // data atual

  // campos do formulário
  const tasks = ref({
    date: date,
    status: false,
    name:'',
    description: ''
  })
  
  // enviando dados para API
  const create = async () => {
  
    await store.create( tasks.value )
  
    // limpa os campos
    tasks.value = {
        date: date,
        status: false,
        name:'',
        description: ''
      
    }
    await store.index() // nova busca para atualizar o valor na tabela
  }
  </script>
  
  
  
  