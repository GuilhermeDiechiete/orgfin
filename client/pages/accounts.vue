<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage icon="fa-solid fa-building-columns" title="Contas Bancárias" description="Adicione os valores em conta para manter o controle sobre elas."/>
            <BtnAddAccount />
            <TableAccounts />
        </section>
    </NuxtLayout>
    
    
</template>

<script setup lang="ts">
const layout = 'default'


</script>