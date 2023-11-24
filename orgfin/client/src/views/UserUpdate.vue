<template>
    <div class="container">
        <div id="center">
          <h1 id="title" class="title is-1">Perfil</h1>
        </div>
        
  
        <div v-if="messageSuccess" class="success">{{ messageSuccess }}</div>
        <div v-if="messageError" class="error">{{ messageError }}</div>

      <form class="form">
        <label>Nome</label>
        <input v-model="name" type="text" id="input" class="input" />
  
        <label>E-mail</label>
        <input v-model="email" type="email" id="input" class="input" />
  
        <label>Telefone</label>
        <input v-model="phone" type="phone" id="input" class="input" />
  
        <label>Data de Nascimento</label>
        <input v-model="birth" type="date" id="input" class="input" />
  
        <label>Cidade</label>
        <input v-model="city" type="text" id="input" class="input" />
  
        <label>Estado - UF</label>
        <input v-model="state" type="text" id="input" class="input" />
  
      </form>
      <div id="center">
        <button @click="update" id="button-success">SALVAR</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      name: '',
      email: '',
      phone: '',
      birth: '',
      city: '',
      state: '',
      messageSuccess: '',
      messageError: ''
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.post('http://localhost:4000/validate', {}, req)
        .then(res => {
          this.userId = res.data.user.id;
          axios.get(`http://localhost:4000/users/${this.userId}`, req)
            .then(res => {
              console.log(res)
              this.name = res.data.message.name;
              this.email = res.data.message.email;
              this.phone = res.data.message.phone;
              this.birth = res.data.message.birth;
              this.city = res.data.message.city;
              this.state = res.data.message.state;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    update() {
        var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
        const data = {
          id: this.userId,
          name: this.name,
          email: this.email,
          phone: this.phone,
          birth: this.birth,
          city: this.city,
          state: this.state,
        };
      axios.patch(`http://127.0.0.1:4000/users/${this.userId}`, data, req)
        .then(response => {
          this.messageSuccess = response.data.message;
          setTimeout(() => {
            this.messageSuccess = '';
            this.$router.push('/painel');
          }, 2000);
        })
        .catch(error => {
          this.messageError = error.response.data.message;
          setTimeout(() => {
            this.messageError = '';
          }, 2000);
        });
    }
  }
};
</script>

  
<style>
@import '../assets/global.css';
</style>