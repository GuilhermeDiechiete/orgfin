<template>
  <div>
    <SelectTable @tab-changed="getTableSelected" />
   
    <TableAnnual v-if="table === 'annual'" />

    <div v-else-if="table === 'monthly'">
      <SelectTableMonthly @tab-monthly="getTableMonthly" />
      <TableMonthly :type="tableMonthly" />
    </div>
  </div>
</template>

<script setup lang="ts">

const table = ref('monthly')
const tableMonthly = ref('expenses')

const getTableSelected = (typeTable: string) => {
    table.value = typeTable
}
const getTableMonthly = (typeTable: string) => {
    tableMonthly.value = typeTable
}


</script>
