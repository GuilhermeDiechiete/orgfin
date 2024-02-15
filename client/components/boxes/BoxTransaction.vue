<template>
  <BtnWide class="my-button-wide" @click="activeForm" icon="fa-solid fa-plus my-icon fa-beat"/> 
  <FormTransaction v-if="active" />
</template>

<script setup lang="ts">

const active = ref(false)

const activeForm = () => {
    active.value = !active.value
}
</script>