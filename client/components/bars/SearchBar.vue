<template>
    <div class="columns is-desktop">
        <SelectFilter class="column is-1"/>
        <SelectOrder  class="column is-1" />
        <SelectMonth class="column is-1" />
        <SelectYear  class="column is-1" />
        <BtnNormal class="column" icon="fa-solid fa-magnifying-glass my-icon fa-shake" @click.prevent="getTransactions"/>
    </div>
</template>

<script setup lang="ts">

const useTransaction = useTransactionStore()

const active = ref('')

watch(() => useTransaction.tableSelected, (newSelected) => {
  active.value = newSelected
 
})

const getTransactions = async () => {
    if(active.value === 'annual') {
        await useTransaction.getByYear() 
    } else {
        await useTransaction.getByMonth() 
        await useTransaction.getByYear() 
    }   
}

</script>