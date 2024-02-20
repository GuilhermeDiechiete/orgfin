<template>
  <form
    action=""
    method="post"
    class="box bg-dark2 mb-6">
    <h1 class="my-title">
      <IconPlus /> Nova Transação
    </h1>

    <Messages />

    <FormLabel text="Data:*" />
    <input
      v-model="transaction.date"
      type="date"
      class="my-input">

    <FormLabel text="Selecione o tipo de transação:*" />
    <select
      v-model="transaction.type"
      class="my-input">
      <option value="expense">
        Despesa
      </option>
      <option value="income">
        Renda
      </option>
      <option value="investment">
        Investimento
      </option>
    </select>

    <FormLabel text="Descrição:*" />
    <input
      v-model="transaction.description"
      type="text"
      class="my-input">

    <FormLabel text="Adicione o número da parcela atual:" />
    <input
      v-model="transaction.installment"
      type="number"
      class="my-input">

    <FormLabel text="Adicione o número total de parcelas:" />
    <input
      v-model="transaction.total_installments"
      type="number"
      class="my-input">

    <FormLabel text="Valor: R$ *" />
    <input
      v-model="transaction.amount"
      type="number"
      class="my-input">

    <FormLabel text="Selecione uma categoria:" />
    <select
      v-model="transaction.category"
      class="my-input">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.name">
        {{ category.name }}
      </option>
    </select>

    <FormLabel text="Selecione uma conta de saída:" />
    <select
      v-model="transaction.account"
      class="my-input">
      <option
        v-for="account in accounts"
        :key="account.id"
        :value="account.name">
        {{ account.name }}
      </option>
    </select>

    <FormLabel text="Descreva o destino do valor:" />
    <input
      v-model="transaction.destiny"
      type="text"
      class="my-input">

    <BtnFullWidthSuccess
      text="Criar"
      class="my-button-fullwidth-success"
      @click.prevent="addTransaction" />
  </form>
</template>

<script setup lang="ts">

// Select category
  const useCategory = useCategoryStore();
  await useCategory.index();
  const categories = useCategory.categories;

  // Select accounts
  const useAccount = useAccountStore();
  await useAccount.index();
  const accounts = useAccount.accounts;

  
  const useTransaction = useTransactionStore();

  const transaction = {
    date: '',
    type: '',
    description: '',
    installment: '',
    total_installments: '',
    amount: '',
    category: '',
    account: '',
    destiny: '',
    status: false
  };

  const addTransaction = async () => {
  await useTransaction.create(transaction);
};

</script>
