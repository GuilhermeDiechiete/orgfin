<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage title="Categorias" description="Adicione suas categorias para fazer buscas futuras."/>
            <BtnAddCategory />
            <TableCategories />
        </section>
    </NuxtLayout>
    
    
</template>

<script setup lang="ts">
const layout = 'default'

</script>