<template>
  <v-card v-for="task in tasks">
    <h1 class="text-left pl-4">{{ task.name }} - {{ task.date }}</h1>
    <v-checkbox @click="alterStatus(task.id)"></v-checkbox>
    <v-btn block color="primary" @click="deleteTasks(task.id)">excluir</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import type { Tasks } from '../interfaces/interfaces'

const store = useTasksStore()
await store.index()

const tasks = ref<Tasks[]>(store.tasks) // categorias

watch(() => store.tasks, (newTasks) => {
  tasks.value = newTasks;
})

const deleteTasks = async (id:number) => {
  await store.delete(id); 
  await store.index();
};
const alterStatus = async (id:number) => {
  await store.changeStatus(id)
  await store.index()
}
</script>