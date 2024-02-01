<template>
  <div>
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li
          :class="{ 'is-active': active === 'monthly' }"
          @click="isActive('monthly')"
        >
          <a>
            <span>Controle Mensal</span>
          </a>
        </li>
        <li
          :class="{ 'is-active': active === 'yearly' }"
          @click="isActive('yearly')"
        >
          <a>
            <span>Controle Anual</span>
          </a>
        </li>
      </ul>
    </div>
    
    <ResultDisplay />

    <div v-if="active === 'monthly'">
      <TableMonthly />
    </div>

    <div v-else>
      <TableYearly />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      active: 'monthly'
    }
  },
  methods: {
    isActive(selectedTable: string) {
      if(selectedTable === 'yearly') {
        this.active = 'yearly'
      } else {
        this.active = 'monthly'
      }

    }
  }
}
</script>
