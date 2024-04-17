<template>
    <section v-for="task in tasks">
        <v-card class="mb-1" :title="task.date">
                <v-checkbox :label="task.name"></v-checkbox>
        </v-card>
    </section>
</template>

<script setup lang="ts">
import type { Tasks } from '../interfaces/interfaces'

const store = useTasksStore()
await store.index()

const tasks = ref<Tasks[]>(store.tasks) // categorias

watch(() => store.tasks, (newTasks) => {
  tasks.value = newTasks;
})
</script>