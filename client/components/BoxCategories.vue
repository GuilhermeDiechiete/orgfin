<template>
  <div>
    <BtnNext to="/" />

    <BtnFullWidth
      text="Adicionar nova Categoria"
      @click="isActive"
    />

    <FormCategory v-if="active" />
    <TableCategory />
  </div>
</template>

<script setup lang="ts">

const active = ref(false)

const isActive = () => {
    active.value = !active.value
}
</script>