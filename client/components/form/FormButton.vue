<template>
  <button class="button is-fullwidth my-3"> {{ text }}</button>
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