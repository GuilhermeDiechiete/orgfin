<template>
  <section class="my-box">
    <div>
      <form
        action=""
        method="post"
        class="fullwidth">
        <FormLabel text="Nome da categoria:" />
        <input
          v-model="name"
          type="text"
          class="my-input">

        <BtnFullWidthSuccess
          text="Criar"
          @click.prevent="addCategory" />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">

const storeCategory = useCategoryStore();
const name = ref('');

const addCategory = async () => {
  await storeCategory.register(name.value);
  name.value = ''; // Limpa o campo de entrada após adicionar a categoria
  await storeCategory.index(); // Atualiza a lista de categorias
};

</script>