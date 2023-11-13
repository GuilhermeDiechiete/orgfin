<template>
  <div class="container">
    <router-link to="/painel" id="link"><i class="fas fa-arrow-left"></i></router-link>
    <div id="center">
      <h1 id="title" class="title is-1">Categorias</h1>
    </div>
    <div id="area-message">
      <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
      <div v-if="messageError" id="error">{{ messageError }}</div>
    </div>
    <form class="form">
      <label >Digite o nome da categoria:</label>
      <input v-model="name" type="text" id="input" class="input" />
    </form>
    <div id="center">
      <button @click="createCategory" id="button-success">CRIAR</button>
    </div><br>   
    <table>
      <thead>
        <tr>
          <th>CATEGORIAS</th>
          <th>OPÇÕES</th>
        </tr>
      </thead> <br>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index">   
          <td>{{ category.category_name }}</td>
          <td><button id="button-danger"><i class="fas fa-trash"></i></button></td>   
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      name: null,
      categoryId: -1,
      categories: [],

      messageSuccess: '',
      messageError: ''
    };
  },
  created() {
    this.listCategories()
  },
  methods: {
    createCategory() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      const body = {
          nameCategory: this.name
        
      }
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.post(`http://localhost:4000/categories/${this.userId}`, body, req)
            .then(res => {
              this.messageSuccess = res.data.message
                    setTimeout(() => {
                        this.messageSuccess = '';
                        window.location.reload()
                    }, 2000);
            })
            .catch(error => {
              this.messageError = error.response.data.message
                    setTimeout(() => {
                        this.messageError = '';
                    }, 2000);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    listCategories() {
        var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/categories/${this.userId}`, req)
            .then(res => {
              this.categories = res.data.message;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    
  }
};
</script>


<style>
@import '../assets/global.css';
</style>