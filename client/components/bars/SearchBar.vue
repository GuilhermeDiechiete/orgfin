<template>
    <div class="my-box">
        <div class="columns fullwidth">
        <SelectOrder />
        <SelectMonth />
        <SelectYear />
        <BtnNormal icon="fa-solid fa-magnifying-glass icon-color fa-shake" @click.prevent="searchTransactions"/>

        </div>
        
    </div>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore()

const searchTransactions = async () => {
    await useTransaciton.index('asc', '2024', '2')
     
}

</script>