<template>
  <div>
    <section v-if="userStore.authenticated">
      <div class="shelf">
        <BoxOrgFin class="my-box" />
        <BoxUser
          class="my-box"
        />
        <BoxConfig class="my-box" /> 
      </div>

    
      <div class="shelf">
        <BoxNavegationPage class="my-box" /> 
      </div>

    
      <div class="shelf">
        <BoxDisplay class="my-box" />
      </div>
      <div>
        <BoxTransaction />
      </div>
    
      <div class="shelf">
        <BoxSearch class="my-box" />
      </div>
      <div class="shelf">
        <BoxTables class="my-box" />
      </div>
    </section>
    <section v-else>
      Faça Login
    </section>
  </div>
</template>

<script setup lang="ts">

const userStore = useUserStore()

await userStore.show()





</script>