<template>
 
      <v-container>
        <v-row>
          <v-col cols="6" md="4">
            <v-select v-model="store.month" :items="month" density="compact" label="Mês"></v-select>
          </v-col>
          <v-col cols="6" md="4">
            <v-select v-model="store.year" :items="year" density="compact" label="Ano"></v-select>
          </v-col>
        </v-row>
      </v-container>
  
  </template>

<script setup lang="ts">

const store = useTransactionStore()

watch(() => store.month, () => {
  store.getByMonth()
})

const month = ref([1,2,3,4])
const year = ref([2024,2025,2026])
</script>


<!--'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'-->