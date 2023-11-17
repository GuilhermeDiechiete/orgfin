<template>
    <div class="container">
        <div id="center">
           <h1 id="title" class="title is-1">Renda</h1> 
        </div>
        <div id="area-message">
            <div v-if="messageSuccess" id="success">{{ messageSuccess }}</div>
            <div v-if="messageError" id="error">{{ messageError }}</div>
        </div>
        <div>
            <div class="columns">
                <div class="column">
                    <label for="month">Selecione o mês:</label>
                    <select v-model="selectedMonth" class="input" id="input">
                        <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>      
                    </select> 
                </div>
                <div class="column">
                    <label for="">Selecione o ano:</label>
                    <select v-model="selectedYear" class="input" id="input">
                        <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                    </select>
                </div>
                
            </div>
            <div id="center">
                <button id="button-search" @click="searchIncome()">BUSCAR</button>
                <button id="button-success" @click="toggleForm">ADICIONAR RENDA</button>
            </div>
            <div>
                <div v-show="showForm">
                    <label>Descrição</label>
                    <input id="input" class="input" type="text" v-model="description">
                    <label>Valor - R$</label>
                    <input id="input" class="input" type="text" v-model="incomeValue">
                    <div id="center">
                        <button id="button-success" @click="createIncome()">CRIAR</button>
                    </div>
                    
                </div>
            </div>
            
            
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            showForm: false,

            selectedYear: null, 
            selectedMonth: null,
            years: Array.from({ length: 78 }, (_, index) => 2023 + index),
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        }
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm
    },
    }
}

</script>