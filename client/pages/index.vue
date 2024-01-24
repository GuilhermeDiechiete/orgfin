<template>
  <section class="container is-max-desktop p-5">

    <div class="box has-text-centered has-background-black-ter">

      <i class="fa-solid fa-coins has-text-grey-light"></i>
      <h1 class="title is-2 text-orangered">OrgFin</h1>
      <h3 class="subtitle is-6 has-text-grey-light">Organização Financeira</h3>
      <NuxtLink to="auth/login" class="button is-fullwidth bg-orangered text-white">Iniciar </NuxtLink>

    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
