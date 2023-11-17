<template>
  <div id="app">
    <div class="container">
      <nav id="area-link">

        <router-link id="link" to="/edit"><i class="fas fa-user"></i></router-link> 
        <router-link id="link" to="/painel">Painel</router-link>
        <router-link id="link" to="control">Relatório Anual</router-link>   
        <router-link id="link" to="/categories">Categorias de despesas</router-link>
        <router-link id="link" to="/payments">Formas de Pagamento</router-link>  
        <router-link id="link" to="/income">Renda</router-link> 
        <router-link id="link" to="#">Investimentos</router-link> 
        
        <router-link id="link" @click="logout()" to="/">sair</router-link> 
      </nav>
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

