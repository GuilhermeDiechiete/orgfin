<template>
  <div>
    <label> {{ label }}</label>
    <input :type="type"
           class="input mb-2">
  </div>
</template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Texto'},
      type: {
        type: String,
        default: 'text',
      },
      
    },
  };
  </script>
  

  