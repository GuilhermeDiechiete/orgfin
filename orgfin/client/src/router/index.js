import Vue from 'vue';
import VueRouter from 'vue-router';
import OrgFin from '../views/OrgFin.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import UserUpdate from '../views/UserUpdate.vue';
import MainPainel from '../views/MainPainel.vue'
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'OrgFin',
    component: OrgFin,
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
  },
  {
    path: '/edit',
    name: 'Edit',
    component: UserUpdate,
    beforeEnter: AuthUser,
  },
  {
    path: '/painel',
    name: 'Painel',
    component: MainPainel,
    beforeEnter: AuthUser,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
function AuthUser(to, from, next) {

  var req = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  }
  axios.post('http://localhost:4000/validate',{}, req).then(res => {
    console.log(res.data.message)
    next()
  }).catch(err => {
    console.log(err.response)
    next('/login')
  })
  next()
}


export default router;
