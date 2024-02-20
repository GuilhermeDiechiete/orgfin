<template>
  <section class="my-box">
    <div>
      <div class="my-table-container fullwidth">
        <table class="my-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="category in categories"
              key="category.id">
              <td>{{ category.name }}</td>
              <td class="has-text-centered">
                <button
                  class="my-btn-delete"
                  @click="deleteCategory(category.id)">
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const storeCategory = useCategoryStore();

await storeCategory.index();

const categories = ref(storeCategory.categories);

const deleteCategory = async (id:number) => {
  await storeCategory.delete(id);
  await storeCategory.index();
};
watch(() => storeCategory.categories, (newCategories) => {
  categories.value = newCategories;
});

</script>