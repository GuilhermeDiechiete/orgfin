<template>
  <section>
    <select
      v-model="order"
      class="my-select">
      <option value="asc">
        Ordem
      </option>
      <option value="asc">
        Data
      </option>
      <option value="pending">
        Status Pendente
      </option>
      <option>Status Pago</option>
    
      <option>Maior Valor</option>
      <option>Menor Valor</option>
    </select>
  </section>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore();

const order = ref('asc');

watch(() => order.value, (newOrder) => {
  useTransaciton.order = newOrder;
});
</script>