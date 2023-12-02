<template>
  <div id="app">
    <div id="container">
      <router-view/>
    </div>
    
  </div>
</template>

<style>
@import '../src//assets/global.css';
</style>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
        localStorage.removeItem('token');
    },
  }
}
</script>

