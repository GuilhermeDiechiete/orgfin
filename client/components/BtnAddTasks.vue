<script setup lang="ts">
const sheet = ref(false)
</script>

<template>
  <div class="text-center">
    <v-btn block class="mb-2 bg-deep-orange-darken-3" size="x-large" text="adicionar tarefa" @click="sheet = !sheet" />
  
    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="60%">
        <v-card-text>
          <v-btn variant="text" @click="sheet = !sheet">
            fechar
          </v-btn>
          <form-tasks /> <!-- FORMULARIO DE TAREFAS -->
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>