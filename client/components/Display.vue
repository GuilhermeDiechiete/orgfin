<!-- Responsavel por exibir informações de Despesas, Rendimentos, Investimentos e Sobras na pagina Principal -->
<!-- Usado para o usuário clicar e fazer a navegação entre tabelas -->
<template>
    <v-col cols="12" sm="3">
       <div :class="{ 'active': option, 'inactive': !option }">
          <p><i v-if="!option" :class="icon" style="--fa-animation-duration: 3s;"></i> {{ title }}</p>
          <h1 class="text-h5">R$ {{ value }}</h1>
          <div class="text-right">
            <p v-if="option"><i class="fa-solid fa-circle-chevron-up fa-beat-fade"></i></p>
            <p v-if="!option"><i class="fa-solid fa-circle-chevron-down fa-beat-fade"></i></p>
          </div>
        </div> 
    </v-col>
</template>

<script setup lang="ts">
// option -> vem true || false
defineProps(['option', 'icon', 'title', 'value' ])
</script>