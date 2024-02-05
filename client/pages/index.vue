<template>
  <section>
    <div v-if="autorized">
      <BoxUser />
      <BoxNewTransaction />
      <BoxNavegation />
      <BoxTransactions />
    </div>

    <div v-else>Faça login novamente!</div>
    
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const store = useUserStore();
const { autorized } = storeToRefs(store);

onMounted(() => {
   callOnce(store.show);
});




</script>