<!-- LINK PARA USAR NOS RODAPÉS DAS PAGINAS -->

<script setup lang="ts">
defineProps(['to', 'text'])
</script>

<template>
    <v-card>
        <v-container class="text-center">
            <p><NuxtLink class="my-link" :to="to">{{ text }}</NuxtLink> </p>
        </v-container>
    </v-card>
</template>

