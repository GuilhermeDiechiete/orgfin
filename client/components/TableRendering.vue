<template>
  <section>
    <TableExpenses v-if="selected === 'expense'" />
    <TableIncomes v-if="selected === 'income'" />
    <TableInvestments v-if="selected === 'investment'" />
  </section>
</template>

<script setup lang="ts">
const store = useTransactionStore()
const selected = ref(store.tableSelected)
watch(() => store.tableSelected, (newSelected) => {
  selected.value = newSelected;
})
</script>