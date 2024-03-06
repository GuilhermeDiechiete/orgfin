<template>
    <form class="my-box-form">
      <h3 class="mb-6">Adicionar Transação</h3>
      <Messages />
      <v-radio-group inline v-model="transaction.type.value">
        <v-radio label="Despesa" value="expense"></v-radio>
        <v-radio label="Renda" value="income"></v-radio>
        <v-radio label="Investimento" value="investment"></v-radio>
      </v-radio-group>
  
      <v-text-field v-model="transaction.date.value" label="Data" variant="underlined" type="date"/>
      <v-text-field v-model="transaction.description.value" label="Descrição" variant="underlined" />
      <v-text-field v-model="transaction.installment.value" label="Numero parcela Atual" variant="underlined" />
      <v-text-field v-model="transaction.total_installments.value" label="Numero de parcelas totais" variant="underlined" />
      <v-text-field v-model="transaction.amount.value" label="Valor R$" variant="underlined" />
      <v-select v-model="transaction.category.value" :items="categories" item-title="name" label="Categorias"></v-select>
      <v-select v-model="transaction.account.value" :items="accounts" item-title="name" label="Conta de Saída/Entrada"></v-select>
      <v-text-field v-model="transaction.destiny.value" label="Destino" variant="underlined" />
      <v-btn block @click.prevent="addTransaction">Criar</v-btn>
    </form>
  </template>
  
  <script setup lang="ts">
 
  import type { Category, Account } from '~/interfaces/interfaces'
  
  const storeCategory = useCategoryStore()
  const storeAccount = useAccountStore()
  
  const categories: Category[] = storeCategory.categories
  const accounts: Account[] = storeAccount.accounts
  
  const store = useTransactionStore()
  
  const transaction = {
    date: ref(''), //"2024-03-10"
    type: ref('expense'),
    description: ref(''),
    amount: ref(0),
    installment: ref(1),
    total_installments: ref(1),
    category: ref(''),
    account: ref(''),
    destiny: ref(''),
    status: ref(false)
  };
  console.log('minha data', transaction.date.value)
  const addTransaction = async () => {
    await store.create(transaction)
    await store.getByMonth()
  }
  </script>
  