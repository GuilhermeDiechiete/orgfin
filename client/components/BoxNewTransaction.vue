
<template>
  <div>
    <FormButton text="Adicionar nova transação" @click="isActive()" />

    <div v-if="active">
      <FormTransaction />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    isActive() {
      this.active = !this.active;
    }
  }
};

</script>