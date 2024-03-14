<!-- BOTÃO PARA ABRIR O FORMULARIO DE ADICIONAR CONTAS-->
<script setup lang="ts">
const sheet = ref(false)
</script>

<template>
  <div class="text-center">
    <v-btn block class="mb-2 bg-deep-orange-darken-3" size="x-large" text="ADICIONAR CONTA" @click="sheet = !sheet" />
  
    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="50%">
        <v-card-text>
            <v-btn variant="text" @click="sheet = !sheet">
              Fechar
            </v-btn>
          <form-account /> <!-- FORMULARIO DE CONTAS -->
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
