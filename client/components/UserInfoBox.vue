<template>
    <div class="box p-2 has-background-black-ter">
      <h1 class="text-white">
        <i class="fa-solid fa-user text-orangered mx-2"></i>
        {{ email }}
        <i class="fa-solid fa-circle-info fa-flip ml-5 text-orangered" style="--fa-animation-duration: 3s;"></i>
      </h1>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      email: {
        type: String,
        required: true
      }
    }
  };
  </script>