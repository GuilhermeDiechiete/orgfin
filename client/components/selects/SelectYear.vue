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

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const year = ref(currentYear)

watch(() => year.value, (newYear) => {
  useTransaciton.year = newYear
})
</script>