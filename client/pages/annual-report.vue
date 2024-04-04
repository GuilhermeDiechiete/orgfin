<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage icon="fa-solid fa-file" title="Relatório Anual" description="Controle anual das suas despesas, rendimentos e investimentos."/>
            <SelectYear /> 
            <TableAnnual />
        </section>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
const layout = 'default'

</script>