<template>
  <section>
    <NuxtLink to="/"><IconArrowLeft /></NuxtLink>
   
    <h1 class="title is-4 text-white"><IconCategory class="my-box pt-6" />Categorias</h1>
    <div class="shelf">
      <div class="my-box">
        <form
          action=""
          method="post"
        >
          <label
            for=""
            class="label text-white"
          >Adicionar nova categoria:</label>
          <input
            type="text"
            class="input bg-dark"
          >

          <BtnFullWidth text="Criar" class="my-4 border-orange"/>
        </form>
      </div>
    </div>
  </section>
</template>