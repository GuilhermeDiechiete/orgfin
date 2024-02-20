<template>
  <section>
    <div>
      <NuxtLink to="/">
        <span class="text-white mr-6"> <IconUser /> {{ store.user.username }}</span>
      </NuxtLink>
      <NuxtLink to="/">
        <span class="text-white mr-4"> <IconEnvelope /> {{ store.user.email }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">

const store = useUserStore()

</script>
