<template>
  <section>
    <div class="my-box">
      <form
        action=""
        method="post"
        class="fullwidth">
        <FormLabel text="Nome da conta:" />
        <input
          v-model="name"
          type="text"
          class="my-input">

        <FormLabel text="Valor atual em conta:" />
        <input
          v-model="amount"
          type="number"
          class="my-input">

        <BtnFullWidthSuccess
          text="Criar"
          @click.prevent="addAccount" />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const storeAccount = useAccountStore();

const name = ref('');
const amount = ref();
 
const accounts = ref(storeAccount.accounts);

const addAccount = async () => {
  await storeAccount.create(name.value, amount.value);
  name.value = ''; 
  amount.value = '';
  await storeAccount.index(); 
};

</script>