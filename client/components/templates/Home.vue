<template>
  <div>
    <section v-if="userStore.authenticated">
      <div class="my-box">
        <BoxOrgFin class="my-item"/>
        <BoxUser class="my-item" />
        <BoxConfig class="my-item" /> 
      </div>

      <div class="my-box">
        <BoxNavegationPage class="my-item" /> 
      </div>

      <div class="my-box">
        <BoxDisplay class="my-item" />
      </div>
      <div>
        <BoxTransaction />
      </div>
    
      <div class="my-box">
        <BoxSearch class="my-item" />
      </div>
      <div class="my-box">
        <BoxTables class="my-item" />
      </div>
    </section>
    <div v-else>
      <h1>Faça Login</h1>
    </div>
  </div>
</template>

<script setup lang="ts">

const userStore = useUserStore()

await userStore.show()



</script>