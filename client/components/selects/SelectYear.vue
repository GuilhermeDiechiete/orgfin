<template>
    <select class="my-select" v-model="year">
      <option>2024</option>
      <option>2025</option>
      <option>2026</option>
      <option>2027</option>
      <option>2028</option>
    </select>
  </template>

<script setup lang="ts">

const useTransaciton = useTransactionStore()

const year = ref('1')

watch(() => year.value, (newYear) => {
  useTransaciton.year = newYear
})
</script>