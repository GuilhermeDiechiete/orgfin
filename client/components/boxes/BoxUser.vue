<template>
  <section>
    <div>
      <NuxtLink to="/user/profile">
        <IconUser /> <span class="text-white mr-6">{{ store.user.username }}</span>
      </NuxtLink>
      <NuxtLink to="/user/credentials">
        <IconEnvelope /> <span class="text-white mr-4">{{ store.user.email }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">

const store = useUserStore()


</script>