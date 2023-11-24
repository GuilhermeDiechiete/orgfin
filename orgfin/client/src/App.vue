<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>

<style scoped>
#app {
  background-color: rgb(33, 33, 33);
  min-height: 100vh;
  padding: 1em;
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

