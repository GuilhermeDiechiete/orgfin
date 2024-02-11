<template>
  <section>
    <div
      v-if="userStore.messageError"
      class="message-error"
    >
      <h1>{{ userStore.messageError }}</h1>
    </div>
    <div
      v-if="userStore.messageSuccess"
      class="message-success"
    >
      <h1>{{ userStore.messageSuccess }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
const userStore = useUserStore()

</script>