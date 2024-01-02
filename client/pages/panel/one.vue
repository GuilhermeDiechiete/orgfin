<template>
    <div>
        <h1>Painel 1</h1>


        <div>
            <form class="box has-text-centered" @submit.prevent="showExpensesByMonth">
                <label class="label" for="year">Ano:</label>
                <input class="input" type="text" v-model="year">

                <label class="label" for="year">month:</label>
                <input class="input" type="text" v-model="month">

                <button class="button is-link is-rounded my-2 " type="submit">Buscar </button>
            </form>
            <table>
                <thead>
                    <tr class="columns">
                        <th class="column">Nome</th>
                        <th class="column">Valor</th>
                        <th class="column">Pagamento</th>
                        <th class="column">Categoria</th>
                        <th class="column">Parcelas</th>
                        <th class="column">Valor da parcela</th>
                        <th class="column">Status</th>
                    </tr>
                </thead>
                <tbody v-for="expenses in expensesArray" :key="expenses">
                     <tr v-for="expense in expenses" :key="expense.id" class="columns">
                        <td class="column">{{ expense.name }}</td>
                        <td class="column">{{ expense.value }}</td>
                        <td class="column">{{ expense.payment }}</td>
                        <td class="column">{{ expense.category }}</td>
                        <td class="column">{{ expense.installments }}</td>
                        <td class="column">{{ expense.value_installment }}</td>
                        <td class="column">{{ expense.status }}</td>
                    </tr> <br>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'


export default Vue.extend({
   
    data() {
        return {

            year: '',
            month: '',

            expensesArray: [] ,
            valueTotalByMonth: {},
            messageSuccess: [],
            messageError: []

        }
    },
    
    methods: {
        async showExpensesByMonth() {
            try {
                const token = localStorage.getItem('userToken');
               
                const response = await axios.get(`http://127.0.0.1:4000/panel/${this.year}/${this.month}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                this.expensesArray = await response.data.data.organizedExpenses
                this.valueTotalByMonth = await response.data.data.valueTotalByMonth
;
                
                

            } catch (error: any) {
                this.messageError = error.response.data.message;
                setTimeout(() => {
                this.messageError = [];
                }, 2000);
            }
        }
    }
})



</script>

