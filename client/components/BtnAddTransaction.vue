<!-- BOTÃO para acessar formulario  -->
<template>
    <div class="text-center">
      <v-btn block size="x-large" text="ADICIONAR TRANSAÇÃO" @click="sheet = !sheet" class="btn-add-transaction bg-orange-darken-4"/>
    
      <v-bottom-sheet v-model="sheet">
        <v-card class="text-center" height="50%">
          <v-card-text>
            <v-btn variant="text" @click="sheet = false"> fechar </v-btn>
            <FormTransaction /> <!-- Formulário-->
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>
</template>
  
<script setup lang="ts">
  const sheet = ref(false) // valor para abrir e fechar formulario
  </script>