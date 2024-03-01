<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <SelectMonthYear />
            <BtnAddTransaction /> <!-- botao para mostrar o formulario de nova transações-->
            
            <BoxDisplay /> <!-- responsavel por mostrar o valor total e selecionar a tabela -->
            
            <Messages /> <!-- componente responsavel por mostrar mensagens de erro e sucesso -->
            <TableRendering /> <!-- componente responsavel por alternar a renderização das tabelas -->
        </section> 
    </NuxtLayout>
       
    
    
</template>

<script setup lang="ts">

const layout = 'default'

</script>
