<template>
  <div class="tabs is-toggle is-fullwidth">
    <ul>
      <li
        :class="{ 'bg-orangered': active === 'monthly' }"
        @click="setActiveTab('monthly')"
      >
        <a>
          <span class="text-white">Tabela Mensal</span>
        </a>
      </li>
      <li
        :class="{ 'bg-orangered': active === 'annual' }"
        @click="setActiveTab('annual')"
      >
        <a>
          <span class="text-white">Tabela Anual</span>
        </a>
      </li>
    </ul>
  </div>
</template>
    
  <script setup lang="ts">
  const emits = defineEmits(['tabChanged'])
    
    const active = ref('monthly');
    
    const setActiveTab = (tab: string) => {
      active.value = tab;
      emits('tabChanged', tab)
    }
  
  
    
    </script>