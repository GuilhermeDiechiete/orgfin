<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <FormTransaction /> <!-- Botão e formulário responsavel pelo formulário -->
            <SelectMonthYear /> <!-- caixa seletora do mês e ano -->
            <BoxDisplay /> <!-- responsavel por mostrar o valor total e selecionar a tabela -->
            
            <Messages /> <!-- componente responsavel por mostrar mensagens de erro e sucesso -->
            <TableRendering /> <!-- componente responsavel por alternar a renderização das tabelas -->
        </section> 
    </NuxtLayout>
       
    
    
</template>

<script setup lang="ts">
const layout = 'default'
import { authenticated } from '~/middleware/auth'
authenticated()

</script>
