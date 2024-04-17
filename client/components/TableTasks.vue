<template>
  <v-card class="mx-auto my-4" elevation="16" max-width="96%" v-for="task in tasks">
    <v-card-item>
      <v-card-title>
        <v-checkbox :label="task.name" @click.prevent="alterStatus(task.id)"></v-checkbox>
      </v-card-title>

      <v-card-subtitle>
        - {{ task.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-btn block color="primary" density="comfortable" @click.prevent="deleteTasks(task.id)">excluir</v-btn>
    
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