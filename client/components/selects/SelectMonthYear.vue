<template>
  <section>
    <select
      v-model="month"
      class="my-select">
      <option value="1">
        Janeiro
      </option>
      <option value="2">
        Fevereiro
      </option>
      <option value="3">
        Março
      </option>
      <option value="4">
        Abril
      </option>
      <option value="5">
        Maio
      </option>
      <option value="6">
        Junho
      </option>
      <option value="7">
        Julho
      </option>
      <option value="8">
        Agosto
      </option>
      <option value="9">
        Setembro
      </option>
      <option value="10">
        Outubro
      </option>
      <option value="11">
        Novembro
      </option>
      <option value="12">
        Dezembro
      </option>
    </select>
    <select
      v-model="year"
      class="my-select">
      <option>2024</option>
      <option>2025</option>
      <option>2026</option>
      <option>2027</option>
      <option>2028</option>
    </select>
  </section>
</template>

<script setup lang="ts">

const useTransaciton = useTransactionStore();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const year = ref(currentYear);
const month = ref(currentMonth);

watch(() => year.value, (newYear) => {
  useTransaciton.year = newYear;
});
watch(() => month.value, (newMonth) => {
  useTransaciton.month = newMonth;
});

</script>





