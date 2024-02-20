<template>
  <section class="my-box">
    <div class="columns">
      <div class="column">
        <NuxtLink to="/user/profile">
          <span class="text-white"><IconUser /> {{ email }}</span>
        </NuxtLink>
      </div>

      <div class="column center">
        <h1 class="text-orangered ml2">
          <IconOrgFin /> ORG_FIN
        </h1>
      </div>

      <div class="column">
        <h1> <IconYoutube /> <span class="text-white">Assista nosso tutorial do App.</span></h1>
      </div>
    </div> 
  </section>
</template>

<script setup lang="ts">

const useUser = useUserStore();
const email = useUser.user.email;


</script>