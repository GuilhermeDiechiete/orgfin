<template>
  <div>
    <BtnNext to="/" />
  
    <BtnFullWidth
      text="Adicionar nova Conta"
      @click="isActive"
    />
  
    <FormAccounts v-if="active" />
    <TableAccounts />
  </div>
</template>
  
  <script setup lang="ts">
  
  const active = ref(false)
  
  const isActive = () => {
      active.value = !active.value
  }
  </script>