<template>
    <div>
        <MessageSuccess :message="messageSuccess"/>
        <MessageError :message="messageError"/>

        <form action="" method="post" @submit.prevent="createdCategory">
        <h1 class="title is-6 text-orangered">Criar nova categoria.</h1>
        
        <input v-model="nameCategory" type="text" class="input has-background-dark" placeholder="Digite o nome da categoria.">
        
        <button type="submit" class="button is-success mt-2 is-fullwidth">Criar</button>
    </form>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            nameCategory: '',

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
                this.messageSuccess = response.data.message
                setTimeout(() => {
                    this.messageSuccess = ''
                    this.statusFormCategory = false
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
        }
    }
}
</script>