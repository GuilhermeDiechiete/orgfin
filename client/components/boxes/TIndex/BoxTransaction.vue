<template>
  <BtnWide
    class="my-button-wide"
    icon="fa-solid fa-plus my-icon fa-beat"
    @click="activeForm" />
  <FormTransaction v-if="active" />
</template>

<script setup lang="ts">

const active = ref(false);

const activeForm = () => {
  active.value = !active.value;
};
</script>
