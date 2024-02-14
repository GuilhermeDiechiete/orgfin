<template>
    <section class="bg-dark">
      <div class="columns">
        <SelectFilter />
        <SelectOrder />
        <SelectMonth />
        <SelectYear />
        <BtnNormal icon="fa-solid fa-magnifying-glass icon-color fa-shake" @click.prevent="searchTransactions"/>
      </div>
    </section>
  </template>

<script setup lang="ts">

const useTransaciton = useTransactionStore()

const searchTransactions = async () => {
  await useTransaciton.index('asc', '2024', '3')
  
}



</script>