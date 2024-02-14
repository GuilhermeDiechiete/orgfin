<template>
  <section>
    <BtnNext to="/" />
   
    <Messages />

    <div class="my-box">
      <h1 class="my-title"> <IconCategory /> Categorias </h1>
    </div>
    
    <div class="my-box">
      <form action="" method="post" class="fullwidth">
        <FormLabel text="Nome da categoria:"/>
        <input v-model="name" type="text" class="my-input">

        <BtnFullWidthSuccess text="Criar" @click.prevent="addCategory" />
      </form>
    </div>
    
    <div class="my-box">
      <div class="my-table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" key="category.id">
              <td>{{ category.name }}</td>
              <td> Excluir </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const name = ref('')

const storeCategory = useCategoryStore()

await storeCategory.index()

const categories = storeCategory.categories

const addCategory = async () => {
  await storeCategory.register(name.value)
  name.value = '' // Limpa o campo de entrada após adicionar a categoria
  await storeCategory.index() // Atualiza a lista de categorias
}

console.log(categories)

</script>