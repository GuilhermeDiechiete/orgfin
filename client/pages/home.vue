<template>
    <section class="container is-max-desktop px-3 pt-5">
        <div v-if="authorization" class="box bg-black-nv1">


            <box-user :id="userId" :email="userEmail"/>

            <message-error :message="messageError"/>

            <div class="tabs is-toggle is-fullwidth my-4">
                <ul>
                    <li :class="{'is-active-orangered': activeTable === 'monthly'}" @click="selectedTable('monthly')"><a>Resumo Mensal</a></li>
                    <li :class="{'is-active-orangered': activeTable === 'yearly' }" @click="selectedTable('yearly')"><a>Resumo Anual</a></li>
                </ul>
            </div>

            <box-category/>

            <box-created-form/>

            <box-content-month v-if="activeTable === 'monthly'"/>
           

            <box-content-year v-if="activeTable === 'yearly'"/> 
        </div>

        <div v-else><h1>Não foi possivel entrar no aplicativo, tente novamente mais tarde.</h1></div>

    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({

    data() {
        return {
            authorization: false, // bloqueia a visualização do app caso o email ou id não venha no token
            activeTable: 'monthly', // controla entre o resumo mensal e anual
            
            messageError: '',

            userEmail: '-----',
            userId: -1,


        }
    },
    mounted() {
        this.userValidation()
    },
    
    methods: {
        async userValidation() {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://127.0.0.1:4000/user`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                }); 
                this.userEmail = response.data.data.email
                this.userId = response.data.data.id

                if(this.userEmail && this.userId) {
                   this.authorization = true 
                }
            } catch (error:any) {
                this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },

        selectedTable(table: string) {
            this.activeTable = table
        },
        
    }
})

</script>
