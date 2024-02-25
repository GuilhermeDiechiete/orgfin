<template>
  <section class="my-header">
    <h1 class="my-title">
      <IconOrgFin /> ORG_FIN
    </h1>
    
    <NuxtLink to="/user/profile">
      <span class="text-white"><IconUser /> {{ email }}</span>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">

const useUser = useUserStore();
const email = useUser.user.email;


</script>