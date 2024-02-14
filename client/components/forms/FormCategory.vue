<template>
  <section>
    <form
      action=""
      method="post"
      class="box bg-black"
    >
      <FormLabel text="Nome da categoria:" />
      <input
        type="text"
        class="input bg-dark"
      >
      <BtnFullWidth
        text="Criar"
        class="mt-4 bg-green"
      />
    </form>
    <NuxtLink to="/categories">
      Ver minhas categorias
    </NuxtLink>
  </section>
</template>