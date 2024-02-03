<template>
  <div>
    <div class="tabs is-toggle is-fullwidth is-bordered">
      <ul>
        <li :class="{ 'is-active': active === 'expenses' }" 
            @click="isActive('expenses')">
          <a><span>Despesas</span></a>
        </li>
        <li
          :class="{ 'is-active': active === 'incomes' }"
          @click="isActive('incomes')">
          <a><span>Rendas</span></a>
        </li>
        <li
          :class="{ 'is-active': active === 'investments' }"
          @click="isActive('investments')">
          <a><span>Investimentos</span></a>
        </li>
      </ul>
    </div>

    <div class="table-container box">
      <table class="table is-striped is-fullwidth is-bordered">
        <TheadMonthly />
        <TbodyMonthly />
      </table>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      active: 'expenses'
    };
  },
  methods: {
    isActive(selectedTable: string) {
      if(selectedTable === 'investments') {
        this.active = 'investments';
      }
      else if(selectedTable === 'incomes') {
        this.active = 'incomes';
      } else {
        this.active = 'expenses';}

    }
  }
};
</script>