<template>
  <div class="my-tabs">
    <div
      :class="{ 'bg-orangered': active === 'monthly' }"
      @click="setActiveTab('monthly')">
      <a>
        <span class="text-white">Tabela Mensal</span>
      </a>
    </div>
    <div
      :class="{ 'bg-orangered': active === 'annual' }"
      @click="setActiveTab('annual')">
      <a>
        <span class="text-white">Tabela Anual</span>
      </a>
    </div>
  </div>
</template>
    
  <script setup lang="ts">
  const emits = defineEmits(['tabChanged']);
  const useTransaction = useTransactionStore();

    const active = ref('monthly');
    
    const setActiveTab = (tab: string) => {
      active.value = tab;
      emits('tabChanged', tab);
      useTransaction.tableSelected = tab;
    };
  
  
    
    </script>