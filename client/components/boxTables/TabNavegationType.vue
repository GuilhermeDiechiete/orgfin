<template>
  <div class="tabs is-toggle is-fullwidth">
    <ul>
      <li
        :class="{ 'is-active': active === 'expenses' }"
        @click="setActive('expenses')"
      >
        <a>
          <span>Despesas</span>
        </a>
      </li>
      <li
        :class="{ 'is-active': active === 'incomes' }"
        @click="setActive('incomes')"
      >
        <a>
          <span>Rendas</span>
        </a>
      </li>
      <li
        :class="{ 'is-active': active === 'investments' }"
        @click="setActive('investments')"
      >
        <a>
          <span>Investimentos</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { defineEmits } from 'vue'

const emits = defineEmits();

const active = ref('expenses')

const setActive = (table: string) => {
  active.value = table;
  emits('table-type', table)
};
</script>