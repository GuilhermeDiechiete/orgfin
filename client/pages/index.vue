<template>
  <section>
    <div v-if="autorized">
      <BoxUser />
      <BoxNewTransaction />
      <BoxNavegation />
      <BoxTransactions />
    </div>
    <div v-else />
  </section>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/users'; // Certifique-se de ajustar o caminho do seu store

const { user, message, token, authorized, show } = useUserStore();

onMounted(async () => {
  await show();
});
</script>