<template>
  <div>
    <section v-if="userStore.authenticated">
      <BoxLogout /> 

      <div class="my-box">
        <div class="columns">
         
        <BoxOrgFin  class="column"/>
        </div>
        

      </div>
      
      <div>
        <BoxTransaction/>
      </div>

      <div class="my-box">
        <BoxNavegationPage /> 
      </div>

      <div class="my-box">
        <BoxDisplay />
      </div>
      
      <div class="my-box">
        <SearchBar class="my-column" />
      </div>

      <div class="my-box">
        <BoxTables class="my-column" />
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