<template>
  <select class="my-select" v-model="filter">
    <option value="date">Filtrar</option>
    <option value="date">Data</option>
    <option value="category">Categoria</option>
    <option value="destiny">Destino</option>
  </select>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore()

const filter = ref('date')

watch(() => filter.value, (newFilter) => {
  useTransaciton.filter = newFilter
})
</script>
