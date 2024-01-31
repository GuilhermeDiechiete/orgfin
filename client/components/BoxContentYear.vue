<template>
    <div class="box">
        conteudo anual

        <button @click="fetchData">Buscar</button>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            year: 2024,

            expensesAPI: [],
            incomesAPI: [],
            investmentsAPI: [],

            messageError: '',
            messageSuccess: ''
        }
    },
    methods: {
        async fetchData () {
            try {
                const token = localStorage.getItem('userToken');

                const response = await $axios.$get(`http://127.0.0.1:4000/gettransactions/total/${this.year}/${this.month}`,

                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.expensesAPI = response.data.totalExpenses
                this.incomesAPI = response.data.totalIncomes
                this.investmentsAPI = response.data.totalInvestments 

                this.messageSuccess = response.data.message
                setTimeout(() => {
                    this.messageSuccess = ''
                }, 2000)
                
            } catch (error: any) {
                this.messageError = error
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        },
    }
}
</script>