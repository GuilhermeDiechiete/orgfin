<template>
  <div>
    <label class="label"> {{ label }}</label>
    <input
      class="input"
      :placeholder="placeholder"
      :type="type"
    >
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['label', 'placeholder', 'type'])

</script>
