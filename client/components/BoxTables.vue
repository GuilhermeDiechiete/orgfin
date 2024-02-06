<template>
  <div>
    <TabNavegation @table="setTableActive" />

    <div v-if="tableSelected === 'monthly'">
      <div class="box has-text-centered">
        <SelectMonth />
        <SelectYear />
        <ButtonIsNormal text="Buscar" />
      </div>

      <TabNavegationType @table-type="setTypeActive" />
      <TableMonthly :type="typeSelected" />
    </div>

    <div v-else> 
      <div class="box has-text-centered">
        <SelectYear />
        <ButtonIsNormal text="Buscar" />
      </div>
      <TableYearly />
    </div>
  </div>
</template>

<script setup lang="ts">

const tableSelected = ref('monthly')
const typeSelected = ref('expenses')

const setTableActive = (table: string) => {
  tableSelected.value = table
}
const setTypeActive = (type: string) => {
  typeSelected.value = type
}
</script>