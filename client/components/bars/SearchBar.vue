<template>
    <div>
        <div class="columns is-desktop">
        <SelectFilter class="column is-1"/>
        <SelectOrder  class="column is-1" />
        <SelectMonth class="column is-1" />
        <SelectYear  class="column is-1" />
        <BtnNormal class="column" icon="fa-solid fa-magnifying-glass my-icon fa-shake" @click.prevent="getTransactions"/>

        </div>
        
    </div>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore()

const getTransactions = async () => {
    await useTransaciton.getByMonth()
     
}

</script>