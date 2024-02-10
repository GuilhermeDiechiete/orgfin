<template>
  <BtnMain
    icon="fa-solid fa-plus icon-color fa-beat"
    class="my-2"
    @click="activeForm"
  />
  <FormTransaction v-if="active" />
</template>

<script setup lang="ts">

const active = ref(false)

const activeForm = () => {
    active.value = !active.value
}
</script>