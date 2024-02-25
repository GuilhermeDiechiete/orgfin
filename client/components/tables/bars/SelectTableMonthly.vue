<template>
  <div class="my-tabs">
    <div
      :class="{ 'bg-orangered': active === 'expenses' }"
      @click="setActiveTab('expenses')">
      <a>
        <span class="text-white">Despesas</span>
      </a>
    </div>
    <div
      :class="{ 'bg-orangered': active === 'incomes' }"
      @click="setActiveTab('incomes')">
      <a>
        <span class="text-white">Rendimentos</span>
      </a>
    </div>
    <div
      :class="{ 'bg-orangered': active === 'investments' }"
      @click="setActiveTab('investments')">
      <a>
        <span class="text-white">Investimentos</span>
      </a>
    </div>
  </div>
</template>
    
  <script setup lang="ts">
  const emits = defineEmits(['tabMonthly']);
    
    const active = ref('expenses');
    
    const setActiveTab = (tab: string) => {
      active.value = tab;
      emits('tabMonthly', tab);
    };
  
  
    
    </script>