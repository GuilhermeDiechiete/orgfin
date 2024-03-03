<template>
    <form class="my-box-form">

    <h3 class="mb-6">Adicionar Transação</h3>
        <Messages />
        <v-radio-group inline v-model="transaction.type">
            <v-radio label="Despesa" value="expense"></v-radio>
            <v-radio label="Renda" value="income"></v-radio>
            <v-radio label="Investimento" value="investment"></v-radio>
        </v-radio-group>

        <v-text-field v-model="transaction.date" label="Data" variant="underlined" type="date"/>
        <v-text-field v-model="transaction.description" label="Descrição" variant="underlined" />
        <v-text-field v-model="transaction.installment" label="Numero parcela Atual" variant="underlined" />
        <v-text-field v-model="transaction.total_installments" label="Numero de parcelas totais" variant="underlined" />
        <v-text-field v-model="transaction.amount" label="Valor R$" variant="underlined" />
        <v-select v-model="transaction.category" :items="categories" item-title="name" label="Categorias"></v-select>
        <v-select v-model="transaction.account" :items="accounts" item-title="name" label="Conta de Saída/Entrada"></v-select>
        <v-text-field v-model="transaction.destiny" label="Destino" variant="underlined" />
        <v-btn block @click.prevent="addTransaction"> Criar </v-btn>
    </form>
</template>

<script setup lang="ts">
import type { Transaction, Category, Account } from '~/interfaces/interfaces'

const storeCategory = useCategoryStore()
const storeAccount = useAccountStore()

const categories: Category[] = storeCategory.categories

const accounts: Account[] = storeAccount.accounts

const store = useTransactionStore()


const transaction: Transaction = {
    date: new Date(),
    type: 'expense',
    description: '',
    amount: 0,
    installment: 1,
    total_installments: 1,
    category: '',
    account: '',
    destiny: '',
    status: false
};

const addTransaction = async () => {
  await store.create(transaction)
  await store.getByMonth()
}

</script>