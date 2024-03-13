<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage icon="fa-solid fa-layer-group" title="Categorias" description="Adicione suas categorias para fazer buscas futuras."/>
            <BtnAddCategory />
            <TableCategories />
        </section>
    </NuxtLayout>
    
    
</template>

<script setup lang="ts">
const layout = 'default'
import { authenticated } from '~/middleware/auth'
authenticated()

</script>