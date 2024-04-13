<template>
  <section>
    <TableExpenses v-if="selected === 'expense'" />
    <TableIncomes v-if="selected === 'income'" />
    <TableInvestments v-if="selected === 'investment'" />
  </section>
</template>

<script setup lang="ts">
const G = useGlobalStore()
const selected = ref(G.tableSelected)

watch(() => G.tableSelected, (newSelected) => {
  selected.value = newSelected;
})

</script>