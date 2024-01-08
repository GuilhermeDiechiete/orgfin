<template>
  <div>
    <section class="box has-text-centered m-6 start">

      <h1 class="title is-1 orange mt-6">OrgFin</h1>
      <p class="subtitle is-5 mb-6">Organização Financeira</p>

      <NuxtLink class="button is-fullwidth bg-orange" to="/auth/login">Iniciar</NuxtLink>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
