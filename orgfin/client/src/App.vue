<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>

<style scoped>
#app {
  background-color: rgb(37, 37, 37);
  min-height: 100vh;
  
}
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

