<template>
  <section class="box-select">
    <select class="my-select" v-model="store.month">
      <option value="1">Janeiro</option>
      <option value="2">Fevereiro</option>
      <option value="3">Março</option>
      <option value="4">Abril</option>
      <option value="5">Maio</option>
      <option value="6">Junho</option>
      <option value="7">Julho</option>
      <option value="8">Agosto</option>
      <option value="9">Setembro</option>
      <option value="10">Outubro</option>
      <option value="11">Novembro</option>
      <option value="12">Dezembro</option>
    </select>
    <select class="my-select ml-4" v-model="store.year">
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
      <option value="2028">2028</option>
      <option value="2029">2029</option>
      <option value="2030">2030</option>
      <option value="2031">2031</option>
      <option value="2032">2032</option>
      <option value="2033">2033</option>
    </select>
  </section>
    
</template>

<script setup lang="ts">

const store = useTransactionStore()

watch(() => store.month, () => {
  store.getByMonth()
})
</script>

<style scoped>
.box-select {
  display: flex;
  margin: 1em 0;
}
.my-select {
  background-color: rgb(34, 34, 34);
  width: 100%;
  padding: 0.5em 0 0.5em 1em;
  border-radius: 0.2em;
}


</style>
