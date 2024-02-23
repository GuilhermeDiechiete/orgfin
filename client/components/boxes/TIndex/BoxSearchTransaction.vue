<template>
  <section class="my-box">
    <div class="columns is-desktop">
      <div class="column">
        <SelectFilter />
      </div>

      <div class="column">
        <SelectMonthYear />
      </div>

      <div class="column">
        <SelectOrder />
        <BtnNormal
          class="column"
          icon="fa-solid fa-magnifying-glass my-icon fa-shake"
          @click.prevent="getTransactions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const useTransaction = useTransactionStore();

const active = ref('');

watch(() => useTransaction.tableSelected, (newSelected) => {
  active.value = newSelected;
 
});

const getTransactions = async () => {
    if(active.value === 'annual') {
        await useTransaction.getByYear(); 
    } else {
        await useTransaction.getByMonth(); 
        await useTransaction.getByYear(); 
    }   
};

</script>