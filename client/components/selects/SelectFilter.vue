<template>
  <section>
    <select
      v-model="filter"
      class="my-select">
      <option value="date">
        Filtrar
      </option>
      <option value="date">
        Data
      </option>
      <option value="category">
        Categoria
      </option>
      <option value="account">
        Conta
      </option>
    </select>

    <input
      v-if="filter === 'date'"
      type="date"
      class="my-select">
  
    <select
      v-if="filter === 'category'"
      class="my-select">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id">
        {{ category.name }}
      </option>
    </select>

    <select
      v-if="filter === 'account'"
      class="my-select">
      <option
        v-for="account in accounts"
        :key="account.id"
        :value="account.id">
        {{ account.name }}
      </option>
    </select>
  </section>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore();
const useCategory = useCategoryStore();
const useAccount = useAccountStore();

await useCategory.index();
await useAccount.index();

const accounts = useAccount.accounts;
const categories = useCategory.categories;


const filter = ref('date');

watch(() => filter.value, (newFilter) => {
  useTransaciton.filter = newFilter;
});
</script>
