<template>
    <div class="text-center">
      <v-btn block size="x-large" text="ADICIONAR TRANSAÇÃO" @click="sheet = !sheet" class="btn-add-transaction bg-orange-darken-4"/>
  
      <v-bottom-sheet v-model="sheet">
        <v-card class="text-center" height="50%">
          <v-card-text>
            <v-btn variant="text" @click="sheet = !sheet">
              fechar
            </v-btn>
  
            <FormTransaction />
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>
  </template>

<script setup lang="ts">
const sheet = ref(false)

const storeCategory = useCategoryStore()
const storeAccount = useAccountStore()

if(sheet) {
  await storeCategory.index()
  await storeAccount.index()
}
</script>

