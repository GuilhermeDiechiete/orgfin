<!-- PAGINA -->
<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage icon="fa-solid fa-layer-group" title="Transações" description="Transações realizadas do mês, clique nos displays para alterar entre, Desperas, Rendimentos e Investimentos."/>
            <BtnAddTransaction /> <!-- Botão para adicionar transações -->
            <SelectMonthYear /> <!-- caixa seletora do mês e ano -->
            <BoxDisplay /> <!-- responsavel por mostrar o valor total e selecionar a tabela -->
            
            <Messages /> <!-- componente responsavel por mostrar mensagens de erro e sucesso -->
            <TableRendering /> <!-- componente responsavel por alternar a renderização das tabelas -->
        </section> 
    </NuxtLayout>
       
    
    
</template>

<script setup lang="ts">


const layout = 'default'
const storeUser = useUserStore()
await storeUser.show()
</script>
