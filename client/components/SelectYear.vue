<!-- INPUT DA TABELA ANUAL -->
<script setup lang="ts">
  const store = useTransactionStore()
</script>

<template>
  <section class="box-select">
    <select class="my-select" v-model="store.yearTableAnnual">
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




