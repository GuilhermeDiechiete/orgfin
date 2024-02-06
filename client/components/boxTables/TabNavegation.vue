<template>
  <div class="tabs is-toggle is-fullwidth">
    <ul>
      <li
        :class="{ 'is-active': active === 'monthly' }"
        @click="setActive('monthly')"
      >
        <a>
          <span>Tabela Mensal</span>
        </a>
      </li>
      <li
        :class="{ 'is-active': active === 'yearly' }"
        @click="setActive('yearly')"
      >
        <a>
          <span>Tabela Anual</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
const emits = defineEmits();

const active = ref('monthly')

const setActive = (table: string) => {
  active.value = table;
  emits('table', table)
};
</script>