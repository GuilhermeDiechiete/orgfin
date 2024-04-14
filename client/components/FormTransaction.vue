<!-- BOTÃO para acessar formulario + FORMULÁRIO DE NOVA TRANSAÇÃO -->
<template>
  <div class="">
    <form class="my-box-form">
      <h3 class="mb-6">NOVA TRANSAÇÃO</h3>
      <Messages />
      <v-radio-group inline v-model="transaction.type">
        <v-radio label="Despesa" value="expense"></v-radio>
        <v-radio label="Renda" value="income"></v-radio>
        <v-radio label="Investimento" value="investment"></v-radio>
      </v-radio-group>
          
      <v-text-field v-model="transaction.date" label="Data" variant="underlined" type="date"/>
      <v-text-field v-model="transaction.description" label="Descrição" variant="underlined" type="text"/>
      <v-text-field v-model="transaction.installment" label="Numero parcela Atual" variant="underlined" type="number"/>
      <v-text-field v-model="transaction.total_installments" label="Numero de parcelas totais" variant="underlined" type="number"/>
      <v-text-field v-model="transaction.amount" label="Valor R$" variant="underlined" type="number"/>
      <v-select v-model="transaction.category" :items="categories" item-title="name" label="Categorias" />
      <v-select v-model="transaction.account" :items="accounts" item-title="name" label="Conta de Saída/Entrada" />
      <v-text-field v-model="transaction.destiny" label="Destino" variant="underlined" />
      <v-btn block @click.prevent="addTransaction" class="bg-orange-darken-4">adicionar</v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Categories, Account } from '~/interfaces/interfaces' 

// STORES
const store = useTransactionStore() // acessar metodo de criação de transação
const storeCategory = useCategoryStore() // acessar lista de categorias para o usuário selecionar no form
const storeAccount = useAccountStore() // acessar lista de contas para o usuário selecionar no form
const global = useGlobalStore() // acessar data atualizada

// buscando categorias e contas atualizado
await storeCategory.index()
await storeAccount.index()

const date = global.dataISO // data atual

// LISTAS PARA INPUTS DO FORMULÁRIO
const categories: Categories[] = storeCategory.categories
const accounts: Account[] = storeAccount.accounts

// INPUTS DO FORMULÁRIO
const transaction = ref({
  date: date, 
  type: 'expense', 
  description: '', 
  amount: 0, 
  installment: 1,
  total_installments: 1,
  category: '',
  account: '',
  destiny: '',
  status: false
})

// ENVIAR DADOS PARA CRIAR TRANSAÇÃO
const addTransaction = async () => {
  await store.create(transaction.value) // Tentativa de criação
  await store.getByMonth() // Faz uma busca atualizada dos valores após criação
}
</script>




