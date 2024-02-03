<template>
  <div>
    <label class="label"> {{ label }}</label>
    <input :type="type"
           class="input mb-3">
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
  

  