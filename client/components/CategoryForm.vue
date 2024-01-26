<template>
    <div>
        <MessageSuccess :message="messageSuccess"/>
        <MessageError :message="messageError"/>
        
        <h1 class="title is-6 text-orangered">Criar nova categoria.</h1>

        <form action="" method="post" @submit.prevent="createdCategory">
            <input v-model="nameCategory" type="text" class="input has-background-dark text-white">
            <button type="submit" class="button is-success mt-2 is-fullwidth">Criar</button>
        </form>

        <button class="button bg-orangered mt-4 is-fullwidth text-white" @click="showCategories" >Ver Categorias</button>

        <div v-if="activeList" class="box mt-2 has-background-black-ter">

            <div  class="table-container">
                <table class="table is-bordered is-fullwidth has-background-black-ter has-text-centered has-text-info-light" style="min-width: 800px;">
                    <thead>
                        <tr>
                            <th class="has-text-info has-text-centered">Codigo</th>
                            <th class="has-text-info has-text-centered">Nome</th>
                            <th class="has-text-info has-text-centered">Excluir</th>
                        </tr>
                    </thead>
                    <tbody v-for="category in categories" :key="category.id">
                        <td>{{ category.id }}</td>
                        <td>{{ category.name }}</td>
                        <td class="text-red" @click="deleteCategory(category.id)" >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </td>
                    </tbody>
                   
                </table>
                
            </div>
            
        </div>

    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            nameCategory: '',
            categories: [],

            activeList: false,

            messageSuccess: '',
            messageError: '',
        }
    },
    methods: {
        async createdCategory() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.post(`http://127.0.0.1:4000/categories`,
                {
                    name: this.nameCategory
                },

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.nameCategory = ''
                this.messageSuccess = response.data.message
                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)
            } catch (error) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },
        async showCategories() {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.get(`http://127.0.0.1:4000/categories`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.categories = response.data.data
                this.activeList = !this.activeList

                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)
            } catch (error) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },
        async deleteCategory(id) {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.delete(`http://127.0.0.1:4000/categories/${id}`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.showCategories()
                this.messageSuccess = response.data.message

                setTimeout(() => {
                    this.activeList = true
                    this.messageSuccess = ''
                }, 1000)
            } catch (error) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        }
    }
}
</script>