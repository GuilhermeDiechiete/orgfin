<template>
    <div class="text-center">
      <v-btn block class="mb-2"
        size="x-large"
        text="ADICIONAR CONTA"
        @click="sheet = !sheet"
      ></v-btn>
  
      <v-bottom-sheet v-model="sheet">
        <v-card
          class="text-center"
          height="50%"
        >
          <v-card-text>
            <v-btn
              variant="text"
              @click="sheet = !sheet"
            >
              Fechar
            </v-btn>
  
            <form-account />
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