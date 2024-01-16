<template>
  <section class="section">
    <div class=" box has-text-centered is-vcentered">
      <i class="fa-solid fa-coins"></i>
      <h1 class="title is-2 text-orangered">OrgFin</h1>
      <h3 class="subtitle is-5">Organização Financeira</h3>
      <NuxtLink to="auth/login" class="button is-fullwidth bg-orangered text-white"><i class="fa-solid fa-arrow-right"></i> </NuxtLink>

    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
