<template>
    <h1 class="title is-3 text-orange has-text-centered">{{ text }}</h1>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Texto'},
   
    
  },
};
</script>