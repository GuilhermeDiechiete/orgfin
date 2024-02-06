<template>
  <div>
    <BtnNewTransaction @click="isActive" />
    <FormTransaction v-if="active" />
  </div>
</template>

<script setup lang="ts">

const active = ref(false)

const isActive = () => {
    active.value = !active.value
}
</script>