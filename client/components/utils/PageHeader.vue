<template>
  <section class="my-box">
    <div>
      <h1 class="my-title">
        <i
          :class="icon"
          style="--fa-animation-duration: 3s;" /> {{ title }}
      </h1>
      <p> {{ description }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps(['icon', 'title' , 'description']);

</script>