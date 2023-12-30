<template>
  <div>
    <h1>OrgFin</h1>
    <p>Organização Financeira</p>

    <ul>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/user/register">Registre-se</NuxtLink>
    </ul>
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
