<template>
  <section>
    <BtnNext to="/" />
   
    <Messages />

    <div class="my-box">
      <h1 class="my-title"> <IconCategory /> Categorias </h1>
      <p>Use o formulário abaixo para adicionar uma nova categoria.</p>
    </div>
    
    <div class="my-box">
      <form action="" method="post" class="fullwidth">
        <FormLabel text="Nome da categoria:"/>
        <input v-model="name" type="text" class="my-input">

        <BtnFullWidthSuccess text="Criar"  @click.prevent="addCategory"/>
   
      </form>
    </div>
    
    <div class="my-box">
      <div class="my-table-container fullwidth">
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
              <td> <button class="my-button-delete" @click="deleteCategory(category.id)">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">



const storeCategory = useCategoryStore()
const name = ref('')

await storeCategory.index()

const categories = ref(storeCategory.categories)

const addCategory = async () => {
  await storeCategory.register(name.value)
  name.value = '' // Limpa o campo de entrada após adicionar a categoria
  await storeCategory.index() // Atualiza a lista de categorias
}

const deleteCategory = async(id:number) => {
  await storeCategory.delete(id)
  await storeCategory.index()
}
watch(() => storeCategory.categories, (newCategories) => {
  categories.value = newCategories
})

</script>