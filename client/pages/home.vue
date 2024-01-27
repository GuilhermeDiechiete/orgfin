<template>
    <section class="container is-max-desktop p-5">
        <div v-if="authorization">
            <user-box :id="userId" :email="userEmail"/>
            <message-error :message="messageError"/>

            <div class="tabs is-toggle is-fullwidth my-4">
                <ul>
                    <li :class="{'is-active-orangered': activeTable === 'monthly'}" @click="selectedTable('monthly')"><a>Resumo Mensal</a></li>
                    <li :class="{'is-active-orangered': activeTable === 'yearly' }" @click="selectedTable('yearly')"><a>Resumo Anual</a></li>
                </ul>
            </div>

            <category-box class="m-1"/>

            <box-transaction-by-month v-if="activeTable === 'monthly'" class=" box mb-5 has-text-centered p-2"/>
           

            <div v-if="activeTable === 'yearly'" class="box has-text-centered is-vcentered">
                
            </div>  
        </div>

        <div v-else class="box"><h1>Não foi possivel entrar no aplicativo, tente novamente mais tarde.</h1></div>

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
