<template>
    <div class="box p-2 bg-black-nv2 text-white">
      <h1>
        {{ id }}
        <i class="fa-solid fa-user text-orangered mx-2"></i>
        {{ email }}
        <i class="fa-solid fa-circle-info fa-flip ml-5 text-orangered" style="--fa-animation-duration: 3s;"></i>
      </h1>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }
  };
  </script>