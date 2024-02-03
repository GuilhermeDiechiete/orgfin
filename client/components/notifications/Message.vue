<template>
  <div class="notification is-danger">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
  }
};
</script>






