<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <BtnAddTasks />
            <TableTasks />
        </section>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
const layout = 'default'
</script>