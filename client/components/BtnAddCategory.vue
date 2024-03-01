<template>
    <div class="text-center">
      <v-btn block class="mb-2" size="x-large" text="ADICIONAR CATEGORIA" @click="sheet = !sheet" />
  
      <v-bottom-sheet v-model="sheet">
        <v-card class="text-center" height="60%">
          <v-card-text>
            <v-btn variant="text" @click="sheet = !sheet">
              fechar
            </v-btn>
            <form-category />
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>
  </template>

<script>
export default {
  data: () => ({
    sheet: false,
  }),
}
</script>