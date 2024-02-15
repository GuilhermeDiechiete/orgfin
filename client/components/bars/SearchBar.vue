<template>
    <div>
        <div class="columns is-desktop">
        <SelectOrder />
        <SelectMonth />
        <SelectYear />
        <BtnNormal icon="fa-solid fa-magnifying-glass my-icon fa-shake" @click.prevent="searchTransactions"/>

        </div>
        
    </div>
</template>

<script setup lang="ts">

const useSearchTransaciton = useSearchTransactionStore()

const searchTransactions = async () => {
    await useSearchTransaciton.getByMonth('asc', '2024', '3')
     
}

</script>