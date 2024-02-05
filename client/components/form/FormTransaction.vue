<template>
  <form action="" method="post" class="box" @submit.prevent="submitForm">
    <Message v-if="transactionStore.message" :text="transactionStore.message" />

    <label class="label" for="">Data</label>
    <input v-model="transaction.date" class="input" type="date">

    <label class="label" for="">Selecione o tipo de transação</label>
    <input v-model="transaction.type" class="input" type="text" placeholder="Despesa, Renda, Investimento">

    <label class="label" for="">Descrição</label>
    <input v-model="transaction.description" class="input" type="text">

    <label class="label" for="">Valor:</label>
    <input v-model="transaction.amount" class="input" type="number">

    <label class="label" for="">Parcela atual</label>
    <input v-model="transaction.installment" class="input" type="number" placeholder="1">

    <label class="label" for="">Maximo de parcelas</label>
    <input v-model="transaction.max_installment" class="input" type="text">

    <label class="label" for="">Categoria</label>
    <input v-model="transaction.category" class="input" type="text">

    <label class="label" for="">Conta de Saida</label>
    <input v-model="transaction.account" class="input" type="text">

    <label class="label" for="">Destino do valor:</label>
    <input v-model="transaction.destiny" class="input" type="text">

    <FormButton text="Criar transação" />
  </form>
</template>

<script setup lang="ts">
import { useTransactionStore } from '~/stores/transactions';

const transaction = ref({
  date: '',
  type: '',
  description: '',
  amount: '',
  installment: '',
  max_installment: '',
  category: '',
  account: '',
  destiny: '', 
});

const transactionStore = useTransactionStore();

const submitForm = async () => {
  try {
    await transactionStore.create(transaction.value);

  } catch (error) {
    console.error('Erro durante o registro:', error);
  }
};
</script>